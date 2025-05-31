import { prisma } from "../models/index"

type DetalleData = {
    color: string
    marca: string
    stock: number
    estado: boolean
    productoId: number
    talleId: number
    precioId: number
}

export const obtenerDetalles = async () => {
    return await prisma.detalle.findMany({
        include: {
            producto: true,
            talle: true,
            precio: true
        }
    })
}

export const obtenerDetallePorId = async (id: number) => {
    return await prisma.detalle.findUnique({
        where: { id },
        include: {   // trae los datos completos de del usuario y direccion relacionada
            producto: true,
            talle: true,
            precio: true
        }
    })
}

export const crearDetalle = async (data: DetalleData) => {
    return await prisma.detalle.create({
        data
    })
}

export const actualizarDetalle = async (id: number, data: DetalleData) => {
    return await prisma.detalle.update({
        where: { id },
        data
    })
}

export const eliminarDetalle = async (id: number) => {
    return await prisma.detalle.delete({
        where: { id }
    })
}
