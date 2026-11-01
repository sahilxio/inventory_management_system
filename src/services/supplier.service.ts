import { pool } from "../config/db";
import { createSupplierType } from "../types/supplier.type";



export const createSupplierService = async (data: createSupplierType) => {

    const result = await pool.query(`
        `)
    
}