import express from "express"
import * as categoriaController from "../controllers/categoria.controller"
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware"

const router = express.Router()

router.get("/categorias", categoriaController.obtenerCategorias)
// router.get("/categorias/:id", categoriaController.obtenerCategoriaPorId)
router.post("/categorias", 
    authenticateToken,
    authorizeRoles("ADMIN"),
    categoriaController.crearCategoria
)
router.put("/categorias/:id",
    authenticateToken,
    authorizeRoles("ADMIN"),
    categoriaController.actualizarCategoria
)
router.delete("/categorias/:id", 
    authenticateToken,
    authorizeRoles("ADMIN"),
    categoriaController.eliminarCategoria
)

export default router