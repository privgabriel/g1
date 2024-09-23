import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { RouteProp, useNavigation } from '@react-navigation/native'; // Importa os tipos para rota
import { StackNavigationProp } from '@react-navigation/stack'; // Para navegação stack

// Definir os tipos para a rota e navegação
type RootStackParamList = {
    EditUser: { userId: number };
};

type EditUserScreenRouteProp = RouteProp<RootStackParamList, 'EditUser'>;
type EditUserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditUser'>;

type Props = {
    route: EditUserScreenRouteProp;
    navigation: EditUserScreenNavigationProp;
};

const EditUserScreen = ({ route, navigation }: Props) => {
    const { userId } = route.params; // Agora `userId` tem um tipo definido

    // Estado para armazenar o usuário que está sendo editado
    const [editingUser, setEditingUser] = useState({
        id: userId,
        name: "",
        email: "",
        login: "",
        password: "",
        city: "",
    });

    // Função para buscar os dados do usuário ao carregar a tela
    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://192.168.100.6:3000/users/${userId}`);
            setEditingUser(response.data); // Atualiza o estado com os dados do usuário
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
        }
    };

    // Função para salvar as edições do usuário
    const editUser = async () => {
        if (editingUser.name === "" || editingUser.email === "") {
            Alert.alert("Erro", "Nome e email são obrigatórios.");
            return;
        }

        try {
            await axios.put(`http://192.168.100.6:3000/users/${editingUser.id}`, editingUser);
            Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
            navigation.goBack(); // Volta para a tela anterior após salvar
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
            Alert.alert("Erro", "Não foi possível editar o usuário.");
        }
    };

    // Chama a função fetchUser para carregar os dados ao montar o componente
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Usuário</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={editingUser.name}
                onChangeText={(text) => setEditingUser({ ...editingUser, name: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={editingUser.email}
                onChangeText={(text) => setEditingUser({ ...editingUser, email: text })}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Login"
                value={editingUser.login}
                onChangeText={(text) => setEditingUser({ ...editingUser, login: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={editingUser.password}
                onChangeText={(text) => setEditingUser({ ...editingUser, password: text })}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Cidade"
                value={editingUser.city}
                onChangeText={(text) => setEditingUser({ ...editingUser, city: text })}
            />

            <Button title="Salvar" onPress={editUser} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default EditUserScreen;
