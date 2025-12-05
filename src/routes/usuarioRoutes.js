import express from "express";
import * as UsuarioControllers from "../controllers/usuarioControllers.js";

const router = express.Router();

router.get("/", UsuarioControllers.getUsuarios);
router.get("/:id", UsuarioControllers.getUsuarioById);
router.delete("/:id", UsuarioControllers.deleteUsuario);

export default router;