import { prisma } from "../models/index"

type CategoriaData = {
    nombre: string
}

export const obtenerCategorias = async () => {
    return await prisma.categoria.findMany()
}

export const obtenerCategoriaPorId = async (id: number) => {
    return await prisma.categoria.findUnique({
        where: { id }
    })
}

export const crearCategoria = async (data: CategoriaData) => {
    return await prisma.categoria.create({
        data
    })
}

export const actualizarCategoria = async (id: number, data: CategoriaData) => {
    return await prisma.categoria.update({
        where: { id },
        data
    })
}

export const eliminarCategoria = async (id: number) => {
    return await prisma.categoria.delete({
        where: { id }
    })
}