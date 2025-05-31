import express from "express";
import * as userController from "../controllers/usuario.controller";

const router = express.Router();

router.get("/usuarios", userController.obtenerUsuarios);
router.post("/usuarios", userController.registrarUsuario);
router.put("/usuarios/:id", userController.actualizarUsuario);
router.delete("/usuarios/:id", userController.eliminarUsuario);

export default router;
