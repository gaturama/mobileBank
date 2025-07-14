import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getPerfil } from "../controllers/PerfilController";

const router = Router();

router.get("/", verifyToken, getPerfil);

export default router;