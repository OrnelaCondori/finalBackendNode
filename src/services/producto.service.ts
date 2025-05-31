import { prisma } from "../models/index"

type ProductoData = {
    nombre: string
    sexo: "MASCULINO" | "FEMENINO" | "UNISEX" ;
    tipoProducto: "ZAPATILLA" | "REMERA" | "BUZO" | "SHORT" | "PANTALON" | "CAMPERA" | "ACCESORIO" ;
    categoriaId: number
}
export const obtenerProductos = async () => {
    return await prisma.producto.findMany()
}

export const obtenerProductoPorId = async (id: number) => {
    return await prisma.producto.findUnique({
        where: { id }
    })
}

export const crearProducto = async (data: ProductoData) => {
    return await prisma.producto.create({
        data
    })
}

export const actualizarProducto = async (id: number, data: ProductoData) => {
    return await prisma.producto.update({
        where: { id },
        data
    })
}

export const eliminarProducto = async (id: number) => {
    return await prisma.producto.delete({
        where: { id }
    })
}