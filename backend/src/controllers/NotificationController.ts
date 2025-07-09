import * as admin from "../firebase";
import FcmToken from "../models/Token";

export const enviarNotificacaoTransferencia = async (
  userId: string,
  titulo: string,
  corpo: string
) => {
  try {
    const tokens = await FcmToken.find({ userId });
    if (tokens.length === 0) return;

    const mensagem = {
      notification: {
        title: titulo,
        body: corpo,
      },
      tokens: tokens.map((t) => t.token),
    };

    const response = await admin.messaging().sendMulticast(mensagem);
    console.log("Notificação enviada:", response.successCount, "sucessos");
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
  }
};
