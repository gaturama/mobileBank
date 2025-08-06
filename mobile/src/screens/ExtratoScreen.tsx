import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "../styles/stylesExtrato";

type Transfer = {
  _id: string;
  tipo_transferencia: string;
  valor: number;
  descricao?: string;
  data_transferencia: string;
  id_conta_origem: string;
  id_conta_destino: string;
  status: string;
};

export default function ExtratoScreen() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  useEffect(() => {
    const fetchExtrato = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await fetch("http://192.168.3.208:3333/api/auth/extrato", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!Array.isArray(data)) {
          setTransfers(data);
          setLoading(false);
        } else {
          setTransfers(data);
        }
      } catch (error) {
        console.error("Erro ao buscar extrato:", error);
        setTransfers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExtrato();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#353E67" />
        <Text style={{ marginTop: 10, color: "#353E67" }}>
          Carregando extrato...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Extrato de Transferências</Text>
      {transfers.length === 0 ? (
        <Text style={styles.noData}>Nenhuma transferência encontrada.</Text>
      ) : (
        <FlatList
          data={transfers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const tipo = item?.tipo_transferencia?.toLowerCase() || "";
            const isEntrada =
              tipo.includes("recebido") || tipo.includes("recebida");
            return (
              <View style={styles.transferItem}>
                <Text
                  style={[styles.valor, { color: isEntrada ? "green" : "red" }]}
                >
                  {isEntrada ? "+" : "-"} {formatCurrency(item.valor)}
                </Text>
                <Text>{item.tipo_transferencia}</Text>
                <Text>{item.descricao || "Sem descrição"}</Text>
                <Text>
                  {new Date(item.data_transferencia).toLocaleString()}
                </Text>
                <Text>Status: {item.status}</Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}