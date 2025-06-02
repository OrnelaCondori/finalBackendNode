import express from "express"
import * as productoController from "../controllers/producto.controller"
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware"

const router = express.Router()

router.get("/productos", productoController.obtenerProductos)
// router.get("/productos/:id", productoController.obtenerProductoPorId)
// Solo administradores pueden crear productos
router.post(
    "/productos",
    authenticateToken,
    authorizeRoles("ADMIN"),
    productoController.crearProducto
)

router.put("/productos/:id", 
    authenticateToken,
    authorizeRoles("ADMIN"),
    productoController.actualizarProducto
)
router.delete("/productos/:id", 
    authenticateToken,
    authorizeRoles("ADMIN"),
    productoController.eliminarProducto
)

export default router