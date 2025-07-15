import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { addBalance } from "../controllers/BalanceController";

const router = Router();

router.post("/saldo/adicionar", verifyToken, addBalance);

export default router;