import { prisma } from "../models/index"

type ImagenData = {
    url: string
}

export const obtenerImagenes = async () => {
    return await prisma.imagen.findMany()
}

export const obtenerImagenPorId = async (id: number) => {
    return await prisma.imagen.findUnique({
        where: { id }
    })
}

export const crearImagen = async (data: ImagenData) => {
    return await prisma.imagen.create({
        data
    })
}

export const actualizarImagen = async (id: number, data: ImagenData) => {
    return await prisma.imagen.update({
        where: { id },
        data
    })
}

export const eliminarImagen = async (id: number) => {
    return await prisma.imagen.delete({
        where: { id }
    })
}