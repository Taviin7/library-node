import { Router } from "express";
import {
  criarAutor,
  listarAutores,
  buscarAutor,
  atualizarAutor,
  deletarAutor
} from "../controllers/autorController.js";

const router = Router();

router.get("/", listarAutores);
router.get("/:id", buscarAutor);
router.post("/", criarAutor);
router.put("/:id", atualizarAutor);
router.delete("/:id", deletarAutor);

export default router;