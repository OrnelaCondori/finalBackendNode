import express from "express"
import * as ordenCompraDetalleController from "../controllers/ordenCompraDetalle.controller"

const router = express.Router()

router.get("/ordenCompraDetalles", ordenCompraDetalleController.obtenerOrdenCompraDetalles)
// router.get("/ordenCompraDetalles/:id", ordenCompraDetalleController.obtenerOrdenCompraDetallePorId)
router.post("/ordenCompraDetalles", ordenCompraDetalleController.crearOrdenCompraDetalle)
router.put("/ordenCompraDetalles/:id", ordenCompraDetalleController.actualizarOrdenCompraDetalle)
router.delete("/ordenCompraDetalles/:id", ordenCompraDetalleController.eliminarOrdenCompraDetalle)

export default router