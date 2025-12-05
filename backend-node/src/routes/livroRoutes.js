import { Router } from "express";
import {
  criarLivro,
  listarLivros,
  buscarLivro,
  atualizarLivro,
  deletarLivro
} from "../controllers/livroController.js";

const router = Router();

router.get("/", listarLivros);           
router.get("/:id", buscarLivro);      
router.post("/", criarLivro);         
router.put("/:id", atualizarLivro);      
router.delete("/:id", deletarLivro);     

export default router;