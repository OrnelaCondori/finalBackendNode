import { Request, Response } from "express";
import * as precioDescuentoService from "../services/precioDescuento.service"

export const obtenerPrecioDescuentos = async (_req: Request, res: Response) => {
    try {
        const precioDescuentos = await precioDescuentoService.obtenerPrecioDescuentos();
        res.json(precioDescuentos);
    } catch (error) {
        res.status(500).json({ message: "error al obtener precioDescuentos"});
    }
}

export const obtenerPrecioDescuentoPorId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const precioDescuento = await precioDescuentoService.obtenerPrecioDescuentoPorId(parseInt(id));
        if (!precioDescuento) {
            return res.status(404).json({ message: "PrecioDescuento no encontrado" });
        }
        return res.json(precioDescuento);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener precioDescuento" });
    }
};

export const crearPrecioDescuento = async (req: Request, res: Response) => {
    try {
        const nuevoPrecioDescuento = await precioDescuentoService.crearPrecioDescuento(req.body)
        res.status(201).json(nuevoPrecioDescuento)
    } catch (error) {
        res.status(500).json({message: "error al registrar un precioDescuento"})
    }
}

export const actualizarPrecioDescuento = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const precioDescuentoActualizado = await precioDescuentoService.actualizarPrecioDescuento(parseInt(id), req.body)
        res.status(201).json(precioDescuentoActualizado)
    } catch (error) {
        res.status(500).json({message: "Error al actualizar precioDescuento"})
    }
}

export const eliminarPrecioDescuento = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await precioDescuentoService.eliminarPrecioDescuento(parseInt(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: "Error al eliminar precioDescuento"})
    }
}