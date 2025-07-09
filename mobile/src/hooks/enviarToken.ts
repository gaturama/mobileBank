import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function enviarTokenProBackend(token: string) {
  const seuJWT = await AsyncStorage.getItem("token"); // Pega o JWT salvo

  if (!seuJWT) {
    console.warn("JWT não encontrado, não envia o token FCM");
    return;
  }

  await fetch("http://192.168.1.4/notifications/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${seuJWT}`, // Aqui usa a variável, não o token direto
    },
    body: JSON.stringify({
      token,
      plataforma: Platform.OS,
    }),
  });
}
