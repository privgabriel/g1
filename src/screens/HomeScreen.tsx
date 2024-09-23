import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, TextInput, Modal, Alert } from "react-native";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native"; // Importar useIsFocused
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";

type User = {
  id: number;
  name: string;
  email: string;
};

const HomeScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editingUser, setEditingUser] = useState<User | null>(null); // Estado para controlar o usuário sendo editado
  const [addModalVisible, setAddModalVisible] = useState(false); // Controle do modal para adicionar
  const [editModalVisible, setEditModalVisible] = useState(false); // Controle do modal para editar

  const isFocused = useIsFocused(); // Hook para verificar se a tela está focada

  // Função para buscar os usuários da API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://192.168.100.6:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // Executa o fetchUsers quando a tela estiver focada
  useEffect(() => {
    if (isFocused) {
      fetchUsers(); // Busca os usuários toda vez que a tela é focada
    }
  }, [isFocused]);

  // Função para adicionar um novo usuário
  const addUser = async () => {
    if (newUser.name === "" || newUser.email === "") {
      Alert.alert("Erro", "Nome e email são obrigatórios.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.100.6:3000/users", newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]); // Adiciona o novo usuário na lista
      setNewUser({ name: "", email: "" }); // Reseta os campos do modal
      setAddModalVisible(false); // Fecha o modal
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
      Alert.alert("Erro", "Não foi possível adicionar o usuário.");
    }
  };

  // Função para remover um usuário
  const removeUser = async (id: number) => {
    try {
      await axios.delete(`http://192.168.100.6:3000/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Remove o usuário da lista
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
      Alert.alert("Erro", "Não foi possível remover o usuário.");
    }
  };

  // Função para iniciar a edição de um usuário
  const startEditUser = (user: User) => {
    setEditingUser(user);
    setEditModalVisible(true); // Abre o modal de edição
  };

  // Função para salvar as edições do usuário
  const editUser = async () => {
    if (editingUser && (editingUser.name === "" || editingUser.email === "")) {
      Alert.alert("Erro", "Nome e email são obrigatórios.");
      return;
    }

    try {
      if (editingUser) {
        await axios.put(`http://192.168.100.6:3000/users/${editingUser.id}`, editingUser);
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === editingUser.id ? editingUser : user
            )
        );
        setEditModalVisible(false); // Fecha o modal de edição
      }
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      Alert.alert("Erro", "Não foi possível editar o usuário.");
    }
  };

  return (
      <View style={styles.container}>
        <Header />

        {/* Botão minimalista para abrir modal de adicionar novo usuário */}
        <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
          <Text style={styles.addButtonText}>Adicionar Usuário</Text>
        </TouchableOpacity>

        <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.userContainer}>
                  <UserCard id={item.id} name={item.name} email={item.email} />
                  <View style={styles.buttonContainer}>
                    {/* Botão minimalista para editar */}
                    <TouchableOpacity style={styles.editButton} onPress={() => startEditUser(item)}>
                      <Text style={styles.editButtonText}>✏️</Text>
                    </TouchableOpacity>

                    {/* Botão minimalista para remover */}
                    <TouchableOpacity style={styles.removeButton} onPress={() => removeUser(item.id)}>
                      <Text style={styles.removeButtonText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            )}
            contentContainerStyle={styles.list}
        />

        {/* Modal para adicionar novo usuário */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={addModalVisible}
            onRequestClose={() => setAddModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Adicionar Usuário</Text>
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
              <TouchableOpacity style={styles.saveButton} onPress={addUser}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setAddModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal para editar usuário */}
        {editingUser && (
            <Modal
                animationType="slide"
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
    backgroundColor: "#fff",
  },
  list: {
    paddingHorizontal: 20,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  editButton: {
    padding: 10,
    marginRight: 10,
  },
  editButtonText: {
    color: "#4CAF50",
    fontSize: 18,
  },
  removeButton: {
    padding: 10,
  },
  removeButtonText: {
    color: "#F44336",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 8,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default HomeScreen;
