import { Router } from 'express'
import { realizarPix } from '../controllers/TransferController'
import { verifyToken } from '../middleware/authMiddleware'

const router = Router()

router.post('/transferencias/pix', verifyToken, realizarPix)

export default router

