import { prisma } from "../models/index"

type TalleData = {
    numero: string
}

export const obtenerTalles = async () => {
    return await prisma.talle.findMany()
}

export const obtenerTallePorId = async (id: number) => {
    return await prisma.talle.findUnique({
        where: { id }
    })
}

export const crearTalle = async (data: TalleData) => {
    return await prisma.talle.create({
        data
    })
}

export const actualizarTalle = async (id: number, data: TalleData) => {
    return await prisma.talle.update({
        where: { id },
        data
    })
}

export const eliminarTalle = async (id: number) => {
    return await prisma.talle.delete({
        where: { id }
    })
}