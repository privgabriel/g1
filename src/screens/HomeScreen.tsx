import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, TextInput, Modal, Alert } from "react-native";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";
import Icon from "react-native-vector-icons/Ionicons"; // Adicionando ícones

type User = {
  id: number;
  name: string;
  email: string;
  login: string;
  password: string;
  city: string;
};

const HomeScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ name: "", email: "", login: "", password: "", city: "" });
  const [editingUser, setEditingUser] = useState<User | null>(null); 
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const isFocused = useIsFocused(); 

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://192.168.100.6:3001/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchUsers(); 
    }
  }, [isFocused]);

  const AddNewUser = async () => {
    if (newUser.name === "" || newUser.email === "" || newUser.login === "" || newUser.password === "" || newUser.city === "") {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.100.6:3001/users", newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]); 
      setNewUser({ name: "", email: "", login: "", password: "", city: "" }); 
      setAddModalVisible(false);
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
      Alert.alert("Erro", "Não foi possível adicionar o usuário.");
    }
  };

  const removeUser = async (id: number) => {
    try {
      await axios.delete(`http://192.168.100.6:3001/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
      Alert.alert("Erro", "Não foi possível remover o usuário.");
    }
  };

  const startEditUser = (user: User) => {
    setEditingUser(user);
    setEditModalVisible(true);
  };

  const editUser = async () => {
    if (editingUser && (editingUser.name === "" || editingUser.email === "" || editingUser.login === "" || editingUser.password === "" || editingUser.city === "")) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      if (editingUser) {
        await axios.put(`http://192.168.100.6:3001/users/${editingUser.id}`, editingUser);
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
      
      <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
        <Icon name="add-circle-outline" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Adicionar Usuário</Text>
      </TouchableOpacity>
      
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <UserCard id={item.id} name={item.name} email={item.email} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => startEditUser(item)}>
                <Icon name="pencil-outline" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeUser(item.id)}>
                <Icon name="trash-outline" size={24} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />

      {/* Modal de Adicionar */}
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
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Cidade"
              value={newUser.city}
              onChangeText={(text) => setNewUser({ ...newUser, city: text })}
            />
            <TouchableOpacity style={styles.saveButton} onPress={AddNewUser}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setAddModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Editar */}
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
    backgroundColor: "#FFF",
  },
  list: {
    paddingHorizontal: 20,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    margin: 20,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  editButton: {
    marginRight: 15,
  },
  removeButton: {
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 8,
    fontSize: 16,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#F44336",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default HomeScreen;
