import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PerfilScreen() {
  const [perfil, setPerfil] = useState<any>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [agencia, setAgencia] = useState("");
  const [numeroConta, setNumeroConta] = useState("");
  const [saldo, setSaldo] = useState("");
  

  useEffect(() => {
    async function fetchPerfil() {
      try{
      const token = await AsyncStorage.getItem("token");
      console.log("Token usado:", token);
      const res = await fetch("http://192.168.3.208:3333/api/auth/usuario/perfil", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Status HTTP:", res.status);
      console.log("Dados recebidos do perfil:", data);

      if (res.ok) {
        setPerfil(data);
        setNome(data.user.nome_completo);
        setEmail(data.user.email);
        setTelefone(data.user.telefone);
        setEndereco(data.user.endereco);
        const nascimento = new Date(data.user.data_nascimento);
        const formattedDate = nascimento.toLocaleDateString("pt-BR");
        setDataNascimento(formattedDate);
        setAgencia(data.conta?.agencia || "");
        setNumeroConta(data.conta?.numero_conta || "");
        setSaldo(data.conta?.saldo || 0);
      } else {
        Alert.alert("Erro", data.error || "Erro ao carregar perfil");
        setPerfil(null);
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      Alert.alert("Erro", "Não foi possível carregar o perfil");
      setPerfil(null);
    }
  }

    fetchPerfil();
  }, []);

  async function atualizarPerfil() {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(
        "http://192.168.3.208:3333/api/auth/usuario/perfil/atualizar",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nome_completo: nome,
            email,
            telefone,
            endereco,
            data_nascimento: dataNascimento,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setPerfil(data);
        setNome(data.nome_completo);
        setEmail(data.email);
        setTelefone(data.telefone);
        setEndereco(data.endereco);
        setDataNascimento(data.data_nascimento);
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      } else {
        const errorData = await res.json();
        Alert.alert("Erro", errorData.error || "Erro ao atualizar perfil");
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  }

  if (!perfil) {
    return (
      <View style={styles.container}>
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text style={styles.label}>Telefone</Text> 
      <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} />
      <Text style={styles.label}>Endereço</Text>
      <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />
      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        value={dataNascimento}
        onChangeText={setDataNascimento}
        placeholder="DD/MM/AAAA"
        />
      <TouchableOpacity style={styles.botao} onPress={atualizarPerfil}>
        <Text style={styles.textBotao}>Atualizar Perfil</Text>
      </TouchableOpacity>

      <View style={styles.linha} />

      <Text style={styles.title}>Informações Bancárias</Text>
      <Text style={styles.label}>Agência: {perfil.conta?.agencia}</Text>
      <Text style={styles.label}>Conta: {perfil.conta?.numero_conta}</Text>
      <Text style={styles.label}>Saldo: R$ {perfil.conta?.saldo?.toFixed(2)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 10, backgroundColor: "#EAEAEA" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#228B22",
  },
  input: { borderWidth: 1, padding: 10, borderRadius: 8 },
  botao: {
    backgroundColor: "#228B22",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textBotao: {
    color: "white",
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8, 
    color: "#228B22",
  },
  linha: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  }
});