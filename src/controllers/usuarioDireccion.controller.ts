import { Request, Response } from "express";
import * as usuarioDireccionService from "../services/usuarioDireccion.service"
import {convertirBigIntAString} from "../utils/convertirBigInt"

export const obtenerUsuarioDirecciones = async (_req: Request, res: Response) => {
    try {
        const usuarioDireccions = await usuarioDireccionService.obtenerUsuarioDirecciones();
        const usuarioDireccionsConvertido = usuarioDireccions.map(convertirBigIntAString)
        res.json(usuarioDireccionsConvertido);
    } catch (error) {
        res.status(500).json({ message: "error al obtener usuarioDireccions"});
    }
}

export const obtenerUsuarioDireccionPorId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const usuarioDireccion = await usuarioDireccionService.obtenerUsuarioDireccionPorId(parseInt(id));
        if (!usuarioDireccion) {
            return res.status(404).json({ message: "UsuarioDireccion no encontrado" });
        }
        return res.json(convertirBigIntAString(usuarioDireccion));
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener usuarioDireccion" });
    }
};

export const crearUsuarioDireccion = async (req: Request, res: Response) => {
    try {
        const nuevoUsuarioDireccion = await usuarioDireccionService.crearUsuarioDireccion(req.body)
        res.status(201).json(convertirBigIntAString(nuevoUsuarioDireccion))
    } catch (error) {
        res.status(500).json({message: "error al registrar un usuarioDireccion"})
    }
}

export const actualizarUsuarioDireccion = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const usuarioDireccionActualizado = await usuarioDireccionService.actualizarUsuarioDireccion(parseInt(id), req.body)
        res.status(201).json(convertirBigIntAString(usuarioDireccionActualizado))
    } catch (error) {
        res.status(500).json({message: "Error al actualizar usuarioDireccion"})
    }
}

export const eliminarUsuarioDireccion = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await usuarioDireccionService.eliminarUsuarioDireccion(parseInt(id));
        res.status(204).send({message: "eliminado correctamente"});;
    } catch (error) {
        res.status(500).json({message: "Error al eliminar usuarioDireccion"})
    }
}