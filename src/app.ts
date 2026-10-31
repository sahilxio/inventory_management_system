import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware";
import { authRouter } from "./routes/auth.routes";
import { createUserRouter } from "./routes/createUser.routes";
import { createCategoriesRouter } from "./routes/categories.routes";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/admin", createUserRouter);
app.use("/api/admin", createCategoriesRouter);

app.use(errorHandler);
