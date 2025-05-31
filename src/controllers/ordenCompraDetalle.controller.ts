import { Request, Response } from "express";
import * as ordenCompraDetalleService from "../services/ordenCompraDetalle.service"

export const obtenerordenCompraDetalles = async (_req: Request, res: Response) => {
    try {
        const ordenCompraDetalles = await ordenCompraDetalleService.obtenerOrdenCompraDetalles();
        res.json(ordenCompraDetalles);
    } catch (error) {
        res.status(500).json({ message: "error al obtener ordenCompraDetalles"});
    }
}

export const obtenerordenCompraDetallePorId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const ordenCompraDetalle = await ordenCompraDetalleService.obtenerOrdenCompraDetallePorId(parseInt(id));
        if (!ordenCompraDetalle) {
            return res.status(404).json({ message: "ordenCompraDetalle no encontrado" });
        }
        return res.json(ordenCompraDetalle);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener ordenCompraDetalle" });
    }
};

export const crearordenCompraDetalle = async (req: Request, res: Response) => {
    try {
        const nuevoordenCompraDetalle = await ordenCompraDetalleService.crearOrdenCompraDetalle(req.body)
        res.status(201).json(nuevoordenCompraDetalle)
    } catch (error) {
        res.status(500).json({message: "error al registrar un ordenCompraDetalle"})
    }
}

export const actualizarordenCompraDetalle = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const ordenCompraDetalleActualizado = await ordenCompraDetalleService.actualizarOrdenCompraDetalle(parseInt(id), req.body)
        res.status(201).json(ordenCompraDetalleActualizado)
    } catch (error) {
        res.status(500).json({message: "Error al actualizar ordenCompraDetalle"})
    }
}

export const eliminarordenCompraDetalle = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await ordenCompraDetalleService.eliminarOrdenCompraDetalle(parseInt(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: "Error al eliminar ordenCompraDetalle"})
    }
}