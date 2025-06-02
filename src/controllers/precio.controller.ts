import { Request, Response } from "express";
import * as precioService from "../services/precio.service"
import {convertirBigIntAString} from "../utils/convertirBigInt"

export const obtenerPrecios = async (_req: Request, res: Response) => {
    try {
        const precios = await precioService.obtenerPrecios();
        const precionConvertidos = precios.map(convertirBigIntAString)
        res.json(precionConvertidos);
    } catch (error) {
        res.status(500).json({ message: "error al obtener precios"});
    }
}

export const obtenerPrecioPorId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const precio = await precioService.obtenerPrecioPorId(parseInt(id));
        if (!precio) {
            return res.status(404).json({ message: "Precio no encontrado" });
        }
        return res.json(convertirBigIntAString(precio));
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener precio" });
    }
};

export const crearPrecio = async (req: Request, res: Response) => {
    try {
        const nuevoPrecio = await precioService.crearPrecio(req.body)
        res.status(201).json(convertirBigIntAString(nuevoPrecio))
    } catch (error) {
        res.status(500).json({message: "error al registrar un precio"})
    }
}

export const actualizarPrecio = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const precioActualizado = await precioService.actualizarPrecio(parseInt(id), req.body)
        res.status(201).json(convertirBigIntAString(precioActualizado))
    } catch (error) {
        res.status(500).json({message: "Error al actualizar precio"})
    }
}

export const eliminarPrecio = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await precioService.eliminarPrecio(parseInt(id));
        res.status(204).send({message: "eliminado correctamente"});;
    } catch (error) {
        res.status(500).json({message: "Error al eliminar precio"})
    }
}