import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  nome: { type: String, required: true },
  email: String,
  telefone: String,
  emprestimos: [{
    livroId: { type: String, required: true },
    dataEmprestimo: { type: String, required: true },
    dataPrevistaDevolucao: { type: String, required: true },
    dataDevolucao: { type: String, default: null }
  }],
  reservas: [{
    livroId: { type: String, required: true },
    dataReserva: { type: String, required: true },
    status: { type: String, required: true }
  }]
}, { timestamps: true });

export default mongoose.model("Usuario", UsuarioSchema, "Usuarios");