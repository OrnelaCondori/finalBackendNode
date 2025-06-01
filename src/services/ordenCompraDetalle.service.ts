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

export const obtenerOrdenCompraDetallePorId = async (ordenCompraId: number, detalleId: number) => {
    return await prisma.ordenCompraDetalle.findUnique({
        where: {
            ordenCompraId_detalleId: {
                ordenCompraId: ordenCompraId,
                detalleId: detalleId,
            }
        }
    })
}

export const crearOrdenCompraDetalle = async (data: OrdenCompraDetalleData) => {
    return await prisma.ordenCompraDetalle.create({
        data
    })
}

export const actualizarOrdenCompraDetalle = async (ordenCompraId: number, detalleId: number, data: OrdenCompraDetalleData) => {
    return await prisma.ordenCompraDetalle.update({
        where: {
            ordenCompraId_detalleId: { ordenCompraId, detalleId }
        },
        data
    })
}

export const eliminarOrdenCompraDetalle = async (ordenCompraId: number, detalleId: number) => {
    return await prisma.ordenCompraDetalle.delete({
        where: { ordenCompraId_detalleId: { ordenCompraId, detalleId } }
    })
}