import express from "express"
import * as talleController from "../controllers/talle.controller"

const router = express.Router()

router.get("/talles", talleController.obtenerTalles)
// router.get("/talles/:id", talleController.obtenerTallePorId)
router.post("/talles", talleController.crearTalle)
router.put("/talles/:id", talleController.actualizarTalle)
router.delete("/talles/:id", talleController.eliminarTalle)

export default router