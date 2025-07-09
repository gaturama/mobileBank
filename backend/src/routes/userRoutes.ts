import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import {
  getDadosUsuario,
  atualizarDadosUsuario,
} from "../controllers/UserController";

const router = Router();

router.get("/usuario/me", verifyToken, getDadosUsuario);
router.put("/usuario/atualizar", verifyToken, atualizarDadosUsuario);

export default router;
