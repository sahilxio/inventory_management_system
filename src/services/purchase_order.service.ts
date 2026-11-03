import { purchaseOrderType } from "../types/purchase_order";
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
    purchase_orders: result.rows[0],
  };
};
