import { Request, Response } from 'express'
import Account from '../models/Account'

export const getDashboardInfo = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' })
    }

    const conta = await Account.findOne({ userId })

    if (!conta) {
      return res.status(404).json({ error: 'Conta não encontrada.' })
    }

    return res.json({
      message: `Bem-vindo, ${req.user?.nome_completo}`,
      saldo: conta.saldo,
      conta: conta.numero_conta,
      agencia: conta.agencia,
    })
  } catch (error) {
    console.error('Erro na rota protegida:', error)
    return res.status(500).json({ error: 'Erro interno no servidor' })
  }
}
