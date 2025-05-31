import { prisma } from "../models/index"

type DescuentoData = {
    fechaInicio: Date
    fechaFinal: Date
    porcentaje: number
}

export const obtenerDescuentos = async () => {
    return await prisma.descuento.findMany()
}

export const obtenerDescuentoPorId = async (id: number) => {
    return await prisma.descuento.findUnique({
        where: { id }
    })
}

export const crearDescuento = async (data: DescuentoData) => {
    return await prisma.descuento.create({
        data
    })
}

export const actualizarDescuento = async (id: number, data: DescuentoData) => {
    return await prisma.descuento.update({
        where: { id },
        data
    })
}

export const eliminarDescuento = async (id: number) => {
    return await prisma.descuento.delete({
        where: { id }
    })
}