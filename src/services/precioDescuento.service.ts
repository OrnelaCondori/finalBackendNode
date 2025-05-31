import { prisma } from "../models/index"

type PrecioDescuentoData = {
    precioId: number
    descuentoId: number
}

export const obtenerPrecioDescuentos = async () => {
    return await prisma.precioDescuento.findMany({
        include: {
            precio: true,
            descuento: true
        }
    })
    
}

export const obtenerPrecioDescuentoPorId = async (id: number) => {
    return await prisma.precioDescuento.findUnique({
        where: { id },
        include: {
            precio: true,
            descuento: true
        }
    })
}

export const crearPrecioDescuento = async (data: PrecioDescuentoData) => {
    return await prisma.precioDescuento.create({
        data
    })
}

export const actualizarPrecioDescuento = async (id: number, data: PrecioDescuentoData) => {
    return await prisma.precioDescuento.update({
        where: { id },
        data
    })
}

export const eliminarPrecioDescuento = async (id: number) => {
    return await prisma.precioDescuento.delete({
        where: { id }
    })
}