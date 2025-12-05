import { db } from "../config/dbConfig.js";

export async function findUsuarios(){
    const [rows] = await db.query("SELECT * FROM usuario");
    return rows;
}

export async function findUsuarioById(id){
    const [rows] = await db.query("SELECT * FROM usuario WHERE id = ?", [id]);
    return rows[0];
}

export async function removeUsuario(id) {
    const [result] = await db.query("DELETE FROM usuario WHERE id = ?", [id]);
    return result.affectedRows > 0;
}

export async function createUsuario(usuario) {
    const [result] = await db.query("INSERT INTO usuario (nome, sobrenome, email, senha, data_cadastro, usuario_status, cidade_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [usuario.nome, usuario.sobrenome, usuario.email, usuario.senha, usuario.data_cadastro, usuario.usuario_status, usuario.cidade_id]);
    return result.insertId;
}