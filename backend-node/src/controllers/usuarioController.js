import Usuario from "../models/Usuario.js";

// CREATE
export async function criarUsuario(req, res) {
  try {
    const usuario = await Usuario.create(req.body);
    return res.status(201).json(usuario);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
}

// READ - listar
export async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.find();
    return res.json(usuarios);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}

// READ - buscar por ID
export async function buscarUsuario(req, res) {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });

    return res.json(usuario);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
}

// UPDATE
export async function atualizarUsuario(req, res) {
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });

    return res.json(usuario);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
}

// DELETE
export async function deletarUsuario(req, res) {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });

    return res.json({ mensagem: "Usuário deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}