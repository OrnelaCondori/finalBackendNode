import { Request, Response } from "express";
import * as direccionService from "../services/direccion.service"
import {convertirBigIntAString} from "../utils/convertirBigInt"

export const obtenerDirecciones = async (_req: Request, res: Response) => {
    try {
        const direccions = await direccionService.obtenerDirecciones();
        const direccionsConvertido = direccions.map(convertirBigIntAString)
        res.json(direccionsConvertido);
    } catch (error) {
        res.status(500).json({ message: "error al obtener direccions"});
    }
}

export const obtenerDireccionPorId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const direccion = await direccionService.obtenerDireccionPorId(parseInt(id));
        if (!direccion) {
            return res.status(404).json({ message: "Direccion no encontrado" });
        }
        return res.json(convertirBigIntAString(direccion));
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener direccion" });
    }
};

export const crearDireccion = async (req: Request, res: Response) => {
    try {
        const nuevoDireccion = await direccionService.crearDireccion(req.body)
        res.status(201).json(convertirBigIntAString(nuevoDireccion))
    } catch (error) {
        res.status(500).json({message: "error al registrar un direccion"})
    }
}

export const actualizarDireccion = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const direccionActualizado = await direccionService.actualizarDireccion(parseInt(id), req.body)
        res.status(201).json(convertirBigIntAString(direccionActualizado))
    } catch (error) {
        res.status(500).json({message: "Error al actualizar direccion"})
    }
}

export const eliminarDireccion = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await direccionService.eliminarDireccion(parseInt(id));
        res.status(204).send({message: "eliminado correctamente"});;
    } catch (error) {
        res.status(500).json({message: "Error al eliminar direccion"})
    }
}