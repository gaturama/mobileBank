import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { atualizarPerfil, getPerfil } from "../controllers/PerfilController";

const router = Router();

router.get("/perfil", verifyToken, getPerfil);
router.put("/perfil/atualizar", verifyToken, atualizarPerfil);
export default router;