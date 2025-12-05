import { apiGet } from "@/lib/api";

export default async function UsuariosPage() {
  const usuarios = await apiGet("/usuario");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">👤 Usuários</h1>

      <table className="w-full bg-white shadow-md rounded-xl overflow-hidden border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Telefone</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((u: any) => (
            <tr key={u._id} className="border-t">
              <td className="p-3">{u._id}</td>
              <td className="p-3">{u.nome}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.telefone || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
