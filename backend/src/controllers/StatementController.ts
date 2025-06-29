import { Request, Response } from 'express'
import Transfer from '../models/Transfer'

export const getExtrato = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

    const extrato = await Transfer.find({
      $or: [
        { id_conta_origem: userId },
        { id_conta_destino: userId }
      ]
    }).sort({ data_transferencia: -1 })

    return res.json(extrato)
  } catch (error) {
    console.error('Erro ao buscar extrato:', error)
    return res.status(500).json({ error: 'Erro interno' })
  }
}
