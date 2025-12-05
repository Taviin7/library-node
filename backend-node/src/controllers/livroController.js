import Livro from "../models/Livro.js";

// CREATE
export async function criarLivro(req, res) {
  try {
    const livro = await Livro.create(req.body);
    return res.status(201).json(livro);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
}

// READ - listar todos
export async function listarLivros(req, res) {
  try {
    const livros = await Livro.find();
    return res.json(livros);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}

// READ - buscar por ID
export async function buscarLivro(req, res) {
  try {
    const livro = await Livro.findById(req.params.id);

    if (!livro)
      return res.status(404).json({ erro: "Livro não encontrado" });

    return res.json(livro);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
}

// UPDATE
export async function atualizarLivro(req, res) {
  try {
    const livro = await Livro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // retorna o objeto atualizado
    );

    if (!livro)
      return res.status(404).json({ erro: "Livro não encontrado" });

    return res.json(livro);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
}

// DELETE
export async function deletarLivro(req, res) {
  try {
    const livro = await Livro.findByIdAndDelete(req.params.id);

    if (!livro)
      return res.status(404).json({ erro: "Livro não encontrado" });

    return res.json({ mensagem: "Livro deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}
