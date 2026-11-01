import { pool } from "../config/db";
import { createSupplierType } from "../types/supplier.type";

export const createSupplierService = async (data: createSupplierType) => {
  const result = await pool.query(
    `
        INSERT INTO suppliers (name, email, phone, address)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
    [data.name, data.email, data.phone, data.address],
  );

  return {
    supplier: result.rows[0],
  };
};

export const getSupplierService = async () => {
  const result = await pool.query(`
        SELECT * FROM suppliers
        ORDER BY s_id DESC`);

  return {
    suppliers: result.rows,
  };
};
