import express from "express";
import * as LivroControllers from "../controllers/livroControllers.js";

const router = express.Router();

router.get("/", LivroControllers.getLivros);
router.get("/:id", LivroControllers.getLivroById);
router.delete("/:id", LivroControllers.deleteLivro);
router.post("/", LivroControllers.postLivro);
router.put("/:id", LivroControllers.putLivro);

export default router;