import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function TransferenciaScreen() {
  const [contaDestinoId, setContaDestinoId] = useState('')
  const [valor, setValor] = useState('')
  const [descricao, setDescricao] = useState('')
  const [tipoTransferencia, setTipoTransferencia] = useState('PIX') // Pode ser PIX, TED ou DOC

  const realizarTransferencia = async () => {
    const token = await AsyncStorage.getItem('token')

    if (!contaDestinoId || !valor) {
      Alert.alert('Erro', 'Preencha conta destino e valor')
      return
    }

    const res = await fetch('http://192.168.1.4:3333/transferencias', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contaDestinoId,
        valor: Number(valor),
        descricao,
        tipo_transferencia: tipoTransferencia,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      Alert.alert('Sucesso', data.message)
      setContaDestinoId('')
      setValor('')
      setDescricao('')
    } else {
      Alert.alert('Erro', data.error || 'Algo deu errado')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Realizar Transferência</Text>

      <Text>Conta Destino:</Text>
      <TextInput
        style={styles.input}
        value={contaDestinoId}
        onChangeText={setContaDestinoId}
        placeholder="ID da conta destino"
      />

      <Text>Valor:</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
        placeholder="Valor da transferência"
      />

      <Text>Descrição (opcional):</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição"
      />

      <Text>Tipo de Transferência:</Text>
      <View style={{ flexDirection: 'row', marginVertical: 8 }}>
        {['PIX', 'TED', 'DOC'].map((tipo) => (
          <Button
            key={tipo}
            title={tipo}
            onPress={() => setTipoTransferencia(tipo)}
            color={tipoTransferencia === tipo ? 'blue' : 'gray'}
          />
        ))}
      </View>

      <Button title="Enviar Transferência" onPress={realizarTransferencia} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
})
