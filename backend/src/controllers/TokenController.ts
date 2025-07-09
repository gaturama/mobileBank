import { Request, Response } from "express";
import FcmToken from "../models/Token";

export const salvarToken = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { token, plataforma } = req.body;

    if (!token)
      return res.status(400).json({ error: "Token FCM é obrigatório" });

    const existe = await FcmToken.findOne({ userId, token });
    if (existe) return res.json({ message: "Token já registrado" });

    const novoToken = new FcmToken({ userId, token, plataforma });
    await novoToken.save();

    return res.status(201).json({ message: "Token salvo com sucesso" });
  } catch (error) {
    console.error("Erro ao salvar token FCM:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
