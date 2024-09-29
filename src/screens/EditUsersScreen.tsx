import React, { useState, useCallback } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Modal, FlatList, Alert } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";

type User = {
  id: number;
  name: string;
  email: string;
  login: string;
  password: string;
  city: string;
};

const EditUserScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://192.168.100.6:3001/users");
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados dos usuários.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const startEditUser = (user: User) => {
    setEditingUser(user);
    setEditModalVisible(true);
  };

  const editUser = async () => {
    if (
      !editingUser ||
      editingUser.name === "" ||
      editingUser.email === "" ||
      editingUser.login === "" ||
      editingUser.password === "" ||
      editingUser.city === ""
    ) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      await axios.put(`http://192.168.100.6:3001/users/${editingUser.id}`, editingUser);
      Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
      setEditModalVisible(false);
      fetchUsers(); // Atualiza a lista de usuários após a edição
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      Alert.alert("Erro", "Não foi possível editar o usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar por nome"
        placeholderTextColor="#999"
        value={searchTerm}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItem} onPress={() => startEditUser(item)}>
            <Text style={styles.userName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => <Text style={styles.emptyText}>Nenhum usuário encontrado</Text>}
      />

      {editingUser && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Editar Usuário</Text>
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
                secureTextEntry={true}
              />
              <TextInput
                style={styles.input}
                placeholder="Cidade"
                value={editingUser.city}
                onChangeText={(text) => setEditingUser({ ...editingUser, city: text })}
              />
              <TouchableOpacity style={styles.saveButton} onPress={editUser}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  searchInput: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "#333",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  userItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  userName: {
    fontSize: 18,
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#F44336",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditUserScreen;
