import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD
});

export async function connectDB() {
  try {
    await pool.query("SELECT 1");
    console.log("db connected");
  } catch (error) {
    console.log("db connection error: ", error);
    process.exit(1);
  }
}
