import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

export const login = async (req: Request, res: Response, next: NextFunction)  => {
    try {
        const { email, contraseña } = req.body;

        // Validación de campos
        if (!email || !contraseña) {
            return res.status(400).json({ message: "Falta el email o la contraseña" });
        }

        const { token, usuario } = await authService.loginUsuario({ email, contraseña });

        return res.status(200).json({ token, usuario });
    } catch (error: any) {
        if (error.message === "Correo inválido") {
            return res.status(401).json({ message: "Email incorrecto" });
        }
        if (error.message === "Contraseña incorrecta") {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        console.error("Error en login:", error);
        return res.status(500).json({ message: "Error en el login" });
    }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, contraseña, nombre, dni, rol } = req.body;

        if (!email || !contraseña || !nombre || !dni) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        const { token, usuario } = await authService.registerUsuario({
            email,
            contraseña,
            nombre,
            dni,
            rol,
        });

        return res.status(201).json({ token, usuario });
    } catch (error: any) {
        if (error.message === "El usuario ya está registrado") {
            return res.status(409).json({ message: error.message });
        }

        console.error("Error en register:", error);
        return res.status(500).json({ message: "Error al registrar usuario" });
    }
};




