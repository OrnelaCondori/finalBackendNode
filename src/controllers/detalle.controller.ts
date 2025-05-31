import { Request, Response } from "express";
import * as detalleService from "../services/detalle.service"

export const obtenerDetalles = async (_req: Request, res: Response) => {
    try {
        const detalles = await detalleService.obtenerDetalles();
        res.json(detalles);
    } catch (error) {
        res.status(500).json({ message: "error al obtener detalles"});
    }
}

export const obtenerDetallePorId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const detalle = await detalleService.obtenerDetallePorId(parseInt(id));
        if (!detalle) {
            return res.status(404).json({ message: "Detalle no encontrado" });
        }
        return res.json(detalle);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener detalle" });
    }
};

export const crearDetalle = async (req: Request, res: Response) => {
    try {
        const nuevoDetalle = await detalleService.crearDetalle(req.body)
        res.status(201).json(nuevoDetalle)
    } catch (error) {
        res.status(500).json({message: "error al registrar un detalle"})
    }
}

export const actualizarDetalle = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const detalleActualizado = await detalleService.actualizarDetalle(parseInt(id), req.body)
        res.status(201).json(detalleActualizado)
    } catch (error) {
        res.status(500).json({message: "Error al actualizar detalle"})
    }
}

export const eliminarDetalle = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await detalleService.eliminarDetalle(parseInt(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: "Error al eliminar detalle"})
    }
}