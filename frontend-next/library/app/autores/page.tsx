import { apiGet } from "@/lib/api";

export default async function AutoresPage() {
  const autores = await apiGet("/autor");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">✍️ Autores</h1>

      <div className="space-y-6">
        {autores.map((autor: any) => (
          <div
            key={autor._id}
            className="bg-white p-6 rounded-xl shadow-md border"
          >
            <h2 className="text-xl font-semibold">{autor.nome}</h2>

            <p className="text-gray-600 text-sm mt-1">
              <strong>Nascimento:</strong>{" "}
              {new Date(autor.dataNascimento).toLocaleDateString("pt-BR")}
            </p>

            <p className="text-sm mt-3">{autor.biografia}</p>

            <p className="text-sm mt-3">
              <strong>Livros:</strong>{" "}
              {autor.livros?.length > 0
                ? autor.livros.join(", ")
                : "Nenhum livro registrado"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
