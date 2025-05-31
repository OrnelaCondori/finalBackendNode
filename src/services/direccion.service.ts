import { prisma } from "../models/index"

type DireccionData = {
    pais: string
    provincia: string
    departamento: string
    localidad: string
}

export const obtenerDirecciones = async () => {
    return await prisma.direccion.findMany()
}

export const obtenerDireccionPorId = async (id: number) => {
    return await prisma.direccion.findUnique({
        where: { id }
    })
}

export const crearDireccion = async (data: DireccionData) => {
    return await prisma.direccion.create({
        data
    })
}

export const actualizarDireccion = async (id: number, data: DireccionData) => {
    return await prisma.direccion.update({
        where: { id },
        data
    })
}

export const eliminarDireccion = async (id: number) => {
    return await prisma.direccion.delete({
        where: { id }
    })
}