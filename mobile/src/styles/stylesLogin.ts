import { StyleSheet } from 'react-native';

export 
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