import express from "express"
import * as usuarioDireccionController from "../controllers/usuarioDireccion.controller"

const router = express.Router()

router.get("/usuarioDirecciones", usuarioDireccionController.obtenerUsuarioDirecciones)
// router.get("/usuarioDireccions/:id", usuarioDireccionController.obtenerUsuarioDireccionPorId)
router.post("/usuarioDirecciones", usuarioDireccionController.crearUsuarioDireccion)
router.put("/usuarioDirecciones/:id", usuarioDireccionController.actualizarUsuarioDireccion)
router.delete("/usuarioDirecciones/:id", usuarioDireccionController.eliminarUsuarioDireccion)

export default router