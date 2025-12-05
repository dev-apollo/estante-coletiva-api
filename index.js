import express from "express";
import { testarConexao } from "./src/config/dbConfig.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import livroRoutes from "./src/routes/livroRoutes.js";
import solicitacaoRoutes from "./src/routes/solicitacaoRoutes.js";

const app = express();
app.use(express.json());

await testarConexao();

/*
    Para não ter problemas com os testes da API:
    Garanta que já exista pelo menos 1 linha das seguintes tabelas:
        - Autor;
        - Editora;
        - Area de Conhecimento;
        - Estado;
        - Cidade;
    O cadastro de usuários e livros depende de chaves estrangeiras dessas tabelas!
*/
app.use("/usuarios", usuarioRoutes);
app.use("/livros", livroRoutes);
app.use("/solicitacoes", solicitacaoRoutes);

app.listen(3000, () => console.log("Servidor online."));