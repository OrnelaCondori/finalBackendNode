import express from "express"
import * as precioController from "../controllers/precio.controller"

const router = express.Router()

router.get("/precios", precioController.obtenerPrecios)
// router.get("/precios/:id", precioController.obtenerPrecioPorId)
router.post("/precios", precioController.crearPrecio)
router.put("/precios/:id", precioController.actualizarPrecio)
router.delete("/precios/:id", precioController.eliminarPrecio)

export default router