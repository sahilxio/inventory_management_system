import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware";
import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";
import { categoriesRouter } from "./routes/category.routes";
import { productRouter } from "./routes/product.routes";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/admin", userRouter);
app.use("/api/admin", categoriesRouter);
app.use("/api/product", productRouter);

app.use(errorHandler);
