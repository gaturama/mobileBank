import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert, Image } from "react-native";

export default function LoginScreen({ navigation }: any) {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.4:3333/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Sucesso", "Login realizado!");
        navigation.navigate("Home", { token: data.token });
      } else {
        const data = await response.json();
        Alert.alert("Erro", data.error || "Erro no login");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.imagem} source={require('../assets/images/userIcon.png')}/>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="CPF" style={styles.input} value={cpf} onChangeText={setCpf} keyboardType="numeric" />
      <TextInput placeholder="Senha" style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#e7e1df' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' },
  input: { borderWidth: 1, borderColor: 'black', padding: 10, marginBottom: 15, borderRadius: 5 },
  imagem: { padding: 20, width: 60, height: 60, alignSelf: 'center', marginBottom: 20 }
})