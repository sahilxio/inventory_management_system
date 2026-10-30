import express from "express"
import { createUserService } from "../services/createUser.service"



export const createUserRouter = express.Router()

createUserRouter.post("/create-user", createUserRouter)

