import * as UsuarioModels from "../models/usuarioModels.js";

export async function getUsuarios(req, res) {
    try {
        const usuarios = await UsuarioModels.findUsuarios();
        res.status(200).json(usuarios);
    } catch (e) {
        res.status(500).json({ erro: "Erro ao buscar usuários." });
    }
}

export async function getUsuarioById(req, res) {
    try {
        const id = req.params.id;
        const usuario = await UsuarioModels.findUsuarioById(id);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }
        res.status(200).json(usuario);
    } catch (e) {
        res.status(500).json({ erro: "Erro ao buscar usuário." });
    }
}

export async function deleteUsuario(req, res) {
    try {
        const id = req.params.id;
        const removido = await UsuarioModels.removeUsuario(id);
        if (!removido) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }
        res.status(204).send();
    } catch (e) {
        res.status(500).json({ erro: "Erro ao remover usuário." });
    }
}

export async function postUsuario(req, res) {
    try {
        const { nome, sobrenome, email, senha, data_cadastro, status, cidadeId } = req.body;
        if (!nome || !sobrenome || !email || !senha || !data_cadastro || !status || !cidadeId) {
            return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
        }
        const usuario = { nome, sobrenome, email, senha, data_cadastro, usuario_status: status, cidade_id: cidadeId };
        const insertId = await UsuarioModels.createUsuario(usuario);
        return res.status(201).json({ mensagem: "Usuário criado com sucesso.", id: insertId });
    } catch (e) {
        res.status(500).json({ erro: "Erro ao criar usuário." });
    };
}

export async function putUsuario(req, res) {
    try {
        const id = req.params.id;
        const { nome, sobrenome, email, senha, data_cadastro, status, cidadeId } = req.body;
        if (!nome || !sobrenome || !email || !senha || !data_cadastro || !status || !cidadeId) {
            return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
        }
        const usuario = { nome, sobrenome, email, senha, data_cadastro, usuario_status: status, cidade_id: cidadeId };
        const atualizado = await UsuarioModels.updateUsuario(id, usuario);
        if (!atualizado) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }
        return res.status(200).json({ mensagem: "Usuário atualizado com sucesso." });
    } catch (e) {
        res.status(500).json({ erro: "Erro ao atualizar o usuário." });
    }
}