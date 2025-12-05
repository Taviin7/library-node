import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  nome: { type: String, required: true },
  email: String,
  telefone: String
}, { timestamps: true });

export default mongoose.model("Usuario", UsuarioSchema, "Usuarios");