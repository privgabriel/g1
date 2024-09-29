import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./src/screens/HomeScreen";
import UserDetailsScreen from "./src/screens/UserDetailsScreen";
import AboutScreen from "./src/screens/AboutScreen";
import AddUserScreen from "./src/screens/AddUserScreen";
import EditUsersScreen from "./src/screens/EditUsersScreen";

// Criando o Drawer Navigator
const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                {/* Mantendo apenas o HomeScreen como Home */}
                <Drawer.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Icon name="home-outline" color={color} size={size} />
                        ),
                        drawerLabel: "Início",
                    }}
                />
                {/* Demais rotas */}
                <Drawer.Screen
                    name="About"
                    component={AboutScreen}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Icon name="information-circle-outline" color={color} size={size} />
                        ),
                        drawerLabel: "Sobre",
                    }}
                />
                <Drawer.Screen
                    name="Add New User"
                    component={AddUserScreen}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Icon name="person-add-outline" color={color} size={size} />
                        ),
                        drawerLabel: "Adicionar Usuário",
                    }}
                />
                <Drawer.Screen
                    name="Edit Users"
                    component={EditUsersScreen}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Icon name="pencil-outline" color={color} size={size} />
                        ),
                        drawerLabel: "Editar Usuários",
                    }}
                />
                <Drawer.Screen
                    name="User Details"
                    component={UserDetailsScreen}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Icon name="information-outline" color={color} size={size} />
                        ),
                        drawerLabel: "Detalhes do Usuário",
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default App;
