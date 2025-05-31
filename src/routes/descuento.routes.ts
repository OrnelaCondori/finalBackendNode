import express from "express"
import * as descuentoController from "../controllers/descuento.controller"

const router = express.Router()

router.get("/descuentos", descuentoController.obtenerDescuentos)
// router.get("/descuentos/:id", descuentoController.obtenerDescuentoPorId)
router.post("/descuentos", descuentoController.crearDescuento)
router.put("/descuentos/:id", descuentoController.actualizarDescuento)
router.delete("/descuentos/:id", descuentoController.eliminarDescuento)

export default router