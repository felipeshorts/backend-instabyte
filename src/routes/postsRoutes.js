import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Função que envia um arquivo do seu computador com os dados do mesmo e armazena no servidor
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

// Parametro necessario para sistema Windows
const upload = multer({dest:"./uploads", storage})

const routes = (app) => {
    // Permite que o servidor interprete requisições com corpo no formato JSON
    app.use(express.json());
    app.use(cors(corsOptions))
    // Rota para buscar um post
    app.get("/posts",listarPosts);
    // Rota para criar um post
    app.post("/posts", postarNovoPost)
    app.post("/upload", upload.single("imagem"), uploadImagem)

    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;

