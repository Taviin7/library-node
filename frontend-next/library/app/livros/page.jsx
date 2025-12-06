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
  const [modoEdicao, setModoEdicao] = useState(false); // true se estiver editando 

  // Carregar livros
  async function carregar() {
    const res = await fetch("http://localhost:4000/livro"); // Rota da API de livros
    const data = await res.json();
    setLivros(data);
  }

  // Carregar ao montar
  useEffect(() => {
    carregar();
  }, []);

  // Atualizar form ao digitar nos inputs
  function atualizarForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function criar(e) {
    e.preventDefault();

    // Chamar API para criar livro
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

    alert("Livro adicionado com sucesso!"); // Feedback para o usuário

    // Resetar form
    setForm({ _id: "", titulo: "", isbn: "", anoPublicacao: "" });
    carregar();
  }

  function editarLivro(livro) {
    setModoEdicao(true);
    setForm(livro);
  }

  async function salvarEdicao(e) {
    e.preventDefault();

    await fetch(`http://localhost:4000/livro/${form._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: form.titulo,
        isbn: form.isbn,
        anoPublicacao: Number(form.anoPublicacao),
      }),
    });

    alert("Livro atualizado com sucesso!"); // Feedback para o usuário

    // Resetar form
    setModoEdicao(false);
    setForm({ _id: "", titulo: "", isbn: "", anoPublicacao: "" });
    carregar();
  }

  async function deletarLivro(id) {
    if (!confirm("Deseja excluir?")) return;

    // Chamar API para excluir livro pelo ID
    await fetch(`http://localhost:4000/livro/${id}`, {
      method: "DELETE",
    });

    alert("Livro deletado com sucesso!"); // Feedback para o usuário
    carregar();
  }

  return (
    <div className="p-6 max-w-3xl text-gray-600 bg-gray-100 shadow rounded-lg border border-gray-300 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Livros</h1>

      {/* Formulário */}
      <form
        onSubmit={modoEdicao ? salvarEdicao : criar}
        className="space-y-3 mb-6"
      >
        <input
          name="_id"
          placeholder="ID"
          className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
          value={form._id}
          onChange={atualizarForm}
          disabled={modoEdicao}
          required
        />

        <input
          name="titulo"
          placeholder="Título"
          className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
          value={form.titulo}
          onChange={atualizarForm}
          required
        />

        <input
          name="isbn"
          placeholder="ISBN"
          className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
          value={form.isbn}
          onChange={atualizarForm}
          required
        />

        <input
          type="number"
          name="anoPublicacao"
          placeholder="Ano"
          className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
          value={form.anoPublicacao}
          onChange={atualizarForm}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {/* Ternário de mudança texto do botão conforme o modo */}
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

      {/* Tabela */}
      <div className="relative overflow-x-auto bg-neutral-100 shadow rounded-lg border border-gray-300">
        <table className="w-full text-sm text-center text-gray-700">
          <thead className="text-sm bg-gray-200 border-b border-gray-300">
            <tr>
              <th className="px-6 py-3 font-medium">ID</th>
              <th className="px-6 py-3 font-medium">Título</th>
              <th className="px-6 py-3 font-medium">ISBN</th>
              <th className="px-6 py-3 font-medium">Ano</th>
              <th className="px-6 py-3 font-medium">Ações</th>
            </tr>
          </thead>

          <tbody>
            {livros.map((l) => (
              <tr
                key={l._id}
                className="bg-white border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="border border-gray-200">{l._id}</td>
                <td className="border border-gray-200">{l.titulo}</td>
                <td className="border border-gray-200">{l.isbn}</td>
                <td className="border border-gray-200">{l.anoPublicacao}</td>

                <td className="p-2 space-x-2 text-center border border-gray-200">
                  <button
                    onClick={() => editarLivro(l)}
                    className="bg-yellow-600 font-medium text-white px-2 py-1 mb-1 rounded"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deletarLivro(l._id)}
                    className="bg-red-600 font-medium text-white px-2 py-1 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}