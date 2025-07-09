import { Request, Response } from "express";
import Account from "../models/Account";

export const getAccountDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({ error: "Conta não encontrada." });
    }

    return res.json(account);
  } catch (error) {
    console.error("Erro ao buscar dados da conta:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
