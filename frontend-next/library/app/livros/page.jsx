"use client";

import { useEffect, useState } from "react";

export default function LivrosPage() {
  const [livros, setLivros] = useState([]);
  const [autores, setAutores] = useState([]);
  
  const [form, setForm] = useState({
    _id: "",
    titulo: "",
    isbn: "",
    anoPublicacao: "",
    autores: [],
    copias: [],
  });
  
  const [modoEdicao, setModoEdicao] = useState(false);

  // Carregar livros
  async function carregarLivros() {
    const res = await fetch("http://localhost:4000/livro");
    setLivros(await res.json());
  }

  // Carregar autores
  async function carregarAutores() {
    const res = await fetch("http://localhost:4000/autor");
    setAutores(await res.json());
  }

  useEffect(() => {
    carregarLivros();
    carregarAutores();
  }, []);

  function atualizarForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  // ========== AUTORES ==========
  function adicionarAutor() {
    setForm({
      ...form,
      autores: [...form.autores, ""]
    });
  }

  function atualizarAutor(index, valor) {
    const copia = [...form.autores];
    copia[index] = valor;
    setForm({ ...form, autores: copia });
  }

  function removerAutor(index) {
    const copia = form.autores.filter((_, i) => i !== index);
    setForm({ ...form, autores: copia });
  }

  // ========== CÓPIAS ==========
  function adicionarCopia() {
    setForm({
      ...form,
      copias: [
        ...form.copias,
        {
          status: "disponivel",
          emprestadoPara: null,
          dataEmprestimo: null,
          dataPrevistaDevolucao: null
        }
      ]
    });
  }

  function atualizarCopia(index, campo, valor) {
    const copia = [...form.copias];
    copia[index][campo] = valor;
    setForm({ ...form, copias: copia });
  }

  function removerCopia(index) {
    const copia = form.copias.filter((_, i) => i !== index);
    setForm({ ...form, copias: copia });
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
        autores: form.autores,
        copias: form.copias,
      }),
    });

    alert("Livro adicionado com sucesso!");
    resetarFormulario();
    carregarLivros();
  }

  function editarLivro(livro) {
    setModoEdicao(true);
    setForm({
      ...livro,
      autores: livro.autores || [],
      copias: livro.copias || [],
    });
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
        autores: form.autores,
        copias: form.copias,
      }),
    });

    alert("Livro atualizado com sucesso!");
    setModoEdicao(false);
    resetarFormulario();
    carregarLivros();
  }

  async function deletarLivro(id) {
    if (!confirm("Deseja excluir?")) return;

    await fetch(`http://localhost:4000/livro/${id}`, {
      method: "DELETE",
    });

    alert("Livro deletado com sucesso!");
    carregarLivros();
  }

  function resetarFormulario() {
    setForm({
      _id: "",
      titulo: "",
      isbn: "",
      anoPublicacao: "",
      autores: [],
      copias: [],
    });
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

        {/* Seção de Autores */}
        <div className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300">
          <div className="flex justify-between text-center">
            <p className="font-semibold text-gray-600">Autores</p>
            <button
              type="button"
              onClick={adicionarAutor}
              className="bg-blue-600 text-white px-2 py-1 rounded"
            >
              + Adicionar
            </button>
          </div>

          {form.autores.map((autorId, i) => (
            <div key={i} className="space-y-3 mb-3 p-2">
              <select
                className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
                value={autorId}
                onChange={(e) => atualizarAutor(i, e.target.value)}
              >
                <option value="">Selecione um autor</option>
                {autores.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.nome}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => removerAutor(i)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        {/* Seção de Cópias */}
        <div className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300">
          <div className="flex justify-between text-center">
            <p className="font-semibold text-gray-600">Cópias</p>
            <button
              type="button"
              onClick={adicionarCopia}
              className="bg-blue-600 text-white px-2 py-1 rounded"
            >
              + Adicionar
            </button>
          </div>

          {form.copias.map((copia, i) => (
            <div key={i} className="space-y-3 mb-3 p-2 border-t border-gray-300">
              <select
                className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
                value={copia.status}
                onChange={(e) => atualizarCopia(i, "status", e.target.value)}
              >
                <option value="disponivel">Disponível</option>
                <option value="emprestado">Emprestado</option>
              </select>

              <input
                type="text"
                placeholder="Emprestado para (ID do usuário)"
                className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
                value={copia.emprestadoPara || ""}
                onChange={(e) => atualizarCopia(i, "emprestadoPara", e.target.value)}
              />

              <input
                type="date"
                placeholder="Data Empréstimo"
                className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
                value={copia.dataEmprestimo?.split("T")[0] || ""}
                onChange={(e) => atualizarCopia(i, "dataEmprestimo", e.target.value)}
              />

              <input
                type="date"
                placeholder="Data Prevista Devolução"
                className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
                value={copia.dataPrevistaDevolucao?.split("T")[0] || ""}
                onChange={(e) => atualizarCopia(i, "dataPrevistaDevolucao", e.target.value)}
              />

              <button
                type="button"
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => removerCopia(i)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {modoEdicao ? "Salvar edição" : "Adicionar"}
        </button>

        {modoEdicao && (
          <button
            type="button"
            onClick={() => {
              setModoEdicao(false);
              resetarFormulario();
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