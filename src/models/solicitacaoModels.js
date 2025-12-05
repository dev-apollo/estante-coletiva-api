import { db } from "../config/dbConfig.js";

export async function findSolicitacoes() {
    const [rows] = await db.query("SELECT * FROM solicitacao");
    return rows;
}

export async function findSolicitacaoById(id) {
    const [rows] = await db.query("SELECT * FROM solicitacao WHERE id = ?", [id]);
    return rows[0];
}

export async function removeSolicitacao(id) {
    const [result] = await db.query("DELETE FROM solicitacao WHERE id = ?", [id]);
    return result.affectedRows > 0;
}

export async function createSolicitacao(solicitacao) {
    const [result] = await db.query("INSERT INTO solicitacao (data_solicitacao, data_conclusao, status, usuario_id, livro_id) VALUES (?, ?, ?, ?, ?)", [solicitacao.data_solicitacao, solicitacao.data_conclusao, solicitacao.status, solicitacao.usuario_id, solicitacao.livro_id]);
    return result.insertId;
}

export async function updateSolicitacao(id, solicitacao) {
    const [result] = await db.query("UPDATE solicitacao SET data_solicitacao = ?, data_conclusao = ?, status = ?, usuario_id = ?, livro_id = ? WHERE id = ?", [solicitacao.data_solicitacao, solicitacao.data_conclusao, solicitacao.status, solicitacao.usuario_id, solicitacao.livro_id, id]);
    return result.affectedRows > 0;
}