import express from "express"
import * as precioDescuentoController from "../controllers/precioDescuento.controller"

const router = express.Router()

router.get("/precioDescuentos", precioDescuentoController.obtenerPrecioDescuentos)
// router.get("/precioDescuentos/:id", precioDescuentoController.obtenerPrecioDescuentoPorId)
router.post("/precioDescuentos", precioDescuentoController.crearPrecioDescuento)
router.put("/precioDescuentos/:id", precioDescuentoController.actualizarPrecioDescuento)
router.delete("/precioDescuentos/:id", precioDescuentoController.eliminarPrecioDescuento)

export default router