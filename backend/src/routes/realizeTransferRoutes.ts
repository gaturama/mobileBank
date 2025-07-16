import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { realizarPix } from "../controllers/TransferController"
import { realizarTransferencia } from "../controllers/realizeTransferController";

const router = Router();

router.post("/transferencias", verifyToken, realizarTransferencia);
router.post("/transferencias/pix", verifyToken, realizarPix);

export default router;