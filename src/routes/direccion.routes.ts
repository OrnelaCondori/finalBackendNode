import express from "express"
import * as direccionController from "../controllers/direccion.controller"

const router = express.Router()

router.get("/direcciones", direccionController.obtenerDirecciones)
// router.get("/direccions/:id", direccionController.obtenerDireccionPorId)
router.post("/direcciones", direccionController.crearDireccion)
router.put("/direcciones/:id", direccionController.actualizarDireccion)
router.delete("/direcciones/:id", direccionController.eliminarDireccion)

export default router