import { prisma } from "../models/index"

type UsuarioDireccionData = {
    usuarioId: number
    direccionId: number
}

export const obtenerUsuarioDirecciones = async () => {
    return await prisma.usuarioDireccion.findMany({
        include: {
        usuario: true,
        direccion: true
        }
    })
}

export const obtenerUsuarioDireccionPorId = async (id: number) => {
    return await prisma.usuarioDireccion.findUnique({
        where: { id },
        include: {   // trae los datos completos de del usuario y direccion relacionada
        usuario: true,
        direccion: true
        }
    })
}

export const crearUsuarioDireccion = async (data: UsuarioDireccionData) => {
    return await prisma.usuarioDireccion.create({
        data
    })
}

export const actualizarUsuarioDireccion = async (id: number, data: UsuarioDireccionData) => {
    return await prisma.usuarioDireccion.update({
        where: { id },
        data
    })
}

export const eliminarUsuarioDireccion = async (id: number) => {
    return await prisma.usuarioDireccion.delete({
        where: { id }
    })
}
