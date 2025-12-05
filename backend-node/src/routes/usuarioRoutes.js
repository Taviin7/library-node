import { Router } from "express";
import {
  criarUsuario,
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  deletarUsuario
} from "../controllers/usuarioController.js";

const router = Router();

router.get("/", listarUsuarios);
router.get("/:id", buscarUsuario);
router.post("/", criarUsuario);
router.put("/:id", atualizarUsuario);
router.delete("/:id", deletarUsuario);

export default router;