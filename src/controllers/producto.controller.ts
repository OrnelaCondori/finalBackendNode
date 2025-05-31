import { Request, Response } from "express";
import * as productoService from "../services/producto.service"

export const obtenerProductos = async (_req: Request, res: Response) => {
    try {
        const productos = await productoService.obtenerProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: "error al obtener productos"});
    }
}

export const obtenerProductoPorId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const producto = await productoService.obtenerProductoPorId(parseInt(id));
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        return res.json(producto);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener producto" });
    }
};

export const crearProducto = async (req: Request, res: Response) => {
    try {
        const nuevoProducto = await productoService.crearProducto(req.body)
        res.status(201).json(nuevoProducto)
    } catch (error) {
        res.status(500).json({message: "error al registrar un producto"})
    }
}

export const actualizarProducto = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const productoActualizado = await productoService.actualizarProducto(parseInt(id), req.body)
        res.status(201).json(productoActualizado)
    } catch (error) {
        res.status(500).json({message: "Error al actualizar producto"})
    }
}

export const eliminarProducto = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await productoService.eliminarProducto(parseInt(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: "Error al eliminar producto"})
    }
}