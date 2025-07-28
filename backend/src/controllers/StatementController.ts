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
    })
    .sort({ data_transferencia: -1 })
    .populate("id_conta_origem", "numero_conta")
    .populate("id_conta_destino", "numero_conta");

    const extratoFormatado = extrato.map((transf) => {
      const foiEnviada = String((transf.id_conta_origem as any)?._id) === String(conta._id);

      return {
        _id: transf._id,  // <-- mantém o _id aqui pra usar como key no React
        tipo: foiEnviada ? "Enviada" : "Recebida",
        valor: transf.valor,
        data: transf.data_transferencia,
        conta_origem: (transf.id_conta_origem as any)?.numero_conta,
        conta_destino: (transf.id_conta_destino as any)?.numero_conta,
      };
    });

    return res.json(extratoFormatado);
  } catch (error) {
    console.error("Erro ao obter extrato:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
