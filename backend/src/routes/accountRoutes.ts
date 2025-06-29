import { Router } from 'express'
import { getAccountDetails } from '../controllers/AccountController'
import { verifyToken } from '../middleware/authMiddleware'

const router = Router()

router.get('/account', verifyToken, getAccountDetails)

export default router
