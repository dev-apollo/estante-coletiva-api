import * as SolicitacaoModels from "../models/solicitacaoModels.js";

export async function getSolicitacoes(req, res) {
    try {
        const solicitacoes = await SolicitacaoModels.findSolicitacoes();
        res.status(200).json(solicitacoes);
    } catch (e) {
        res.status(500).json({ erro: "Erro ao buscar solicitações." });
    }
}

export async function getSolicitacaoById(req, res) {
    try {
        const id = req.params.id;
        const solicitacao = await SolicitacaoModels.findSolicitacaoById(id);
        if (!solicitacao) {
            return res.status(404).json({ erro: "Solicitação não encontrada." });
        }
        res.status(200).json(solicitacao);
    } catch (e) {
        res.status(500).json({ erro: "Erro ao buscar solicitação." });
    }
}

export async function deleteSolicitacao(req, res) {
    try {
        const id = req.params.id;
        const removido = await SolicitacaoModels.removeSolicitacao(id);
        if (!removido) {
            return res.status(404).json({ erro: "Solicitação não encontrada." });
        }
        res.status(204).send();
    } catch (e) {
        res.status(500).json({ erro: "Erro ao remover solicitação." });
    }
}

export async function postSolicitacao(req, res) {
    try {
        const { data_solicitacao, data_conclusao, status, usuario_id, livro_id } = req.body;
        if (!data_solicitacao || !status || !usuario_id || !livro_id) {
            return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
        }
        const solicitacao = { data_solicitacao, data_conclusao: data_conclusao || null, status, usuario_id, livro_id };
        const insertId = await SolicitacaoModels.createSolicitacao(solicitacao);
        return res.status(201).json({ mensagem: "Solicitação criada com sucesso.", id: insertId });
    } catch (e) {
        res.status(500).json({ erro: "Erro ao criar solicitação." });
    };
}

export async function putSolicitacao(req, res) {
    try {
        const id = req.params.id;
        const { data_solicitacao, data_conclusao, status, usuario_id, livro_id } = req.body;
        if (!data_solicitacao || !status || !usuario_id || !livro_id) {
            return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
        }
        const solicitacao = { data_solicitacao, data_conclusao: data_conclusao || null, status, usuario_id, livro_id };
        const atualizado = await SolicitacaoModels.updateSolicitacao(id, solicitacao);
        if (!atualizado) {
            return res.status(404).json({ erro: "Solicitação não encontrada." });
        }
        return res.status(200).json({ mensagem: "Solicitação atualizada com sucesso." });
    } catch (e) {
        res.status(500).json({ erro: "Erro ao atualizar a solicitação." });
    }
}