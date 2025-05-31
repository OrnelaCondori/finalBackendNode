import { Request, Response } from "express";
import * as detalleImagenService from "../services/detalleImagen.service"

export const obtenerDetalleImagenes = async (_req: Request, res: Response) => {
    try {
        const detalleImagens = await detalleImagenService.obtenerDetalleImagenes();
        res.json(detalleImagens);
    } catch (error) {
        res.status(500).json({ message: "error al obtener detalleImagens"});
    }
}

export const obtenerDetalleImagenPorId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const detalleImagen = await detalleImagenService.obtenerDetalleImagenPorId(parseInt(id));
        if (!detalleImagen) {
            return res.status(404).json({ message: "DetalleImagen no encontrado" });
        }
        return res.json(detalleImagen);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener detalleImagen" });
    }
};

export const crearDetalleImagen = async (req: Request, res: Response) => {
    try {
        const nuevoDetalleImagen = await detalleImagenService.crearDetalleImagen(req.body)
        res.status(201).json(nuevoDetalleImagen)
    } catch (error) {
        res.status(500).json({message: "error al registrar un detalleImagen"})
    }
}

export const actualizarDetalleImagen = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const detalleImagenActualizado = await detalleImagenService.actualizarDetalleImagen(parseInt(id), req.body)
        res.status(201).json(detalleImagenActualizado)
    } catch (error) {
        res.status(500).json({message: "Error al actualizar detalleImagen"})
    }
}

export const eliminarDetalleImagen = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await detalleImagenService.eliminarDetalleImagen(parseInt(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: "Error al eliminar detalleImagen"})
    }
}