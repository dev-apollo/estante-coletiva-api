import express from "express";
import * as SolicitacaoControllers from "../controllers/solicitacaoControllers.js";

const router = express.Router();

router.get("/", SolicitacaoControllers.getSolicitacoes);
router.get("/:id", SolicitacaoControllers.getSolicitacaoById);
router.delete("/:id", SolicitacaoControllers.deleteSolicitacao);
router.post("/", SolicitacaoControllers.postSolicitacao);
router.put("/:id", SolicitacaoControllers.putSolicitacao);

export default router;