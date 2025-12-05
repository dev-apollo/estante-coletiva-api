import { db } from "../config/dbConfig.js";

export async function findLivros() {
    const [rows] = await db.query("SELECT * FROM livro");
    return rows;
}

export async function findLivroById(id) {
    const [rows] = await db.query("SELECT * FROM livro WHERE id = ?", [id]);
    return rows[0];
}

export async function removeLivro(id) {
    const [result] = await db.query("DELETE FROM livro WHERE id = ?", [id]);
    return result.affectedRows > 0;
}

export async function createLivro(livro) {
    const [result] = await db.query("INSERT INTO livro (titulo, estado_conservacao, descricao, num_paginas, data_publicacao, livro_status, usuario_id, area_conhecimento_id, editora_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [livro.titulo, livro.estado_conservacao, livro.descricao, livro.num_paginas, livro.data_publicacao, livro.livro_status, livro.usuario_id, livro.area_conhecimento_id, livro.editora_id]);
    return result.insertId;
}

export async function updateLivro(id, livro) {
    const [result] = await db.query("UPDATE livro SET titulo = ?, estado_conservacao = ?, descricao = ?, num_paginas = ?, data_publicacao = ?, livro_status = ?, usuario_id = ?, area_conhecimento_id = ?, editora_id = ? WHERE id = ?", [livro.titulo, livro.estado_conservacao, livro.descricao, livro.num_paginas, livro.data_publicacao, livro.livro_status, livro.usuario_id, livro.area_conhecimento_id, livro.editora_id, id]);
    return result.affectedRows > 0;
}

export async function addAutoresToLivro(livroId, autores) {
    for (const autorId of autores) {
        await db.query("INSERT INTO autor_livro (autor_id, livro_id) VALUES (?, ?)", [autorId, livroId]);
    }
}

export async function removeAutoresFromLivro(livroId) {
    await db.query("DELETE FROM autor_livro WHERE livro_id = ?", [livroId]);
}