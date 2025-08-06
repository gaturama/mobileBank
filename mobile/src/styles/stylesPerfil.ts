import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    gap: 10,
    backgroundColor: "#EAEAEA" 
},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#228B22",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  botao: {
    backgroundColor: "#228B22",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    width: "100%",
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
  },
});
