import { Request, Response } from "express";
import PixKey from "../models/PixKey";

export const criarPixKey = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { tipo_chave, valor_chave } = req.body;

    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });
    if (!tipo_chave || !valor_chave)
      return res
        .status(400)
        .json({ error: "Tipo e valor da chave são obrigatórios" });

    const chaveExistente = await PixKey.findOne({ valor_chave });
    if (chaveExistente)
      return res.status(400).json({ error: "Chave Pix já cadastrada" });

    const novaChave = new PixKey({
      id_conta: userId,
      tipo_chave,
      valor_chave,
      status: "ativa",
    });

    await novaChave.save();
    return res
      .status(201)
      .json({ message: "Chave Pix criada com sucesso", chave: novaChave });
  } catch (error) {
    console.error("Erro ao criar chave Pix:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const listarPixKeys = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const chaves = await PixKey.find({ id_conta: userId });
    return res.json(chaves);
  } catch (error) {
    console.error("Erro ao listar chaves Pix:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const atualizarStatusPixKey = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { status } = req.body;

    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });
    if (!["ativa", "inativa"].includes(status))
      return res.status(400).json({ error: "Status inválido" });

    const chave = await PixKey.findOne({ _id: id, id_conta: userId });
    if (!chave)
      return res.status(404).json({ error: "Chave Pix não encontrada" });

    chave.status = status;
    await chave.save();

    return res.json({ message: "Status atualizado com sucesso", chave });
  } catch (error) {
    console.error("Erro ao atualizar status da chave Pix:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const deletarPixKey = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId)
      return res.status(401).json({ error: "Usuário não autenticado" });

    const chave = await PixKey.findOneAndDelete({ _id: id, id_conta: userId });
    if (!chave)
      return res.status(404).json({ error: "Chave Pix não encontrada" });

    return res.json({ message: "Chave Pix deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar chave Pix:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};