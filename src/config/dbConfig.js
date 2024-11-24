import { MongoClient } from "mongodb";

export default async function conectarAoBanco(stringConexao) {
    let mongoClient

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log("Conectando ao cluster do Banco de Dados...");
        await mongoClient.connect();
        console.log("Conectado ao MongoDB Atlas com sucesso!" );

        return mongoClient;
    }catch(erro) {
        console.error("Falha na conexão com o Banco de Dados!", erro);
        process.exit();
    }   
}