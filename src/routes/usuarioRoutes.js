import express from "express";
import * as UsuarioControllers from "../controllers/usuarioControllers.js";

const router = express.Router();

router.get("/", UsuarioControllers.getUsuarios);
router.get("/:id", UsuarioControllers.getUsuarioById);
router.delete("/:id", UsuarioControllers.deleteUsuario);
router.post("/", UsuarioControllers.postUsuario);
router.put("/:id", UsuarioControllers.putUsuario);

export default router;