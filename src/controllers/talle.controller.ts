import { Request, Response } from "express";
import * as talleService from "../services/talle.service"

export const obtenerTalles = async (_req: Request, res: Response) => {
    try {
        const talles = await talleService.obtenerTalles();
        res.json(talles);
    } catch (error) {
        res.status(500).json({ message: "error al obtener talles"});
    }
}

export const obtenerTallePorId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const talle = await talleService.obtenerTallePorId(parseInt(id));
        if (!talle) {
            return res.status(404).json({ message: "Talle no encontrado" });
        }
        return res.json(talle);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener talle" });
    }
};

export const crearTalle = async (req: Request, res: Response) => {
    try {
        const nuevoTalle = await talleService.crearTalle(req.body)
        res.status(201).json(nuevoTalle)
    } catch (error) {
        res.status(500).json({message: "error al registrar un talle"})
    }
}

export const actualizarTalle = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const talleActualizado = await talleService.actualizarTalle(parseInt(id), req.body)
        res.status(201).json(talleActualizado)
    } catch (error) {
        res.status(500).json({message: "Error al actualizar talle"})
    }
}

export const eliminarTalle = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await talleService.eliminarTalle(parseInt(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: "Error al eliminar talle"})
    }
}