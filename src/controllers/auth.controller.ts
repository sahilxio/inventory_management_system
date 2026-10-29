import { LoginUser } from "../types/auth.type";
import {Request, Response} from "express"
import { loginService } from "../services/login.service";

export async function login(
    req: Request<{}, {}, LoginUser>,
    res: Response
) {
    
    try {
        const user = await loginService(req.body)

        return res.status(201).json({
            message: "user logged-in successfully",
            success: true,
            user
        })
    } catch (error) {
        
    }
}