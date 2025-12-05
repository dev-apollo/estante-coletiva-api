import * as UsuarioModels from "../models/usuarioModels.js";

export async function getUsuarios(req, res){
    try{
        const usuarios = await UsuarioModels.findUsuarios();
        res.status(200).json(usuarios);
    }catch(e){
        res.status(500).json({erro: "Erro ao buscar usuários."});
    }
}

export async function getUsuarioById(req, res){
    try{
        const id = req.params.id;
        const usuario = await UsuarioModels.findUsuarioById(id);
        if(!usuario){
            return res.status(404).json({erro: "Usuário não encontrado."});
        }
        res.status(200).json(usuario);
    }catch(e){
        res.status(500).json({erro: "Erro ao buscar usuário."});
    }
}

export async function deleteUsuario(req, res){
    try{
        const id = req.params.id;
        const removido = await UsuarioModels.removeUsuario(id);
        if(!removido){
            return res.status(404).json({erro: "Usuário não encontrado."});
        }
        res.status(204).send();
    }catch(e){
        res.status(500).json({erro: "Erro ao buscar usuário."});
    }
}
