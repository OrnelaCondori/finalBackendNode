import express from "express"
import * as usuarioController from "../controllers/usuario.controller"
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware"

const router = express.Router()

router.get("/usuarios", 
    authenticateToken,
    authorizeRoles("ADMIN"),
    usuarioController.obtenerUsuarios
)
// router.get("/usuarios/:id", usuarioController.obtenerUsuarioPorId)
router.post("/usuarios", 
    authenticateToken,
    authorizeRoles("ADMIN"),
    usuarioController.crearUsuario
)
router.put("/usuarios/:id", 
    authenticateToken,
    authorizeRoles("ADMIN"),
    usuarioController.actualizarUsuario
)
router.delete("/usuarios/:id", 
    authenticateToken,
    authorizeRoles("ADMIN"),
    usuarioController.eliminarUsuario
)

export default router