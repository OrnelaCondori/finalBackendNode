import express from "express"
import * as detalleController from "../controllers/detalle.controller"

const router = express.Router()

router.get("/detalles", detalleController.obtenerDetalles)
// router.get("/detalles/:id", detalleController.obtenerDetallePorId)
router.post("/detalles", detalleController.crearDetalle)
router.put("/detalles/:id", detalleController.actualizarDetalle)
router.delete("/detalles/:id", detalleController.eliminarDetalle)

export default router