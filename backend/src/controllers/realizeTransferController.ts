import { Request, Response } from "express";
import Transfer from "../models/Transfer";
import Account from "../models/Account";
import mongoose from "mongoose";

export const realizarTransferencia = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const { valor, numero_conta_destino, agencia_destino = "0001", descricao, tipo_transferencia } = req.body;

    if (!valor || valor <= 0)
      return res.status(400).json({ error: "Valor inválido" });
    if (!numero_conta_destino)
      return res.status(400).json({ error: "Número da conta destino obrigatória" });
    if (!["TED", "DOC"].includes(tipo_transferencia)) {
      return res.status(400).json({ error: "Tipo de transferência inválido" });
    }

    const contaOrigem = await Account.findOne({ userId }).session(session);
    if (!contaOrigem) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Conta origem não encontrada" });
    }

    if (contaOrigem.saldo < valor) {
      await session.abortTransaction();
      return res.status(400).json({ error: "Saldo insuficiente" });
    }

    const contaDestino = await Account.findOne({numero_conta: numero_conta_destino, agencia: agencia_destino}).session(
      session
    );
    if (!contaDestino) {
      await session.abortTransaction();
      return res.status(404).json({ error: "Conta destino não encontrada" });
    }

    contaOrigem.saldo -= valor;
    await contaOrigem.save({ session });

    contaDestino.saldo += valor;
    await contaDestino.save({ session });

    const transferencia = new Transfer({
      id_conta_origem: contaOrigem._id,
      id_conta_destino: contaDestino._id,
      tipo_transferencia,
      valor,
      descricao,
      data_transferencia: new Date(),
      status: "concluída",
    });

    await transferencia.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json({
        message: `${tipo_transferencia} realizado com sucesso`,
        transferencia,
      });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Erro na transferência:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};