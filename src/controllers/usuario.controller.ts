import { Request, Response } from "express";
import * as usuarioService from "../services/usuario.service"

export const obtenerUsuarios = async (_req: Request, res: Response) => {
    try {
        const usuarios = await usuarioService.obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "error al obtener usuarios"});
    }
}

export const obtenerUsuarioPorId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.obtenerUsuarioPorId(parseInt(id));
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.json(usuario);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener usuario" });
    }
};

export const crearUsuario = async (req: Request, res: Response) => {
    try {
        const nuevoUsuario = await usuarioService.crearUsuario(req.body)
        res.status(201).json(nuevoUsuario)
    } catch (error) {
        res.status(500).json({message: "error al registrar un usuario"})
    }
}

export const actualizarUsuario = async(req: Request, res: Response) => {
    try {
        const { id} = req.params;
        const usuarioActualizado = await usuarioService.actualizarUsuario(parseInt(id), req.body)
        res.status(201).json(usuarioActualizado)
    } catch (error) {
        res.status(500).json({message: "Error al actualizar usuario"})
    }
}

export const eliminarUsuario = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await usuarioService.eliminarUsuario(parseInt(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: "Error al eliminar usuario"})
    }
}