import { Request, Response } from "express";
import * as imagenService from "../services/imagen.service"
import {convertirBigIntAString} from "../utils/convertirBigInt"

export const obtenerImagenes = async (_req: Request, res: Response) => {
    try {
        const imagens = await imagenService.obtenerImagenes();
        const imagensConvertidas = imagens.map(convertirBigIntAString)
        res.json(imagensConvertidas);
    } catch (error) {
        res.status(500).json({ message: "error al obtener imagens"});
    }
}

export const obtenerImagenPorId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const imagen = await imagenService.obtenerImagenPorId(parseInt(id));
        if (!imagen) {
            return res.status(404).json({ message: "Imagen no encontrado" });
        }
        return res.json(convertirBigIntAString(imagen));
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener imagen" });
    }
};

export const crearImagen = async (req: Request, res: Response) => {
    try {
        const nuevoImagen = await imagenService.crearImagen(req.body)
        res.status(201).json(convertirBigIntAString(nuevoImagen))
    } catch (error) {
        res.status(500).json({message: "error al registrar un imagen"})
    }
}

export const actualizarImagen = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const imagenActualizado = await imagenService.actualizarImagen(parseInt(id), req.body)
        res.status(201).json(convertirBigIntAString(imagenActualizado))
    } catch (error) {
        res.status(500).json({message: "Error al actualizar imagen"})
    }
}

export const eliminarImagen = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await imagenService.eliminarImagen(parseInt(id));
        res.status(204).send({message: "eliminado correctamente"});;
    } catch (error) {
        res.status(500).json({message: "Error al eliminar imagen"})
    }
}