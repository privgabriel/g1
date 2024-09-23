import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios"; // Importando o axios

const RegisterScreen = () => {
    // Estado para armazenar os dados do novo usuário
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        login: "",
        password: "",
        city: "",
    });

    // Função para adicionar um novo usuário
    const addUser = async () => {
        if (newUser.name === "" || newUser.email === "" || newUser.login === "" || newUser.password === "" || newUser.city === "") {
            Alert.alert("Erro", "Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await axios.post("http://192.168.100.6:3000/users", newUser);
            // Se a requisição for bem-sucedida, exibe uma mensagem de sucesso
            Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");

            // Limpa os campos do formulário
            setNewUser({
                name: "",
                email: "",
                login: "",
                password: "",
                city: "",
            });
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
            Alert.alert("Erro", "Não foi possível adicionar o usuário.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Usuário</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={newUser.name}
                onChangeText={(text) => setNewUser({ ...newUser, name: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={newUser.email}
                onChangeText={(text) => setNewUser({ ...newUser, email: text })}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Login"
                value={newUser.login}
                onChangeText={(text) => setNewUser({ ...newUser, login: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={newUser.password}
                onChangeText={(text) => setNewUser({ ...newUser, password: text })}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Cidade"
                value={newUser.city}
                onChangeText={(text) => setNewUser({ ...newUser, city: text })}
            />

            <Button title="Cadastrar" onPress={addUser} />
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

export default RegisterScreen;
