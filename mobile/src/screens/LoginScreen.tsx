import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen({ navigation }: any) {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  
  const handleRegister = () => {
    navigation.navigate("Register")
  }

  const toggleMostrarSenha = () => {
    setMostrarSenha((prev) => !prev);
  };

  useFocusEffect(
    useCallback(() => {
      setCpf("");
      setSenha("");
    }, [])
  );

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.3.208:3333/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        setCpf("");
        setSenha("");
        Alert.alert("Sucesso", "Login realizado!");
        navigation.navigate("Home", { token: data.token });
      } else {
        const data = await response.json();
        Alert.alert("Erro", data.error || "Erro no login");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imagem}
        source={require("../assets/images/userIcon.png")}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="CPF"
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <View style={styles.containerSenha}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={!mostrarSenha}
        placeholder="Senha"
        style={styles.inputSenha}
        value={senha}
        onChangeText={setSenha}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={toggleMostrarSenha} style={styles.icone}>
        <Ionicons
          name={mostrarSenha ? "eye-off" : "eye"}
          size={22}
          color="#353E67"
        />
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textBotao}>Acessar</Text>
      </TouchableOpacity>
       <TouchableOpacity style={styles.botao} onPress={handleRegister}>
        <Text style={styles.textBotao}>Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#e7e1df",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
    color: "#353E67",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  imagem: {
    padding: 20,
    width: 60,
    height: 60,
    alignSelf: "center",
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "#353E67",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textBotao: {
    color: "white",
    fontSize: 16,
  },
  inputSenha: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  icone: {
    position: 'absolute',
    right: 10,
    top: '40%',
    transform: [{ translateY: -11 }],
    padding: 5,
  }, 
  containerSenha: {
    position: 'relative',
    marginBottom: 15, 
  }
});
