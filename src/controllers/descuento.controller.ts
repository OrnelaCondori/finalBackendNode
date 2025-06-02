import { Request, Response } from "express";
import * as descuentoService from "../services/descuento.service"
import {convertirBigIntAString} from "../utils/convertirBigInt"

export const obtenerDescuentos = async (_req: Request, res: Response) => {
    try {
        const descuentos = await descuentoService.obtenerDescuentos();
        const descuentosConvertidos = descuentos.map(convertirBigIntAString);
        res.json(descuentosConvertidos);
    } catch (error) {
        res.status(500).json({ message: "error al obtener descuentos"});
    }
}

export const obtenerDescuentoPorId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const descuento = await descuentoService.obtenerDescuentoPorId(parseInt(id));
        if (!descuento) {
            return res.status(404).json({ message: "Descuento no encontrado" });
        }
        return res.json(convertirBigIntAString(descuento));
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener descuento" });
    }
};

export const crearDescuento = async (req: Request, res: Response) => {
    try {
        const nuevoDescuento = await descuentoService.crearDescuento(req.body)
        res.status(201).json(convertirBigIntAString(nuevoDescuento))
    } catch (error) {
        res.status(500).json({message: "error al registrar un descuento"})
    }
}

export const actualizarDescuento = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const descuentoActualizado = await descuentoService.actualizarDescuento(parseInt(id), req.body)
        res.status(201).json(convertirBigIntAString(descuentoActualizado))
    } catch (error) {
        res.status(500).json({message: "Error al actualizar descuento"})
    }
}

export const eliminarDescuento = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await descuentoService.eliminarDescuento(parseInt(id));
        res.status(204).send({message: "eliminado correctamente"});;
    } catch (error) {
        res.status(500).json({message: "Error al eliminar descuento"})
    }
}