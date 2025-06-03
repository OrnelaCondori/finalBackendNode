import express from "express"
import * as detalleController from "../controllers/detalle.controller"
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware"

const router = express.Router()

router.get("/detalles", 
detalleController.obtenerDetalles)
// router.get("/detalles/:id", detalleController.obtenerDetallePorId)
router.post("/detalles", 
authenticateToken,
authorizeRoles("ADMIN"),
detalleController.crearDetalle)
router.put("/detalles/:id", 
authenticateToken,
authorizeRoles("ADMIN"),
detalleController.actualizarDetalle)
router.delete("/detalles/:id", 
authenticateToken,
authorizeRoles("ADMIN"),
detalleController.eliminarDetalle)

export default router