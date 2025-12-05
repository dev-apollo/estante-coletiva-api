import mysql from "mysql2/promise";

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "estante_coletiva"
});

export async function testarConexao(){
    try{
        await db.query("SELECT 1");
        console.log("Banco conectado.");
    }catch(e){
        console.error("Erro ao conectar o banco: ", e);
    }
}