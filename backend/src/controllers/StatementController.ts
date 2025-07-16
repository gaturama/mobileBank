import { Request, Response } from "express";
import Transfer from "../models/Transfer";
import Account from "../models/Account";

export const getExtrato = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const conta = await Account.findOne({ userId });

    if (!conta) {
      return res.status(404).json({ error: "Conta não encontrada" });
    }

    const extrato = await Transfer.find({
      $or: [
        { id_conta_origem: conta._id },
        { id_conta_destino: conta._id }
      ]
    }).sort({ data_transferencia: -1 });

    return res.json(extrato);
  } catch (error) {
    console.error("Erro ao obter extrato:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};