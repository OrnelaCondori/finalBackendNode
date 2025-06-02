import { Request, Response } from "express"
import * as precioDescuentoService from "../services/precioDescuento.service"
import {convertirBigIntAString} from "../utils/convertirBigInt"

export const obtenerPrecioDescuentos = async (_req: Request, res: Response) => {
    try {
        const precioDescuentos = await precioDescuentoService.obtenerPrecioDescuentos()
        const precioDescuentoConvertido = precioDescuentos.map(convertirBigIntAString)
        res.json(precioDescuentoConvertido)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener precioDescuentos" })
    }
}

export const obtenerPrecioDescuentoPorId = async (req: Request, res: Response) => {
    try {
        const precioId = parseInt(req.params.precioId)
        const descuentoId = parseInt(req.params.descuentoId)

        const precioDescuento = await precioDescuentoService.obtenerPrecioDescuentoPorId(
        precioId,
        descuentoId
        )

        if (!precioDescuento) {
        return res.status(404).json({ message: "PrecioDescuento no encontrado" })
        }

        return res.json(convertirBigIntAString(precioDescuento))
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener precioDescuento" })
    }
}

export const crearPrecioDescuento = async (req: Request, res: Response) => {
    try {
        const { precioId, descuentoId } = req.body
        const nuevo = await precioDescuentoService.crearPrecioDescuento({
        precioId: Number(precioId),
        descuentoId: Number(descuentoId),
        })

        res.status(201).json(convertirBigIntAString(nuevo))
    } catch (error) {
        res.status(500).json({ message: "Error al registrar un precioDescuento" })
    }
}

export const actualizarPrecioDescuento = async (req: Request, res: Response) => {
    try {
        const precioId = parseInt(req.params.precioId)
        const descuentoId = parseInt(req.params.descuentoId)
        const { precioId: newPrecioId, descuentoId: newDescuentoId } = req.body

        const actualizado = await precioDescuentoService.actualizarPrecioDescuento(
        precioId,
        descuentoId,
        {
            precioId: Number(newPrecioId),
            descuentoId: Number(newDescuentoId),
        }
        )

        res.status(200).json(convertirBigIntAString(actualizado))
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar precioDescuento" })
    }
}

export const eliminarPrecioDescuento = async (req: Request, res: Response) => {
    try {
        const precioId = parseInt(req.params.precioId)
        const descuentoId = parseInt(req.params.descuentoId)

        await precioDescuentoService.eliminarPrecioDescuento(precioId, descuentoId)
        res.status(204).send({message: "eliminado correctamente"});
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar precioDescuento" })
    }
}
