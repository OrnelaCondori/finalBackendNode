import dotenv from "dotenv"
import * as jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { prisma } from "../models/index"

// Para hashear la contraseña
const SALT_ROUNDS = 10

export const hashContrasena = async (plain: string): Promise<string> => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashed = await bcrypt.hash(plain, salt)
    return hashed
}

export const compararContrasena = async (
    plain: string,
    hash: string
): Promise<boolean> => {
    return await bcrypt.compare(plain, hash)
}

// Lógica de login y autenticación
dotenv.config()

//const JWT_SECRET = process.env.JWT_SECRET as string
const secret = process.env.JWT_SECRET!;
const JWT_EXPIRES_INN = process.env.JWT_EXPIRES_IN || "6d"

type LoginData = {
    email: string
    contraseña: string
}

type RegisterData = {
    email: string;
    contraseña: string;
    nombre: string;
    dni: string;
    rol?: "ADMIN" | "CLIENTE";
};

export const loginUsuario = async (data: LoginData) => {
    const { email, contraseña } = data

    // busca al usuario por email
    const usuario = await prisma.usuario.findUnique({ where: { email } })
    if (!usuario) {
        throw new Error("Correo inválido")
    }

    // compara la contraseña
    const isValid = await compararContrasena(contraseña, usuario.contraseña)
    if (!isValid) {
        throw new Error("Contraseña incorrecta")
    }

  // genera payload (sin incluir la contraseña)
    const payload = {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
    }

    // firma el token
    const token = jwt.sign(
        payload as object,
        secret as jwt.Secret, //casteo explicitamente sino da error

        { expiresIn: JWT_EXPIRES_INN } as jwt.SignOptions
        )

    return { token, usuario: payload }
}

export const registerUsuario = async (data: RegisterData) => {
    const { email, contraseña, nombre, dni, rol = "CLIENTE" } = data;

    // Verifica si ya existe
    const existe = await prisma.usuario.findUnique({ where: { email } });
    if (existe) {
        throw new Error("El usuario ya está registrado");
    }

    // Hashea la contraseña
    const hashedPassword = await hashContrasena(contraseña);

    // Crea el usuario
    const nuevoUsuario = await prisma.usuario.create({
        data: {
            email,
            contraseña: hashedPassword,
            nombre,
            dni,
            rol,
        },
    });

    // Arma el payload para el token
    const payload = {
        id: nuevoUsuario.id,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
    };

    // const token = jwt.sign(
    //     payload as object,    //tengo que declarar explicitamente el tipo de dato
    //     secret as jwt.Secret, 

    //     { expiresIn: JWT_EXPIRES_INN} as jwt.SignOptions);   //tengo que declarar explicitamente el tipo de dato

    // return { token, usuario: payload };
};