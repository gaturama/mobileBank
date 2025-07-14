import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons'

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ route, navigation }: Props) {
  const handleExtrato = () => {
    navigation.navigate("Extrato");
  };

  const handlePerfil = () => {
    navigation.navigate("Perfil");
  };

  const handleTransferencia = () => {
    navigation.navigate("Transferencia");
  };

  const [mostrarSaldo, setMostrarSaldo] = useState(false);

  const toggleSaldo = () => setMostrarSaldo((prev: any) => !prev);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imagem}
        source={require("../assets/images/logoIcon.png")}
      />
      <Text style={styles.title}>Bem-vindo ao Athena Bank</Text>
      <Text style={styles.saldo}>
        Seu saldo é: {mostrarSaldo ? "R$ 25.000,00" : ""}
      </Text>
      <TouchableOpacity onPress={toggleSaldo} style={styles.olho}>
       <Ionicons name={mostrarSaldo ? 'eye-off' : 'eye' } size={24} color="#353E67"></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={handlePerfil}>
        <Text style={styles.textBotao}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={handleExtrato}>
        <Text style={styles.textBotao}>Extrato</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={handleTransferencia}>
        <Text style={styles.textBotao}>Transferência</Text>
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
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    alignSelf: "center",
    color: "#353E67",
  },
  saldo: {
    fontSize: 20,
    marginBottom: 20,
    alignSelf: "center",
    color: "#353E67",
    flexDirection: 'row',
    gap: 10,
  },
  token: { fontWeight: "bold" },
  tokenValue: { fontSize: 12, color: "gray" },
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
  imagem: {
    padding: 20,
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
  olho: {
    padding: 5,
    alignSelf: 'center'
  },
});