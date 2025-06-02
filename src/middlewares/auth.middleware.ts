import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string

export interface AuthRequest extends Request {
    user?: {
        id: number
        email: string
        rol: string
    }
}


export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        res.status(401).json({ message: "Falta el token" })
        return
    }

    //separa "Bearer <token>" para confirmar que el formato sea valido
    const parts = authHeader.split(" ")
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        res.status(401).json({ message: "Formato de token inválido" })
        return
    }

    const token = parts[1]

    try {
        //verifica el token
        const payload = jwt.verify(token, JWT_SECRET) as { id: number; email: string; rol: string }
        req.user = payload
        next()
    } catch (error) {
        res.status(403).json({ message: "Token inválido o expirado" })
        return
    }
}

export const authorizeRoles = (...allowedRoles: string[]) => {
    //obtiene header authorization
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
        res.status(401).json({ message: "No autenticado" })
        return
        }

        //aca verifica el tipo de usuario
        if (!allowedRoles.includes(req.user.rol)) {
        res.status(403).json({ message: "No autorizado" })
        return
        }

        next()
    }
}
