import * as LivroModels from "../models/livroModels.js";

export async function getLivros(req, res) {
    try {
        const livros = await LivroModels.findLivros();
        res.status(200).json(livros);
    } catch (e) {
        res.status(500).json({ erro: "Erro ao buscar livros." });
    }
}

export async function getLivroById(req, res) {
    try {
        const id = req.params.id;
        const livro = await LivroModels.findLivroById(id);
        if (!livro) {
            return res.status(404).json({ erro: "Livro não encontrado." });
        }
        res.status(200).json(livro);
    } catch (e) {
        res.status(500).json({ erro: "Erro ao buscar livro." });
    }
}

export async function deleteLivro(req, res) {
    try {
        const id = req.params.id;
        const removido = await LivroModels.removeLivro(id);
        if (!removido) {
            return res.status(404).json({ erro: "Livro não encontrado." });
        }
        res.status(204).send();
    } catch (e) {
        res.status(500).json({ erro: "Erro ao remover livro." });
    }
}

export async function postLivro(req, res) {
    try {
        const { titulo, estado_conservacao, descricao, num_paginas, data_publicacao, livro_status, usuario_id, area_conhecimento_id, editora_id, autores } = req.body;
        if (!titulo || !estado_conservacao || !descricao || !num_paginas || !data_publicacao || !livro_status || !usuario_id || !area_conhecimento_id || !editora_id || !autores || !Array.isArray(autores) || autores.length === 0) {
            return res.status(400).json({ erro: "Todos os campos são obrigatórios e deve haver pelo menos 1 autor." });
        }
        const livro = { titulo, estado_conservacao, descricao, num_paginas, data_publicacao, livro_status, usuario_id, area_conhecimento_id, editora_id };
        const insertId = await LivroModels.createLivro(livro);
        await LivroModels.addAutoresToLivro(insertId, autores);
        res.status(201).json({ mensagem: "Livro criado com sucesso.", id: insertId });
    } catch (e) {
        res.status(500).json({ erro: "Erro ao criar livro." });
    }
}

export async function putLivro(req, res) {
    try {
        const id = req.params.id;
        const { titulo, estado_conservacao, descricao, num_paginas, data_publicacao, livro_status, usuario_id, area_conhecimento_id, editora_id, autores } = req.body;
        if (!titulo || !estado_conservacao || !descricao || !num_paginas || !data_publicacao || !livro_status || !usuario_id || !area_conhecimento_id || !editora_id || !autores || !Array.isArray(autores) || autores.length === 0) {
            return res.status(400).json({ erro: "Todos os campos são obrigatórios e deve haver pelo menos 1 autor." });
        }
        const livro = { titulo, estado_conservacao, descricao, num_paginas, data_publicacao, livro_status, usuario_id, area_conhecimento_id, editora_id
        };
        const atualizado = await LivroModels.updateLivro(id, livro);
        if (!atualizado) {
            return res.status(404).json({ erro: "Livro não encontrado." });
        }
        await LivroModels.removeAutoresFromLivro(id);
        await LivroModels.addAutoresToLivro(id, autores);
        res.status(200).json({ mensagem: "Livro atualizado com sucesso." });
    } catch (e) {
        res.status(500).json({ erro: "Erro ao atualizar o livro." });
    }
}