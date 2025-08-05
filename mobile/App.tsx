import React from "react";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import PerfilScreen from "./src/screens/PerfilScreen";
import ExtratoScreen from "./src/screens/ExtratoScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import TransferenciaScreen from "./src/screens/TransferenciaScreen";
import { useExpoPushToken } from "./src/hooks/useFCMToken";
import { RootStackParamList } from "./src/navigation/types";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useExpoPushToken();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: true}}/>
        <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Athena Bank",
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
              <Ionicons
                name="person-circle-outline"
                size={40}
                color="#228B22"
              style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          )
        })} 
        />
        <Stack.Screen name="Extrato" component={ExtratoScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Transferencia" component={TransferenciaScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Perfil" component={PerfilScreen} options={{headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}