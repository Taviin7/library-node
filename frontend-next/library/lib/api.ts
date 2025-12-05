const API_URL = "http://localhost:4000"; // Porta da sua API

export async function apiGet(path: string) {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  return res.json();
}

export async function apiPost(path: any, data: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function apiPut(path: any, data: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function apiDelete(path: any) {
  const res = await fetch(`${API_URL}${path}`, { method: "DELETE" });
  return res.json();
}
