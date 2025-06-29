import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

export function useExpoPushToken() {
  useEffect(() => {
    async function register() {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        alert('Falha ao obter permissão para notificações')
        return
      }

      const tokenData = await Notifications.getExpoPushTokenAsync()
      console.log('Expo Push Token:', tokenData.data)

    }

    register()
  }, [])
}
