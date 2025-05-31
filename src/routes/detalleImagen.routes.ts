import express from "express"
import * as detalleImagenController from "../controllers/detalleImagen.controller"

const router = express.Router()

router.get("/detalleImagenes", detalleImagenController.obtenerDetalleImagenes)
// router.get("/detalleImagens/:id", detalleImagenController.obtenerDetalleImagenPorId)
router.post("/detalleImagenes", detalleImagenController.crearDetalleImagen)
router.put("/detalleImagenes/:id", detalleImagenController.actualizarDetalleImagen)
router.delete("/detalleImagenes/:id", detalleImagenController.eliminarDetalleImagen)

export default router