import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ExtratoScreen from "../screens/ExtratoScreen";
import TransferenciaScreen from "../screens/TransferenciaScreen";
import PerfilScreen from "../screens/PerfilScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
        screenOptions={({ route}) => ({
            tabBarActiveTintColor: "#353E67",
            tabBarInactiveTintColor: "#A9A9A9",
            tabBarStyle: { backgroundColor:"#f2f2f2" },
            headerShown: false,
            tabBarIcon: ({ color, size}) => {
                let iconName = "home";

                if (route.name === "Transferencia") {
                    iconName = "swap-horizontal";
                } else if (route.name === "Extrato") {
                    iconName = "list";
                } else if (route.name === "Perfil") {
                    iconName = "person";
                }
                return <Ionicons name={iconName as any} size={size} color={color} />;        
            },
        })}
        >
        {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
        <Tab.Screen name="Extrato" component={ExtratoScreen} />
        <Tab.Screen name="Transferencia" component={TransferenciaScreen} />
        <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );
}