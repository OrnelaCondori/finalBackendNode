import express from "express"
import * as ordenCompraController from "../controllers/ordenCompra.controller"

const router = express.Router()

router.get("/ordenCompras", ordenCompraController.obtenerOrdenCompras)
// router.get("/ordenCompras/:id", ordenCompraController.obtenerOrdenCompraPorId)
router.post("/ordenCompras", ordenCompraController.crearOrdenCompra)
router.put("/ordenCompras/:id", ordenCompraController.actualizarOrdenCompra)
router.delete("/ordenCompras/:id", ordenCompraController.eliminarOrdenCompra)

export default router