import * as LocalAuthentication from "expo-local-authentication";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
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
  async function verifyAuthentication() {
    const isBiometricEnrolled = LocalAuthentication.isEnrolledAsync();
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log(compatible);

    if (!isBiometricEnrolled) {
      Alert.alert(
        "Biometria não cadastrada",
        "Por favor, cadastre sua biometria antes de continuar."
      );
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login com biometria",
      fallbackLabel: "Biometria não reconhecida",
    });

    setIsAuthenticated(auth.success);
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(
      types.map((type) => LocalAuthentication.AuthenticationType[type])
    );
  }

  useEffect(() => {
    verifyAuthentication();
  }, []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleRegister = () => {
    navigation.navigate("Register");
  };

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
      if (cpf && senha) {
        const response = await fetch(
          "http://192.168.3.208:3333/api/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cpf, senha }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          await AsyncStorage.setItem("token", data.token);
          setCpf("");
          setSenha("");
          navigation.navigate("Home", { token: data.token });
        } else {
          const data = await response.json();
          Alert.alert("Erro", data.error || "Erro no login");
        }
      } else {
        const isBiometricEnrolled = LocalAuthentication.isEnrolledAsync();

        if (!isBiometricEnrolled) {
          return Alert.alert(
            "Biometria não cadastrada",
            "Por favor, cadastre sua biometria antes de continuar."
          );
        }

        const auth = await LocalAuthentication.authenticateAsync({
          promptMessage: "Login com biometria",
          fallbackLabel: "Biometria não reconhecida",
        });

        if (auth.success) {
          const token = await AsyncStorage.getItem("token");
          if (token) {
            setIsAuthenticated(true);
            navigation.navigate("Home", { token });
          } else {
            Alert.alert(
              "Erro",
              "Token não encontrado. Por favor, faça login com cpf e senha."
            );
          }
        }
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
            color="#006400"
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
    backgroundColor: "#EAEAEA ",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
    color: "#228B22",
  },
  input: {
    borderWidth: 1,
    borderColor: "#7a7a7aff",
    padding: 10,
    marginBottom: 15,
    borderRadius: 20,
  },
  imagem: {
    padding: 20,
    width: 60,
    height: 60,
    alignSelf: "center",
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "#228B22",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    width: "100%",
  },
  textBotao: {
    color: "white",
    fontSize: 16,
  },
  inputSenha: {
    borderWidth: 1,
    borderColor: "#7a7a7aff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  icone: {
    position: "absolute",
    right: 10,
    top: "40%",
    transform: [{ translateY: -11 }],
    padding: 5,
  },
  containerSenha: {
    position: "relative",
    marginBottom: 15,
  },
});
