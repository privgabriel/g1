import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

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

            <Text style={styles.label}>Cidade</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={newUser.city}
                    onValueChange={(itemValue) => setNewUser({ ...newUser, city: itemValue })}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione a cidade" value="" />
                    <Picker.Item label="Santa Maria" value="Santa Maria" />
                    <Picker.Item label="Porto Alegre" value="Porto Alegre" />
                    <Picker.Item label="Florianópolis" value="Florianópolis" />
                    <Picker.Item label="Curitiba" value="Curitiba" />
                </Picker>
            </View>

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
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: "#333",
    },
    pickerContainer: {
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    picker: {
        height: 50,
        color: "#333",
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
