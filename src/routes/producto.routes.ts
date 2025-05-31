import express from "express"
import * as productoController from "../controllers/producto.controller"

const router = express.Router()

router.get("/productos", productoController.obtenerProductos)
// router.get("/productos/:id", productoController.obtenerProductoPorId)
router.post("/productos", productoController.crearProducto)
router.put("/productos/:id", productoController.actualizarProducto)
router.delete("/productos/:id", productoController.eliminarProducto)

export default router