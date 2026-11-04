import {
  purchaseOrderType,
  receivePurchaseOrderType,
} from "../types/purchase_order";
import { pool } from "../config/db";

export const createPurchaseOrderService = async (
  data: purchaseOrderType,
  userId: number,
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const purchase_order = await client.query(
      `
        INSERT INTO purchase_orders (supplier_id, created_by, notes)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [data.supplier_id, userId, data.notes],
    );

    const purchase_order_id = purchase_order.rows[0].po_id;
    const purchase_order_items = [];

    for (let item of data.items) {
      const result = await client.query(
        `
        INSERT INTO purchase_order_items (purchase_order_id, product_id, quantity_ordered, unit_cost)
        VALUES ($1, $2, $3, $4)`,
        [
          purchase_order_id,
          item.product_id,
          item.quantity_ordered,
          item.unit_cost,
        ],
      );

      purchase_order_items.push(result.rows[0]);
    }

    await client.query("COMMIT");

    return {
      purchase_order: purchase_order.rows[0],
      purchase_order_items,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getPurchaseOrderService = async () => {
  const result = await pool.query(`
    SELECT *
    FROM purchase_order_items as poi
    INNER JOIN purchase_orders as po ON poi.purchase_order_id = po.po_id
    INNER JOIN products as p ON p.p_id = poi.product_id `);

  return {
    purchase_orders: result.rows,
  };
};

export const receivePurchaseOrderService = async (
  data: receivePurchaseOrderType,
  poId: number,
  userId: number,
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const purchaseOrder = await client.query(
      `
  SELECT status
  FROM purchase_orders
  WHERE po_id = $1
  `,
      [poId],
    );

    if (purchaseOrder.rowCount === 0) {
      throw new Error("Purchase order not found");
    }

    if (
      purchaseOrder.rows[0].status !== "ordered" &&
      purchaseOrder.rows[0].status !== "partially_received"
    ) {
      throw new Error("Purchase order cannot be received");
    }

    const updateQuantityReceived = [];

    for (let item of data.items) {
      const purchaseOrderItemsResult = await client.query(
        `
        UPDATE purchase_order_items
        SET quantity_received = quantity_received + $1
        WHERE poi_id = $2 
        AND purchase_order_id = $3
        AND quantity_received + $1 <= quantity_ordered
        RETURNING *`,
        [item.quantity_received, item.poi_id, poId],
      );

      if (purchaseOrderItemsResult.rowCount === 0) {
        throw new Error("purchase order item not found or invalid quantity");
      }

      const p_id = purchaseOrderItemsResult.rows[0].product_id;

      const productQuantityInStockResult = await client.query(
        `
        UPDATE products
        SET quantity_in_stock = quantity_in_stock + $1
        WHERE p_id = $2
        RETURNING *`,
        [item.quantity_received, p_id],
      );

      if (productQuantityInStockResult.rowCount === 0) {
        throw new Error("product not found!");
      }

      await client.query(
        `
        INSERT INTO stock_movements (product_id, user_id, movement_type, qantity_change, reference_type, reference_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [
          p_id,
          userId,
          "purchase",
          item.quantity_received,
          "purchase_order",
          poId,
        ],
      );

      updateQuantityReceived.push(purchaseOrderItemsResult.rows[0]);
    }

    const pendingItems = await client.query(
      `
  SELECT poi_id
  FROM purchase_order_items
  WHERE purchase_order_id = $1
  AND quantity_received < quantity_ordered
  `,
      [poId],
    );

    const status =
      pendingItems.rowCount === 0 ? "received" : "partially_received";

    await client.query(
      `
  UPDATE purchase_orders
  SET status = $1
  WHERE po_id = $2
  `,
      [status, poId],
    );

    await client.query("COMMIT");

    return {
      updateItems: updateQuantityReceived,
      status,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
