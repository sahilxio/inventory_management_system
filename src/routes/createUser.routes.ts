import express from "express"
import { createUser } from "../controllers/createUser.controller"
import { validateCreateUser } from "../middlewares/validation.middleware"



export const createUserRouter = express.Router()

createUserRouter.post("/create-user", validateCreateUser, createUser)

