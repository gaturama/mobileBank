import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native'

export default function RegisterScreen({ navigation }: any) {
  const [nome_completo, setNomeCompleto] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [data_nascimento, setDataNascimento] = useState('')
  const [endereco, setEndereco] = useState('')

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.3.208:3333/api/auth/register', {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome_completo,
          cpf,
          email,
          telefone, 
          senha,
          data_nascimento,
          endereco
        }),
      })

      if (response.ok) {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!')
        navigation.navigate('Login')
      } else {
        const data = await response.json()
        Alert.alert('Erro', data.error || 'Erro no cadastro')
      }
    } catch (error){
      Alert.alert('Erro', 'Não foi possível conectar ao servidor')
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput placeholder='Nome Completo' style={styles.input} value={nome_completo} onChangeText={setNomeCompleto} />
      <TextInput placeholder='CPF' style={styles.input} value={cpf} onChangeText={setCpf} keyboardType='numeric'/>
      <TextInput placeholder='Email' style={styles.input} value={email} onChangeText={setEmail} keyboardType='email-address'/>
      <TextInput placeholder='Telefone' style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType='phone-pad'/>
      <TextInput placeholder='Senha' style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />
      <TextInput placeholder='Data de Nascimento (YYYY-MM-DD)' style={styles.input} value={data_nascimento} onChangeText={setDataNascimento} />
      <TextInput placeholder='Endereço' style={styles.input} value={endereco} onChangeText={setEndereco} />
      <Button title='Cadastrar' onPress={handleRegister}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center', color: '#353E67' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
})
