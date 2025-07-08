import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface DecodedToken {
    id: string
    nome_completo: string
    email: string
}

interface AuthenticatedRequest extends Request {
    user?: DecodedToken
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido' })
    }
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido ou expirado' })
    }
}
