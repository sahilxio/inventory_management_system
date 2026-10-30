import { LoginUserType } from "../types/auth.type";
import { pool } from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function loginService(data: LoginUserType) {
  const result = await pool.query(
    `
        SELECT * FROM users
        WHERE email = $1`,
    [data.email],
  );

  if (result.rows.length === 0) {
    throw new Error("user not found with this credentails");
  }

  const user = result.rows[0];

  const isPasswordValid = await bcrypt.compare(
    data.password_hash,
    user.password_hash,
  );

  const token = jwt.sign(
    {
      userId: user.u_id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" },
  );

  if (!isPasswordValid) {
    throw new Error("password is invalid please try again");
  }

  return {
    token,
    user: {
      id: user.u_id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
