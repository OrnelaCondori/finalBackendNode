import express from "express"
import * as imagenController from "../controllers/imagen.controller"

const router = express.Router()

router.get("/imagenes", imagenController.obtenerImagenes)
// router.get("/imagens/:id", imagenController.obtenerImagenPorId)
router.post("/imagenes", imagenController.crearImagen)
router.put("/imagenes/:id", imagenController.actualizarImagen)
router.delete("/imagenes/:id", imagenController.eliminarImagen)

export default router