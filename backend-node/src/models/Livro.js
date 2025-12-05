import mongoose from "mongoose";

const CopiaSchema = new mongoose.Schema({
  codigo: { type: String, required: true },
  status: {
    type: String,
    enum: ["disponivel", "emprestado"],
    default: "disponivel"
  },
  emprestadoPara: { type: String, default: null },
  dataEmprestimo: { type: Date },
  dataPrevistaDevolucao: { type: Date }
});

const LivroSchema = new mongoose.Schema({
  _id: { type: String, required: true },     
  titulo: { type: String, required: true },
  isbn: { type: String, required: true },
  anoPublicacao: { type: Number, required: true },
  autor: { type: String, ref: "Autor" },
  copias: [CopiaSchema]
});

export default mongoose.model("Livro", LivroSchema, "Livros");