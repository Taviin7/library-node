"use client";

import { useEffect, useState } from "react";

export default function AutoresPage() {
  const [autores, setAutores] = useState([]);
  const [livrosDisponiveis, setLivrosDisponiveis] = useState([]);

  const [form, setForm] = useState({
    _id: "",
    nome: "",
    biografia: "",
    dataNascimento: "",
    livros: [],
  });

  const [modoEdicao, setModoEdicao] = useState(false);

  // Carregar autores
  async function carregar() {
    const res = await fetch("http://localhost:4000/autor");
    setAutores(await res.json());
  }

  // Carregar livros
  async function carregarLivros() {
    const res = await fetch("http://localhost:4000/livro");
    const data = await res.json();
    setLivrosDisponiveis(data);
  }

  // Carregar ao montar
  useEffect(() => {
    carregar();
    carregarLivros();
  }, []);

  // Atualizar campos normais do formulário
  function atualizarForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Alternar livro marcado/desmarcado
  function toggleLivro(idLivro) {
    const jaTem = form.livros.includes(idLivro);

    if (jaTem) {
      // remove
      setForm({
        ...form,
        livros: form.livros.filter((id) => id !== idLivro),
      });
    } else {
      // adiciona
      setForm({
        ...form,
        livros: [...form.livros, idLivro],
      });
    }
  }

  // Criar autor
  async function criar(e) {
    e.preventDefault();

    await fetch("http://localhost:4000/autor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Autor adicionado com sucesso!");
    resetarForm();
    carregar();
  }

  // Preencher formulário para edição
  function editarAutor(autor) {
    setModoEdicao(true);
    setForm({
      ...autor,
      livros: autor.livros || [],
      dataNascimento: autor.dataNascimento?.split("T")[0]  // Formatar data para o input sem hora
    });
  }

  async function salvarEdicao(e) {
    e.preventDefault();

    await fetch(`http://localhost:4000/autor/${form._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Autor atualizado com sucesso!");
    resetarForm();
    setModoEdicao(false);
    carregar();
  }

  // Resetar formulário com campos vazios
  function resetarForm() {
    setForm({
      _id: "",
      nome: "",
      biografia: "",
      dataNascimento: "",
      livros: [],
    });
  }

  // Deletar autor
  async function deletarAutor(id) {
    if (!confirm("Deseja excluir?")) return;

    await fetch(`http://localhost:4000/autor/${id}`, {
      method: "DELETE",
    });

    // Feedback para o usuário
    alert("Autor deletado com sucesso!");
    carregar();
  }

  return (
    <div className="p-6 max-w-3xl text-gray-600 bg-gray-100 shadow rounded-lg border border-gray-300 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Autores</h1>

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
          name="nome"
          placeholder="Nome"
          className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
          value={form.nome}
          onChange={atualizarForm}
          required
        />

        <input
          name="dataNascimento"
          placeholder="aa/mm/dd"
          className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
          value={form.dataNascimento}
          onChange={atualizarForm}
          required
        />

        <input
          name="biografia"
          placeholder="Biografia"
          className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
          value={form.biografia}
          onChange={atualizarForm}
          required
        />

        {/* Checkboxes de livros */}
        <div className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300">
          <p className="font-semibold mb-2 text-gray-600">Selecione os livros do autor:</p>

          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {livrosDisponiveis.map((livro) => (
              <label key={livro._id} className="p-2">
                <input
                  type="checkbox"
                  checked={form.livros.includes(livro._id)}
                  onChange={() => toggleLivro(livro._id)}
                  className="mr-2"
                />
                {livro.titulo}
              </label>
            ))}
          </div>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {/* Ternário de mudança texto do botão conforme o modo */}
          {modoEdicao ? "Salvar edição" : "Adicionar"}
        </button>

        {modoEdicao && (
          <button
            type="button"
            onClick={() => {
              resetarForm();
              setModoEdicao(false);
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
              <th className="px-6 py-3 font-medium">Nome</th>
              <th className="px-6 py-3 font-medium">Biografia</th>
              <th className="px-6 py-3 font-medium">Nascimento</th>
              <th className="px-6 py-3 font-medium">Ações</th>
            </tr>
          </thead>

          <tbody>
            {autores.map((a) => (
              <tr
                key={a._id}
                className="bg-white border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="border border-gray-200">{a._id}</td>
                <td className="border border-gray-200">{a.nome}</td>
                <td className="border border-gray-200">{a.biografia}</td>
                {/* Formatando a data sem hora */}
                <td className="border border-gray-200">
                  {a.dataNascimento?.split("T")[0]}
                </td>

                <td className="p-2 space-x-2 text-center border border-gray-200">
                  <button
                    onClick={() => editarAutor(a)}
                    className="bg-yellow-600 font-medium text-white px-2 py-1 mb-1 rounded"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deletarAutor(a._id)}
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