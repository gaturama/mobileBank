import { Request, Response } from "express";
import User from "../models/User";

export const getDadosUsuario = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const user = await User.findById(userId).select("-senha_hash"); // tira hash da senha
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    return res.json(user);
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const atualizarDadosUsuario = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const {
      nome_completo,
      email,
      telefone,
      data_nascimento,
      endereco,
      biometria_ativa,
      autenticacao_2fa,
    } = req.body;

    const atualizado = await User.findByIdAndUpdate(
      userId,
      {
        nome_completo,
        email,
        telefone,
        data_nascimento,
        endereco,
        biometria_ativa,
        autenticacao_2fa,
      },
      { new: true, runValidators: true, context: "query" }
    ).select("-senha_hash");

    if (!atualizado)
      return res.status(404).json({ error: "Usuário não encontrado" });

    return res.json({
      message: "Dados atualizados com sucesso",
      usuario: atualizado,
    });
  } catch (error) {
    console.error("Erro ao atualizar dados do usuário:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
