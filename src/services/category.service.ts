import { pool } from "../config/db";
import { CreateCategoriesType } from "../types/catogries.type";

export const createCategoriesService = async (data: CreateCategoriesType) => {
  const result = await pool.query(
    `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING *`,
    [data.name],
  );

  return {
    category: result.rows[0],
  };
};

export const getCategoriesService = async () => {

  const result = await pool.query(`
    SELECT * FROM categories
    ORDER BY c_id DESC`);

  return {
    categories: result.rows
  }
};
