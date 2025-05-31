import { Request, Response } from "express";
import * as ordenCompraService from "../services/ordenCompra.service"

export const obtenerOrdenCompras = async (_req: Request, res: Response) => {
    try {
        const ordenCompras = await ordenCompraService.obtenerOrdenCompras();
        res.json(ordenCompras);
    } catch (error) {
        res.status(500).json({ message: "error al obtener ordenCompras"});
    }
}

export const obtenerOrdenCompraPorId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const ordenCompra = await ordenCompraService.obtenerOrdenCompraPorId(parseInt(id));
        if (!ordenCompra) {
            return res.status(404).json({ message: "OrdenCompra no encontrado" });
        }
        return res.json(ordenCompra);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener ordenCompra" });
    }
};

export const crearOrdenCompra = async (req: Request, res: Response) => {
    try {
        const nuevoOrdenCompra = await ordenCompraService.crearOrdenCompra(req.body)
        res.status(201).json(nuevoOrdenCompra)
    } catch (error) {
        res.status(500).json({message: "error al registrar un ordenCompra"})
    }
}

export const actualizarOrdenCompra = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const ordenCompraActualizado = await ordenCompraService.actualizarOrdenCompra(parseInt(id), req.body)
        res.status(201).json(ordenCompraActualizado)
    } catch (error) {
        res.status(500).json({message: "Error al actualizar ordenCompra"})
    }
}

export const eliminarOrdenCompra = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await ordenCompraService.eliminarOrdenCompra(parseInt(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: "Error al eliminar ordenCompra"})
    }
}