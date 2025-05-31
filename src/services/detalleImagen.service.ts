import { prisma } from "../models/index"

type DetalleImagenData = {
    detalleId: number
    imagenId: number
}

export const obtenerDetalleImagenes = async () => {
    return await prisma.detalleImagen.findMany()
}

export const obtenerDetalleImagenPorId = async (id: number) => {
    return await prisma.detalleImagen.findUnique({
        where: { id }
    })
}

export const crearDetalleImagen = async (data: DetalleImagenData) => {
    return await prisma.detalleImagen.create({
        data
    })
}

export const actualizarDetalleImagen = async (id: number, data: DetalleImagenData) => {
    return await prisma.detalleImagen.update({
        where: { id },
        data
    })
}

export const eliminarDetalleImagen = async (id: number) => {
    return await prisma.detalleImagen.delete({
        where: { id }
    })
}