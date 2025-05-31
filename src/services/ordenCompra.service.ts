import { prisma } from "../models/index"

type OrdenCompraData = {
    fechaCompra: Date
    total: number
    usuarioDireccionId: number
}

export const obtenerOrdenCompras = async () => {
    return await prisma.ordenCompra.findMany()
}

export const obtenerOrdenCompraPorId = async (id: number) => {
    return await prisma.ordenCompra.findUnique({
        where: { id }
    })
}

export const crearOrdenCompra = async (data: OrdenCompraData) => {
    return await prisma.ordenCompra.create({
        data
    })
}

export const actualizarOrdenCompra = async (id: number, data: OrdenCompraData) => {
    return await prisma.ordenCompra.update({
        where: { id },
        data
    })
}

export const eliminarOrdenCompra = async (id: number) => {
    return await prisma.ordenCompra.delete({
        where: { id }
    })
}