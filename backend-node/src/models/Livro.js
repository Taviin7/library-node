import mongoose from "mongoose";

const CopiaSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["disponivel", "emprestado"],
    default: "disponivel"
  },
  emprestadoPara: { type: String, default: null },
  dataEmprestimo: { type: String, default: null },
  dataPrevistaDevolucao: { type: String, default: null }
});

const LivroSchema = new mongoose.Schema({
  _id: { type: String, required: true },     
  titulo: { type: String, required: true },
  isbn: { type: String, required: true },
  anoPublicacao: { type: Number, required: true },
  autores: [{ type: String, ref: "Autor" }], // Referência ao modelo Autor
  copias: [CopiaSchema]
}, { timestamps: true });

export default mongoose.model("Livro", LivroSchema, "Livros");