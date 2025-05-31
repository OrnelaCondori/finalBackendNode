import { prisma } from "../models/index"

type OrdenCompraDetalleData = {
    ordenCompraId: number
    detalleId: number
}

export const obtenerOrdenCompraDetalles = async () => {
    return await prisma.ordenCompraDetalle.findMany({
        include: {
            ordenCompra: true,
            detalle: true
        }
    })
}

export const obtenerOrdenCompraDetallePorId = async (id: number) => {
    return await prisma.ordenCompraDetalle.findUnique({
        where: { id },
        include: {
            ordenCompra: true,
            detalle: true
        }
    })
}

export const crearOrdenCompraDetalle = async (data: OrdenCompraDetalleData) => {
    return await prisma.ordenCompraDetalle.create({
        data
    })
}

export const actualizarOrdenCompraDetalle = async (id: number, data: OrdenCompraDetalleData) => {
    return await prisma.ordenCompraDetalle.update({
        where: { id },
        data
    })
}

export const eliminarOrdenCompraDetalle = async (id: number) => {
    return await prisma.ordenCompraDetalle.delete({
        where: { id }
    })
}