import { StyleSheet } from 'react-native';

export 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#EAEAEA",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    alignSelf: "center",
    color: "#228B22",
  },
  saldo: {
    fontSize: 20,
    marginBottom: 20,
    alignSelf: "center",
    color: "#228B22",
    flexDirection: "row",
    gap: 10,
  },
  token: { fontWeight: "bold" },
  tokenValue: { fontSize: 12, color: "gray" },
  botao: {
    backgroundColor: "#228B22",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    width: "90%"
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
    alignSelf: "center",
  },
});