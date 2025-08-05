import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TransferenciaScreen() {
  const [numeroContaDestino, setnumeroContaDestino] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoTransferencia, setTipoTransferencia] = useState("PIX");

  const realizarTransferencia = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!numeroContaDestino || !valor) {
      Alert.alert("Erro", "Preencha conta destino e valor");
      return;
    }

    const urlBase = "http://192.168.3.208:3333/api/auth/transferencias";
    const url = tipoTransferencia === "PIX" ? `${urlBase}/pix` : urlBase;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numero_conta_destino: numeroContaDestino,
          valor: Number(valor),
          descricao,
          tipo_transferencia: tipoTransferencia,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Sucesso", data.message);
        setnumeroContaDestino("");
        setValor("");
        setDescricao("");
      } else {
        Alert.alert("Erro", data.error || "Algo deu errado");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro na requisição, tenta de novo!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Realizar Transferência</Text>

      <Text>Conta Destino:</Text>
      <TextInput
        style={styles.input}
        value={numeroContaDestino}
        onChangeText={setnumeroContaDestino}
        placeholder="Número da conta destino"
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
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          justifyContent: "space-evenly",
        }}
      >
        {["PIX", "TED", "DOC"].map((tipo) => (
          <Button
            key={tipo}
            title={tipo}
            onPress={() => setTipoTransferencia(tipo)}
            color={tipoTransferencia === tipo ? "#006400" : "gray"}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.botao} onPress={realizarTransferencia}>
        <Text style={styles.textBotao}>Transferir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#EAEAEA" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#228B22 ",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
  botao: {
    backgroundColor: "#228B22",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    width: "100%"
  },
  textBotao: {
    color: "white",
    fontSize: 16,
  },
});