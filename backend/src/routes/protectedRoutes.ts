import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getDashboardInfo } from "../controllers/protectedController";

const router = Router();

router.get("/dashboard", verifyToken, getDashboardInfo);

export default router;