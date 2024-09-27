import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";

const RegisterScreen = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        login: "",
        password: "",
        city: "",
    });

    const addUser = async () => {
        if (newUser.name === "" || newUser.email === "" || newUser.login === "" || newUser.password === "" || newUser.city === "") {
            Alert.alert("Erro", "Todos os campos são obrigatórios.");
            return;
        }

        try {
            await axios.post("http://192.168.100.6:3001/users", newUser);
            Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
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

            <TouchableOpacity style={styles.button} onPress={addUser}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f4f4f4",
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: "#fff",
        fontSize: 16,
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});

export default RegisterScreen;
