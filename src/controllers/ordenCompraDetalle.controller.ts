// src/controllers/ordenCompraDetalle.controller.ts
import { Request, Response } from "express"
import * as ordenCompraDetalleService from "../services/ordenCompraDetalle.service"

export const obtenerOrdenCompraDetalles = async (_req: Request, res: Response) => {
    try {
        const ordenCompraDetalles = await ordenCompraDetalleService.obtenerOrdenCompraDetalles()
        res.json(ordenCompraDetalles)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener ordenCompraDetalles" })
    }
}

export const obtenerOrdenCompraDetallePorId = async (req: Request, res: Response) => {
    try {
        // Extraemos ambos parámetros de la URL
        const ordenCompraId = parseInt(req.params.ordenCompraId)
        const detalleId = parseInt(req.params.detalleId)

        const ordenCompraDetalle =
        await ordenCompraDetalleService.obtenerOrdenCompraDetallePorId(ordenCompraId, detalleId)
        if (!ordenCompraDetalle) {
        return res.status(404).json({ message: "ordenCompraDetalle no encontrado" })
        }
        return res.json(ordenCompraDetalle)
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener ordenCompraDetalle" })
    }
}

export const crearOrdenCompraDetalle = async (req: Request, res: Response) => {
    try {
        // El body debe contener { ordenCompraId, detalleId }
        const { ordenCompraId, detalleId } = req.body
        const nuevo = await ordenCompraDetalleService.crearOrdenCompraDetalle({
        ordenCompraId: Number(ordenCompraId),
        detalleId: Number(detalleId),
        })
        res.status(201).json(nuevo)
    } catch (error) {
        res.status(500).json({ message: "Error al registrar un ordenCompraDetalle" })
    }
}

export const actualizarOrdenCompraDetalle = async (req: Request, res: Response) => {
    try {
        const ordenCompraId = parseInt(req.params.ordenCompraId)
        const detalleId = parseInt(req.params.detalleId)
        // El body puede incluir campos que quieras actualizar, 
        // pero en este caso la tabla intermedia solo tiene keys, 
        // así que generalmente no hay más campos. Ajusta según tu modelo.
        const data = {
        ordenCompraId: Number(req.body.ordenCompraId),
        detalleId: Number(req.body.detalleId),
        }
        const actualizado =
        await ordenCompraDetalleService.actualizarOrdenCompraDetalle(ordenCompraId, detalleId, data)
        res.status(200).json(actualizado)
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar ordenCompraDetalle" })
    }
}

export const eliminarOrdenCompraDetalle = async (req: Request, res: Response) => {
    try {
        const ordenCompraId = parseInt(req.params.ordenCompraId)
        const detalleId = parseInt(req.params.detalleId)
        await ordenCompraDetalleService.eliminarOrdenCompraDetalle(ordenCompraId, detalleId)
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar ordenCompraDetalle" })
    }
}
