import "dotenv/config"
import bcrypt from "bcryptjs";
import { pool } from "./src/config/db";

export const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await pool.query(
      `
    INSERT INTO users (name, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    `,
      ["suraj", "suraj@gmail.com", hashedPassword, "admin"],
    );

    console.log("Admin created successfully");
  } catch (error) {
    console.log("Failed to create Admin: ", error);
  } finally {
    await pool.end();
  }
};

createAdmin();
