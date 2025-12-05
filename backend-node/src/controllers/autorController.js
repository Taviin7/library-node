import Autor from "../models/Autor.js";

// CREATE
export async function criarAutor(req, res) {
  try {
    const autor = await Autor.create(req.body);
    return res.status(201).json(autor);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
}

// READ - listar todos
export async function listarAutores(req, res) {
  try {
    const autores = await Autor.find();
    return res.json(autores);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}

// READ - buscar por ID
export async function buscarAutor(req, res) {
  try {
    const autor = await Autor.findById(req.params.id);

    if (!autor)
      return res.status(404).json({ erro: "Autor não encontrado" });

    return res.json(autor);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
}

// UPDATE
export async function atualizarAutor(req, res) {
  try {
    const autor = await Autor.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!autor)
      return res.status(404).json({ erro: "Autor não encontrado" });

    return res.json(autor);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
}

// DELETE
export async function deletarAutor(req, res) {
  try {
    const autor = await Autor.findByIdAndDelete(req.params.id);

    if (!autor)
      return res.status(404).json({ erro: "Autor não encontrado" });

    return res.json({ mensagem: "Autor deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}