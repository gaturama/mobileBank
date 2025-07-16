import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getExtrato } from "../controllers/StatementController";

const router = Router();

router.get("/extrato", verifyToken, getExtrato);

export default router;