import express from "express"
import * as usuarioController from "../controllers/usuario.controller"

const router = express.Router()

router.get("/usuarios", usuarioController.obtenerUsuarios)
// router.get("/usuarios/:id", usuarioController.obtenerUsuarioPorId)
router.post("/usuarios", usuarioController.crearUsuario)
router.put("/usuarios/:id", usuarioController.actualizarUsuario)
router.delete("/usuarios/:id", usuarioController.eliminarUsuario)

export default router