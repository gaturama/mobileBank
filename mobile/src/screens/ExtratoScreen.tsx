import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Transfer = {
  _id: string
  tipo_transferencia: string
  valor: number
  descricao?: string
  data_transferencia: string
  id_conta_origem: string
  id_conta_destino: string
  status: string
}

export default function ExtratoScreen() {
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExtrato = async () => {
      const token = await AsyncStorage.getItem('token')
      const res = await fetch('http://192.168.3.208:3333/transferencias/extrato', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setTransfers(data)
      setLoading(false)
    }
    fetchExtrato()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Extrato de Transferências</Text>
      <FlatList
        data={transfers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.transferItem}>
            <Text>{item.tipo_transferencia} - R$ {item.valor.toFixed(2)}</Text>
            <Text>{item.descricao || 'Sem descrição'}</Text>
            <Text>{new Date(item.data_transferencia).toLocaleString()}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#353E67' },
  transferItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ddd', marginBottom: 8, }
})
