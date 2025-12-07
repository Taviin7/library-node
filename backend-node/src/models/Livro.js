import mongoose from "mongoose";

const LivroSchema = new mongoose.Schema({
  _id: { type: String, required: true },     
  titulo: { type: String, required: true },
  isbn: { type: String, required: true },
  anoPublicacao: { type: Number, required: true },
  autores: [{ type: String, ref: "Autor" }]
}, { timestamps: true });

export default mongoose.model("Livro", LivroSchema, "Livros");