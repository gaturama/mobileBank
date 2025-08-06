import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    borderRadius: 20,
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