"use client";

import { useEffect, useState } from "react";

export default function LivrosPage() {
  const [livros, setLivros] = useState([]);
  const [form, setForm] = useState({
    _id: "",
    titulo: "",
    isbn: "",
    anoPublicacao: "",
  });
  const [modoEdicao, setModoEdicao] = useState(false);

  // Carregar livros
  async function carregar() {
    const res = await fetch("http://localhost:4000/livro");
    const data = await res.json();
    setLivros(data);
  }

  useEffect(() => {
    carregar();
  }, []);

  function atualizarForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function criar(e) {
    e.preventDefault();

    await fetch("http://localhost:4000/livro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: form._id,
        titulo: form.titulo,
        isbn: form.isbn,
        anoPublicacao: Number(form.anoPublicacao),
      }),
    });

    setForm({ _id: "", titulo: "", isbn: "", anoPublicacao: "" });
    carregar();
  }

  function editarLivro(livro) {
    setModoEdicao(true);
    setForm(livro);
  }

  async function salvarEdicao(e) {
    e.preventDefault();

    await fetch(`http://localhost:3000/livro/${form._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: form.titulo,
        isbn: form.isbn,
        anoPublicacao: Number(form.anoPublicacao),
      }),
    });

    setModoEdicao(false);
    setForm({ _id: "", titulo: "", isbn: "", anoPublicacao: "" });
    carregar();
  }

  async function excluir(id) {
    if (!confirm("Deseja excluir?")) return;

    await fetch(`http://localhost:4000/livro/${id}`, {
      method: "DELETE",
    });

    carregar();
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Livros</h1>

      <form
        onSubmit={modoEdicao ? salvarEdicao : criar}
        className="space-y-3 bg-white p-4 rounded shadow mb-8"
      >
        <input
          name="_id"
          placeholder="ID"
          className="border p-2 w-full"
          value={form._id}
          onChange={atualizarForm}
          disabled={modoEdicao}
          required
        />

        <input
          name="titulo"
          placeholder="Título"
          className="border p-2 w-full"
          value={form.titulo}
          onChange={atualizarForm}
          required
        />

        <input
          name="isbn"
          placeholder="ISBN"
          className="border p-2 w-full"
          value={form.isbn}
          onChange={atualizarForm}
          required
        />

        <input
          type="number"
          name="anoPublicacao"
          placeholder="Ano"
          className="border p-2 w-full"
          value={form.anoPublicacao}
          onChange={atualizarForm}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {modoEdicao ? "Salvar edição" : "Adicionar"}
        </button>

        {modoEdicao && (
          <button
            type="button"
            onClick={() => {
              setModoEdicao(false);
              setForm({ _id: "", titulo: "", isbn: "", anoPublicacao: "" });
            }}
            className="ml-3 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        )}
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Título</th>
            <th className="border p-2">ISBN</th>
            <th className="border p-2">Ano</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((l) => (
            <tr key={l._id} className="border-b">
              <td className="border p-2">{l._id}</td>
              <td className="border p-2">{l.titulo}</td>
              <td className="border p-2">{l.isbn}</td>
              <td className="border p-2">{l.anoPublicacao}</td>
              <td className="border p-2 space-x-2 text-center">
                <button
                  onClick={() => editarLivro(l)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluir(l._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
