import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons"; // Importando os ícones
import HomeScreen from "./src/screens/HomeScreen";
import UserDetailsScreen from "./src/screens/UserDetailsScreen";
import AboutScreen from "./src/screens/AboutScreen";
import AddUserScreen from "./src/screens/AddUserScreen";
import EditUserScreen from "./src/screens/EditUsersScreen";
import EditUsersScreen from "./src/screens/EditUsersScreen";

// Definindo os parâmetros que as telas esperam
type RootStackParamList = {
    Home: undefined;
    UserDetails: { userId: number };
    Tabs: undefined;
};

// Criando o Tab Navigator
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home-outline" color={color} size={size} />
                    ),
                    tabBarLabel: "Início", // Altera o label se necessário
                }}
            />
            <Tab.Screen
                name="AboutTab"
                component={AboutScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="information-circle-outline" color={color} size={size} />
                    ),
                    tabBarLabel: "Sobre",
                }}
            />
        </Tab.Navigator>
    );
};

// Criando o Stack Navigator para as telas Home e UserDetails
const Stack = createStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Tabs">
            <Stack.Screen
                name="Tabs"
                component={TabNavigator}
                options={{ headerShown: false }} // Oculta o header da navegação por tabs
            />
            <Stack.Screen
                name="UserDetails"
                component={UserDetailsScreen}
                options={{ title: "Detalhes do Usuário" }} // Mostra o título na tela de detalhes
            />
        </Stack.Navigator>
    );
};

// Criando o Drawer Navigator para Home e About
const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeStackNavigator} />
                <Drawer.Screen name="About" component={AboutScreen} />
                <Drawer.Screen name="Add New User" component={AddUserScreen} />
                <Drawer.Screen name="Edit Users" component={EditUsersScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default App;
