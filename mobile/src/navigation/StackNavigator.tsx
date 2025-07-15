import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "./types";
import ExtratoScreen from "../screens/ExtratoScreen";
import TransferenciaScreen from "../screens/TransferenciaScreen";
import PerfilScreen from "../screens/PerfilScreen";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={({ navigation }) => ({
        title: "Athena Bank",
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
            <Ionicons name="person-circle-outline" size={28} color="#353E67" style={{ marginRight: 15}}/>
          </TouchableOpacity>
        )
      })}
      />
      <Stack.Screen name="Extrato" component={ExtratoScreen} />
      <Stack.Screen name="Transferencia" component={TransferenciaScreen} />
      <Stack.Screen name="Perfil" component={PerfilScreen} />
    </Stack.Navigator>
  );
}