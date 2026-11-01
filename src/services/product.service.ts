import { pool } from "../config/db";
import { createProductType } from "../types/product.type";

export const createProductService = async (data: createProductType) => {
  const result = await pool.query(
    `
    INSERT INTO products (category_id, name, sku, description, cost_price, selling_price)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING * `,[
      data.category_id,
      data.name,
      data.sku,
      data.description,
      data.cost_price,
      data.selling_price
    ],
  );

  return {
    product: result.rows[0],
  };
};

export const getProductService = async () => {

    const result = await pool.query(`
        SELECT * FROM products
        ORDER BY p_id DESC `)

    return {
        products: result.rows
    }
}