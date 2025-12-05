import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 4000;

// Conecta ao Mongo antes de iniciar o servidor
mongoose.connect(process.env.MONGODB_URI, {
  dbName: "BibliotecaLP"
})
.then(() => {
  console.log("MongoDB conectado!");

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error("Erro ao conectar no MongoDB:", err.message);
});
