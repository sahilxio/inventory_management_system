import { pool } from "../config/db";
import { salesOrderType } from "../types/sales_order.type";

export const createSalesOrderService = async (
  data: salesOrderType,
  userId: number,
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    let totalAmount = 0;
    const productData = [];

    for (const item of data.items) {
      const productResult = await client.query(
        `
            SELECT selling_price, cost_price, quantity_in_stock
            FROM products
            WHERE p_id = $1
            `,
        [item.product_id],
      );
      if (productResult.rowCount === 0) {
        throw new Error("Product not found");
      }

      const product = productResult.rows[0];

      if (product.quantity_in_stock < item.quantity) {
        throw new Error(`Insufficient Stock for product ID ${item.product_id}`);
      }

      const unitPrice = Number(product.selling_price);
      const unitCost = Number(product.cost_price);

      totalAmount += unitPrice * item.quantity;

      productData.push({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: unitPrice,
        unit_cost: unitCost,
      });
    }

    const salesOrderResult = await client.query(
      `
        INSERT INTO sales_orders (created_by, total_amount)
        VALUES($1, $2)
        RETURNING *`,
      [userId, totalAmount],
    );

    const so_id = salesOrderResult.rows[0].so_id;

    const salesOrderItems = [];

    for (const item of productData) {
      const salesOrderItemResult = await client.query(
        `
            INSERT INTO sales_order_items (sales_order_id, product_id, quantity, unit_price, unit_cost)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
        [
          so_id,
          item.product_id,
          item.quantity,
          item.unit_price,
          item.unit_cost,
        ],
      );

      const updateStock = await client.query(
        `
        UPDATE products
        SET quantity_in_stock = quantity_in_stock - $1
        WHERE p_id = $2
        AND quantity_in_stock >= $1`,
        [item.quantity, item.product_id],
      );

      if (updateStock.rowCount === 0) {
        throw new Error(`Insufficient stock for product ID ${item.product_id}`);
      }

      await client.query(
        `
        INSERT INTO stock_movements (product_id, user_id, movement_type, quantity_change, reference_type, reference_id)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [item.product_id, userId, "sale", -item.quantity, "sales_order", so_id],
      );

      salesOrderItems.push(salesOrderItemResult.rows[0]);
    }

    await client.query("COMMIT");

    return {
      salesOrder: salesOrderResult.rows[0],
      items: salesOrderItems,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
