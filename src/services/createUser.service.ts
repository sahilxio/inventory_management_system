import { CreateUserType } from "../types/user.type";
import { pool } from "../config/db";
import bcrypt from "bcryptjs";

export const createUserService = async (data: CreateUserType) => {
  const userExistAlready = await pool.query(
    `
        SELECT u_id FROM users
        WHERE email = $1`,
    [data.email],
  );

  if (userExistAlready.rows.length > 0) {
    throw new Error("user already exist with this email");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const result = await pool.query(
    `
        INSERT INTO users (name, email, password_hash)
        VALUES($1, $2, $3)
        RETURNING u_id name, email, role, created_at
        `,
    [data.name, data.email, hashedPassword],
  );

  return {
    user: result.rows[0],
  };
};
