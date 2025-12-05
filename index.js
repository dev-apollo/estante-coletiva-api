import express from "express";
import { testarConexao } from "./src/config/dbConfig.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";

const app = express();
app.use(express.json());

await testarConexao();

app.use("/usuarios", usuarioRoutes);

app.listen(3000, () => console.log("Servidor online."));