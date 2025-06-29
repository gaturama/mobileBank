import { Request, Response } from 'express'
import User from '../models/User'

export const atualizarPerfil = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

    const { nome_completo, telefone, endereco, data_nascimento } = req.body

    const userAtualizado = await User.findByIdAndUpdate(
      userId,
      { nome_completo, telefone, endereco, data_nascimento },
      { new: true, runValidators: true }
    ).select('-senha_hash')

    if (!userAtualizado) return res.status(404).json({ error: 'Usuário não encontrado' })

    return res.json({ message: 'Perfil atualizado', user: userAtualizado })
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
    return res.status(500).json({ error: 'Erro interno no servidor' })
  }
}
