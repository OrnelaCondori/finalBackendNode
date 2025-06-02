import { Request, Response } from "express";
import * as categoriaService from "../services/categoria.service"
import {convertirBigIntAString} from "../utils/convertirBigInt"

export const obtenerCategorias = async (_req: Request, res: Response) => {
    try {
        const categorias = await categoriaService.obtenerCategorias();
        const categoriasConvertidas = categorias.map(convertirBigIntAString);
        res.json(categoriasConvertidas);
    } catch (error) {
        res.status(500).json({ message: "error al obtener categorias"});
    }
}

export const obtenerCategoriaPorId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const categoria = await categoriaService.obtenerCategoriaPorId(parseInt(id));
        if (!categoria) {
            return res.status(404).json({ message: "Categoria no encontrado" });
        }
        return res.json(convertirBigIntAString( categoria));
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener categoria" });
    }
};

export const crearCategoria = async (req: Request, res: Response) => {
    try {
        const nuevoCategoria = await categoriaService.crearCategoria(req.body)
        res.status(201).json(convertirBigIntAString(nuevoCategoria))
    } catch (error) {
        res.status(500).json({message: "error al registrar un categoria"})
    }
}

export const actualizarCategoria = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const categoriaActualizado = await categoriaService.actualizarCategoria(parseInt(id), req.body)
        res.status(201).json(convertirBigIntAString((categoriaActualizado)))
    } catch (error) {
        res.status(500).json({message: "Error al actualizar categoria"})
    }
}

export const eliminarCategoria = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await categoriaService.eliminarCategoria(parseInt(id));
        res.status(204).send({message: "eliminado correctamente"});
    } catch (error) {
        res.status(500).json({message: "Error al eliminar categoria"})
    }
}