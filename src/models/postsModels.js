import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assincrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados "Imersão-instabytes"
    const db = conexao.db("imersao-instabytes")
    // Seleciona a coleção "Posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Retorna um Array com todos os documentos da coleção
    return colecao.find().toArray()
}

export function criarPost(novoPost) {
        // Seleciona o banco de dados "Imersão-instabytes"
        const db = conexao.db("imersao-instabytes")
        // Seleciona a coleção "Posts" dentro do banco de dados
        const colecao = db.collection("posts");
        // Retorna um Array com todos os novos arquivos inseridos na coleção
        return colecao.insertOne(novoPost)
}

// Função assincrona para buscar todos os posts do banco de dados
export async function atualizarPost(id, novoPost) {
    // Seleciona o banco de dados "Imersão-instabytes"
    const db = conexao.db("imersao-instabytes")
    // Seleciona a coleção "Posts" dentro do banco de dados
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    // Retorna um Array com todos os novos arquivos inseridos na coleção
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}