import express from "express"
import * as ordenCompraDetalleController from "../controllers/ordenCompraDetalle.controller"

const router = express.Router()

router.get("/ordenCompraDetalles", ordenCompraDetalleController.obtenerordenCompraDetalles)
// router.get("/ordenCompraDetalles/:id", ordenCompraDetalleController.obtenerordenCompraDetallePorId)
router.post("/ordenCompraDetalles", ordenCompraDetalleController.crearordenCompraDetalle)
router.put("/ordenCompraDetalles/:id", ordenCompraDetalleController.actualizarordenCompraDetalle)
router.delete("/ordenCompraDetalles/:id", ordenCompraDetalleController.eliminarordenCompraDetalle)

export default router