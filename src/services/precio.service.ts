import { prisma } from "../models/index"

type PrecioData = {
    precioCompra: number
    precioVenta: number
}

export const obtenerPrecios = async () => {
    return await prisma.precio.findMany()
}

export const obtenerPrecioPorId = async (id: number) => {
    return await prisma.precio.findUnique({
        where: { id }
    })
}

export const crearPrecio = async (data: PrecioData) => {
    return await prisma.precio.create({
        data
    })
}

export const actualizarPrecio = async (id: number, data: PrecioData) => {
    return await prisma.precio.update({
        where: { id },
        data
    })
}

export const eliminarPrecio = async (id: number) => {
    return await prisma.precio.delete({
        where: { id }
    })
}