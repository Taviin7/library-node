import 'dotenv/config';
import express from 'express';
import mongoose from "mongoose";

const app = express();
app.use(express.json());

//conectando no mongobl atlas
mongoose.connect(process.env.MONGODB_URI, { dbName: 'BibliotecaLP'})
    .then(() => console.log('Conectado com sucesso!'))
    .catch(err => console.error('Erro na conexão: ', err.message));


//Modelo Autor
const autorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  biografia: { type: String, required: true },
  livros: [{ type: mongoose.Schema.Types.ObjectId, ref: "Livros" }]
});

const Autor = mongoose.model('Autor', autorSchema, 'Autores');

//Modelo Copia presente no Livro
const CopiaSchema = new mongoose.Schema({
  codigo: { type: String, required: true },
  status: { type: String, enum: ["disponivel", "emprestado"], default: "disponivel" },
  emprestadoPara: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", default: null },
  dataEmprestimo: { type: Date, required: true },
  dataPrevistaDevolucao: { type: Date, required: true }
});

//Modelo Livro
const LivroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  isbn: { type: String, required: true },
  anoPublicacao: { type: Number, required: true },
  autores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Autor" }],
  copias: [CopiaSchema]
});
const Livro = mongoose.model('Livro', autorSchema, 'Livros');

import mongoose from "mongoose";

const EmprestimoSchema = new mongoose.Schema({
  livroId: { type: mongoose.Schema.Types.ObjectId, ref: "Livro" },
  copiaCodigo: String,
  dataEmprestimo: Date,
  dataPrevistaDevolucao: Date,
  dataDevolucao: Date
});

const ReservaSchema = new mongoose.Schema({
  livroId: { type: mongoose.Schema.Types.ObjectId, ref: "Livro" },
  dataReserva: Date,
  status: { type: String, default: "ativa" }
});

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: String,
  telefone: String,
  emprestimos: [EmprestimoSchema],
  reservas: [ReservaSchema]
});

export default mongoose.model("Usuario", UsuarioSchema);
