"use client";

import { useEffect, useState } from "react";

export default function LivrosPage() {

  // Fazendo o gerenciamento dos dados que mudam na aplicação, como os livros e autores, usando useState
  const [livros, setLivros] = useState([]);
  const [autores, setAutores] = useState([]);

  const [form, setForm] = useState({
    _id: "",
    titulo: "",
    isbn: "",
    anoPublicacao: "",
    autores: [],
  });

  const [modoEdicao, setModoEdicao] = useState(false);

  async function carregarLivros() {
    // Fazendo a requisição para o backend para obter os livros
    const res = await fetch("http://localhost:4000/livro");
    setLivros(await res.json());
    // Converte a resposta para JSON e atualiza o estado livros
  }

  async function carregarAutores() {
    const res = await fetch("http://localhost:4000/autor");
    setAutores(await res.json());
  }

  useEffect(() => {
    carregarLivros();
    carregarAutores();
  }, []); // Executa apenas uma vez, quando o componente montar

  function atualizarForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); 
    // Mantém todos os valores anteriores, [name]: value → atualiza apenas o campo que mudou
  }

  // Adicionar, atualizar e remover autores do formulário
  function adicionarAutor() {
    setForm({
      ...form,
      autores: [...form.autores, ""] // Adiciona uma string vazia ao array
    });
  }

  // Atualiza o autor na posição index com o valor selecionado
  function atualizarAutor(index, valor) {
    const copia = [...form.autores]; // Cria uma cópia do array
    copia[index] = valor; // Atualiza o valor na posição index
    setForm({ ...form, autores: copia });
  }

  // Remove o autor na posição index
  function removerAutor(index) {
    const copia = form.autores.filter((_, i) => i !== index); // Remove o item na posição index
    setForm({ ...form, autores: copia }); // Atualiza o formulário com o novo array
  }

  async function criar(e) {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página

    await fetch("http://localhost:4000/livro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: form._id,
        titulo: form.titulo,
        isbn: form.isbn,
        anoPublicacao: Number(form.anoPublicacao), // Converte para número
        autores: form.autores,
      }),
    });

    alert("Livro adicionado com sucesso!");
    resetarFormulario(); // Limpa o formulário
    carregarLivros(); // Recarrega a lista de livros
  }

  function editarLivro(livro) {
    setModoEdicao(true); // Ativa o modo de edição
    setForm({
      ...livro,
      autores: livro.autores || [], // Se não tiver autores, usa array vazio
    });
  }

  async function salvarEdicao(e) {
    e.preventDefault();

    // Envia a requisição PUT para atualizar o livro, usando o ID do livro no endpoint
    // Utiliza o fetch, forma assíncrona, sem recarregar a página, enviando os dados do formulário no corpo da requisição
    await fetch(`http://localhost:4000/livro/${form._id}`, {
      method: "PUT", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: form.titulo,
        isbn: form.isbn,
        anoPublicacao: Number(form.anoPublicacao),
        autores: form.autores,
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

  // Reseta o formulário com campos vazios
  function resetarFormulario() {
    setForm({
      _id: "",
      titulo: "",
      isbn: "",
      anoPublicacao: "",
      autores: [],
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

          {/* O map percorre cada autor no array form.autores */}
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

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {/* Ternário de mudança texto do botão conforme o modo */}
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

      {/* Tabela de Exibição de Livros do Banco*/}
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

          {/* Monta a tabela, percorrendo o array de livros e cria uma linha para cada livro */}
          <tbody>
            {livros.map((l) => (
              <tr
                key={l._id}
                className="bg-white border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="border border-gray-200 p-2">{l._id}</td>
                <td className="border border-gray-200 p-2">{l.titulo}</td>
                <td className="border border-gray-200 p-2">{l.isbn}</td>
                <td className="border border-gray-200 p-2">{l.anoPublicacao}</td>

                <td className="p-2 border border-gray-200">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => editarLivro(l)}
                      className="bg-yellow-600 font-medium text-white px-2 py-1 rounded w-[60px]"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => deletarLivro(l._id)}
                      className="bg-red-600 font-medium text-white px-2 py-1 rounded w-[60px]"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}