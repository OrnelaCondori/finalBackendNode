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

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    //obtiene header authorization
    const authHeader = req.headers["authorization"]
    if(!authHeader) {
        return res.status(401).json({ message: "falta el token"})
    }

    //separa "Bearer <token>" para confirmar que el formato sea valido
    const parts = authHeader.split(" ")
    if ( parts.length !=2  || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Formato de token inválido" })
    }

    const token = parts[1]

    try {
        //verifica el token
        const payload = jwt.verify(token, JWT_SECRET) as {id: number, email: string, rol: string}
        //guarda los datos
        req.user = payload
        next()
    } catch (error) {
        return res.status(403).json({message: "token invalido o expirado"})
    }
}

export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "No autenticado" })
        }
        //aca verifica el tipo de usuario
        if (!allowedRoles.includes(req.user.rol)) {
            return res.status(403).json({ message: "No autorizado" })
        }
        next()
    }
}