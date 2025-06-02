import { Request, Response } from "express";
import * as talleService from "../services/talle.service"
import {convertirBigIntAString} from "../utils/convertirBigInt"

export const obtenerTalles = async (_req: Request, res: Response) => {
    try {
        const talles = await talleService.obtenerTalles();
        const tallesConvertidos = talles.map(convertirBigIntAString)
        res.json(tallesConvertidos);
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
        return res.json(convertirBigIntAString(talle));
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener talle" });
    }
};

export const crearTalle = async (req: Request, res: Response) => {
    try {
        const nuevoTalle = await talleService.crearTalle(req.body)
        res.status(201).json(convertirBigIntAString(nuevoTalle))
    } catch (error) {
        res.status(500).json({message: "error al registrar un talle"})
    }
}

export const actualizarTalle = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const talleActualizado = await talleService.actualizarTalle(parseInt(id), req.body)
        res.status(201).json(convertirBigIntAString(talleActualizado))
    } catch (error) {
        res.status(500).json({message: "Error al actualizar talle"})
    }
}

export const eliminarTalle = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await talleService.eliminarTalle(parseInt(id));
        res.status(204).send({message: "eliminado correctamente"});;
    } catch (error) {
        res.status(500).json({message: "Error al eliminar talle"})
    }
}