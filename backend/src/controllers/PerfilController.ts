import { Request, Response } from "express";
import User from "../models/User";
import Account from "../models/Account";

export const getPerfil = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const user = await User.findById(userId).select("-senha_hash");
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const conta = await Account.findOne({ userId });
    if (!conta) return res.status(404).json({ error: "Conta não encontrada" });

    return res.json({ user, conta });
  } catch (error) {
    console.error("Erro ao pegar perfil:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const atualizarPerfil = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const { nome_completo, email, telefone, endereco } = req.body;

    const userAtualizado = await User.findByIdAndUpdate(
      userId,
      { nome_completo, email, telefone, endereco },
      { new: true, runValidators: true }
    ).select("-senha_hash");

    if (!userAtualizado)
      return res.status(404).json({ error: "Usuário não encontrado" });

    return res.json({ message: "Perfil alterado com sucesso", userAtualizado });
  } catch (error) {
    console.error("Erro ao atualizar o perfil:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
