import { Router } from 'express'
import { verifyToken } from '../middleware/authMiddleware'
import { realizarTransferencia } from '../controllers/realizeTransferController'

const router = Router()

router.post('/transferencias/ted-doc', verifyToken, realizarTransferencia)

export default router
