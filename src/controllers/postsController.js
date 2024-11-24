import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    // Chama a função para buscar os Posts
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (OK) e os posts no Formato JSON
    res.status(200).json(posts)
}

export async function postarNovoPost(req, res) {
    // Chama a função para tentar criar o post
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        // Envia uma resposta HTTP com status 200 (OK) e os posts criado no formato JSON
        res.status(200).json(postCriado);
        // Exibe uma menssagem de erro, caso ocorra o mesmo na função
    } catch(erro) {
        console.error(error.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}
// Função para enviar a imagem com seu nome original
export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt:""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        // Envia uma resposta HTTP com status 200 (OK) e os posts criado no formato JSON
        res.status(200).json(postCriado);
        // Exibe uma menssagem de erro, caso ocorra o mesmo na função
    } catch(erro) {
        console.error(error.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function atualizarNovoPost(req, res) {
    // Chama a função para tentar criar o post
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imageBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        // Envia uma resposta HTTP com status 200 (OK) e os posts criado no formato JSON
        res.status(200).json(postCriado);
        // Exibe uma menssagem de erro, caso ocorra o mesmo na função
    } catch(erro) {
        console.error(error.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}