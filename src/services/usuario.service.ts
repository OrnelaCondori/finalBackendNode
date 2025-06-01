import { prisma } from "../models/index"
import { hashContrasena } from "./auth.service"

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

    //uso el hasher de contraseña
    const hashed = await hashContrasena(data.contraseña)

    //locrea on la contraseña hasheada
    return await prisma.usuario.create({
        data: {
            nombre: data.nombre,
            email: data.email,
            contraseña: hashed,
            dni: data.dni,
            rol: data.rol
        }
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