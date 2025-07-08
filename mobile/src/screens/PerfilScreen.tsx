import { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function PerfilScreen() {
  const [perfil, setPerfil] = useState<any>(null)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')

  useEffect(() => {
    async function fetchPerfil() {
      const token = await AsyncStorage.getItem('token')
      const res = await fetch('http://192.168.3.208:3333/usuario/perfil', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      console.log('Dados recebidos do perfil:', data)

      setPerfil(data)
      setNome(data.nome_completo)
      setEmail(data.email)
      setTelefone(data.telefone)
      setEndereco(data.endereco)
    }

    fetchPerfil()
  }, [])

  async function atualizarPerfil() {
    const token = await AsyncStorage.getItem('token')
    const res = await fetch('http://192.168.3.208:3333/usuario/perfil', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nome_completo: nome,
        email,
        telefone,
        endereco,
      }),
    })

    Alert.alert('Perfil atualizado!', 'Suas informações foram salvas com sucesso.')

    const data = await res.json()
    alert(data.message || 'Atualizado!')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dados Pessoais</Text>
      <TextInput value={nome} onChangeText={setNome} placeholder="Nome" style={styles.input} />
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={styles.input} />
      <TextInput value={telefone} onChangeText={setTelefone} placeholder="Telefone" style={styles.input} />
      <TextInput value={endereco} onChangeText={setEndereco} placeholder="Endereço" style={styles.input} />
      <Button title="Salvar alterações" onPress={atualizarPerfil} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#353E67' },
  input: { borderWidth: 1, padding: 10, borderRadius: 8 },
})
