import { prisma } from "../models/index"

type UsuarioData = {
    nombre: string
    email: string
    contraseña: string
    dni: string
    rol: "ADMIN" | "CLIENTE";
}

export const obtenerUsuarios = async () => {
    return await prisma.usuario.findMany()
}

export const obtenerUsuarioPorId = async (id: number) => {
    return await prisma.usuario.findUnique({
        where: { id }
    })
}

export const crearUsuario = async (data: UsuarioData) => {
    return await prisma.usuario.create({
        data
    })
}

export const actualizarUsuario = async (id: number, data: UsuarioData) => {
    return await prisma.usuario.update({
        where: { id },
        data
    })
}

export const eliminarUsuario = async (id: number) => {
    return await prisma.usuario.delete({
        where: { id }
    })
}