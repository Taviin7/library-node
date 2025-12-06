"use client";

import { useEffect, useState } from "react";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [livros, setLivros] = useState([]);

  const [form, setForm] = useState({
    _id: "",
    nome: "",
    email: "",
    telefone: "",
    emprestimos: [],
    reservas: [],
  });

  const [modoEdicao, setModoEdicao] = useState(false);

  async function carregarUsuarios() {
    const res = await fetch("http://localhost:4000/usuario");
    setUsuarios(await res.json());
  }

  async function carregarLivros() {
    const res = await fetch("http://localhost:4000/livro");
    setLivros(await res.json());
  }

  useEffect(() => {
    carregarUsuarios();
    carregarLivros();
  }, []);

  function atualizarForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function adicionarEmprestimo() {
    setForm({
      ...form,
      emprestimos: [
        ...form.emprestimos,
        {
          livroId: "",
          copiaCodigo: "",
          dataEmprestimo: "",
          dataPrevistaDevolucao: "",
          dataDevolucao: "",
        },
      ],
    });
  }

  function atualizarEmprestimo(index, campo, valor) {
    const copia = [...form.emprestimos];
    copia[index][campo] = valor;
    setForm({ ...form, emprestimos: copia });
  }

  function removerEmprestimo(index) {
    const copia = form.emprestimos.filter((_, i) => i !== index);
    setForm({ ...form, emprestimos: copia });
  }

  function adicionarReserva() {
    setForm({
      ...form,
      reservas: [
        ...form.reservas,
        {
          livroId: "",
          dataReserva: "",
        },
      ],
    });
  }

  function atualizarReserva(index, campo, valor) {
    const copia = [...form.reservas];
    copia[index][campo] = valor;
    setForm({ ...form, reservas: copia });
  }

  function removerReserva(index) {
    const copia = form.reservas.filter((_, i) => i !== index);
    setForm({ ...form, reservas: copia });
  }

  async function criar(e) {
    e.preventDefault();

    await fetch("http://localhost:4000/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Usuário criado!");
    resetarFormulario();
    carregarUsuarios();
  }


  function editarUsuario(usuario) {
    setModoEdicao(true);

    setForm({
      ...usuario,
      emprestimos: usuario.emprestimos || [],
      reservas: usuario.reservas || [],
    });
  }

  async function salvarEdicao(e) {
    e.preventDefault();

    await fetch(`http://localhost:4000/usuario/${form._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Usuário atualizado!");
    setModoEdicao(false);
    resetarFormulario();
    carregarUsuarios();
  }

  async function remover(id) {
    if (!confirm("Deseja excluir este usuário?")) return;

    await fetch(`http://localhost:4000/usuario/${id}`, {
      method: "DELETE",
    });

    alert("Usuário deletado!");
    carregarUsuarios();
  }


  function resetarFormulario() {
    setForm({
      _id: "",
      nome: "",
      email: "",
      telefone: "",
      emprestimos: [],
      reservas: [],
    });
  }

  return (
    <div className="p-6 max-w-3xl text-gray-600 bg-gray-100 shadow rounded-lg border border-gray-300 flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Usuário</h1>

      {/* Formulário */}
      <form
        className="space-y-3 mb-6"
        onSubmit={modoEdicao ? salvarEdicao : criar}
      >
        <input
          name="_id"
          placeholder="ID do Usuário"
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
          name="email"
          placeholder="Email"
          className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
          value={form.email}
          onChange={atualizarForm}
          required
        />

        <input
          name="telefone"
          placeholder="Telefone"
          className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
          value={form.telefone}
          onChange={atualizarForm}
          required
        />

        {/* Seção de Empréstimos */}
        <div className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300">
          <div className="flex justify-between text-center">
            <p className="font-semibold text-center align-center text-gray-600">Empréstimos</p>
            <button
              type="button"
              onClick={adicionarEmprestimo}
              className="bg-blue-600 text-white px-2 py-1 rounded"
            >
              + Adicionar
            </button>
          </div>

          {form.emprestimos.map((emp, i) => (
            <div key={i} className="space-y-3 mb-6 p-2">
              <select
                className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
                value={emp.livroId}
                onChange={(e) =>
                  atualizarEmprestimo(i, "livroId", e.target.value)
                }
              >
                <option value="">Selecione um livro</option>
                {livros.map((l) => (
                  <option key={l._id} value={l._id}>
                    {l.titulo}
                  </option>
                ))}
              </select>

              <input
                className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
                value={emp.copiaCodigo}
                placeholder="Código da Cópia"
                onChange={(e) =>
                  atualizarEmprestimo(i, "copiaCodigo", e.target.value)
                }
              />

              <input
                type="date"
                className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
                value={emp.dataEmprestimo?.split("T")[0] || ""}
                onChange={(e) =>
                  atualizarEmprestimo(i, "dataEmprestimo", e.target.value)
                }
              />

              <input
                type="date"
                className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
                value={emp.dataPrevistaDevolucao?.split("T")[0] || ""}
                onChange={(e) =>
                  atualizarEmprestimo(i, "dataPrevistaDevolucao", e.target.value)
                }
              />

              <input
                type="date"
                className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
                value={emp.dataDevolucao?.split("T")[0] || ""}
                onChange={(e) =>
                  atualizarEmprestimo(i, "dataDevolucao", e.target.value)
                }
              />

              <button
                type="button"
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => removerEmprestimo(i)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        {/* Seção de Reservas */}
        <div className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300">
          <div className="flex justify-between text-center">
            <p className="font-semibold text-center align-center text-gray-600">Reservas</p>
            <button
              type="button"
              onClick={adicionarReserva}
              className="bg-blue-600 text-white px-2 py-1 rounded"
            >
              + Adicionar
            </button>
          </div>

          {form.reservas.map((res, i) => (
            <div key={i} className="space-y-3 mb-6 p-2">
              <select
                className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
                value={res.livroId}
                onChange={(e) =>
                  atualizarReserva(i, "livroId", e.target.value)
                }
              >
                <option value="">Selecione um livro</option>
                {livros.map((l) => (
                  <option key={l._id} value={l._id}>
                    {l.titulo}
                  </option>
                ))}
              </select>

              <input
                type="date"
                className="p-2 w-full bg-gray-100 shadow rounded-lg border border-gray-300"
                value={res.dataReserva?.split("T")[0] || ""}
                onChange={(e) =>
                  atualizarReserva(i, "dataReserva", e.target.value)
                }
              />

              <button
                type="button"
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => removerReserva(i)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {/* Ternário de mudança texto do botão conforme o modo */}
          {modoEdicao ? "Salvar edição" : "Criar usuário"}
        </button>

        {modoEdicao && (
          <button
            type="button"
            onClick={() => {
              setModoEdicao(false);
              resetarFormulario();
            }}
            className="ml-2 bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        )}
      </form>

      {/* TABELA */}
      <div className="relative overflow-x-auto bg-neutral-100 shadow rounded-lg border border-gray-300">
        <table className="w-full text-sm text-center text-gray-700">
          <thead className="text-sm bg-gray-200 border-b border-gray-300">
          <tr>
            <th className="px-6 py-3 font-medium">ID</th>
            <th className="px-6 py-3 font-medium">Nome</th>
            <th className="px-6 py-3 font-medium">Email</th>
            <th className="px-6 py-3 font-medium">Telefone</th>
            <th className="px-6 py-3 font-medium">Ações</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((u) => (
            <tr key={u._id} className="bg-white border-b border-gray-200 hover:bg-gray-100">
              <td className="border border-gray-200">{u._id}</td>
              <td className="border border-gray-200">{u.nome}</td>
              <td className="border border-gray-200">{u.email}</td>
              <td className="border border-gray-200">{u.telefone}</td>

              <td className="p-2 space-x-2 text-center border border-gray-200">
                <button
                  onClick={() => editarUsuario(u)}
                  className="bg-yellow-600 font-medium text-white px-2 py-1 mb-1 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => remover(u._id)}
                  className="bg-red-600 font-medium text-white px-2 py-1 mb-1 rounded"
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
