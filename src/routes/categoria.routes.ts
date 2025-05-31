import express from "express"
import * as categoriaController from "../controllers/categoria.controller"

const router = express.Router()

router.get("/categorias", categoriaController.obtenerCategorias)
// router.get("/categorias/:id", categoriaController.obtenerCategoriaPorId)
router.post("/categorias", categoriaController.crearCategoria)
router.put("/categorias/:id", categoriaController.actualizarCategoria)
router.delete("/categorias/:id", categoriaController.eliminarCategoria)

export default router