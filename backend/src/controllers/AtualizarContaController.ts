import { Request, Response } from 'express'
import Account from '../models/Account'

export const atualizarConta = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

    const { agencia, telefone_contato } = req.body

    const contaAtualizada = await Account.findOneAndUpdate(
      { userId },
      { agencia, telefone_contato },
      { new: true, runValidators: true }
    )

    if (!contaAtualizada) return res.status(404).json({ error: 'Conta não encontrada' })

    return res.json({ message: 'Conta atualizada', conta: contaAtualizada })
  } catch (error) {
    console.error('Erro ao atualizar conta:', error)
    return res.status(500).json({ error: 'Erro interno no servidor' })
  }
}
