import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function enviarTokenProBackend(token: string) {
  try {
    const jwt = await AsyncStorage.getItem('token') // ou onde você guarda o JWT

    if (!jwt) {
      console.warn('Usuário não autenticado, não foi possível enviar token FCM.')
      return
    }

    const response = await fetch('http:// 192.168.3.208:3333/notifications/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        token,
        plataforma: Platform.OS,
      }),
    })

    const data = await response.json()
    console.log('Token FCM salvo:', data)
  } catch (error) {
    console.error('Erro ao enviar token FCM:', error)
  }
}
