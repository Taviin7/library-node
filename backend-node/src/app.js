import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
import livroRoutes from "./routes/livroRoutes.js";
import autorRoutes from "./routes/autorRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

app.use("/livro", livroRoutes);
app.use("/autor", autorRoutes);
app.use("/usuario", usuarioRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "API rodando!" });
});

// Tirando o erro de favicon.ico
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // responde vazio sem erro
});


export default app;