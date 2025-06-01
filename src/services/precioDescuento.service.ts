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

export const obtenerPrecioDescuentoPorId = async (
    precioId: number,
    descuentoId: number
    ) => {
    return await prisma.precioDescuento.findUnique({
        where: {
        precioId_descuentoId: {
            precioId,
            descuentoId
        }
        },
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

export const actualizarPrecioDescuento = async (
    precioId: number,
    descuentoId: number,
    data: PrecioDescuentoData
    ) => {
    return await prisma.precioDescuento.update({
        where: {
        precioId_descuentoId: {
            precioId,
            descuentoId
        }
        },
        data
    })
}

export const eliminarPrecioDescuento = async (
    precioId: number,
    descuentoId: number
    ) => {
    return await prisma.precioDescuento.delete({
        where: {
        precioId_descuentoId: {
            precioId,
            descuentoId
        }
        }
    })
}
