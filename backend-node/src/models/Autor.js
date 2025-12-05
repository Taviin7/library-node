import mongoose from "mongoose";

const AutorSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  nome: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  biografia: { type: String, required: true },
  livros: [{ type: String, ref: "Livro" }]
}, { timestamps: true });

export default mongoose.model("Autor", AutorSchema, "Autores");