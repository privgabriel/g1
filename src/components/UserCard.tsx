import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Defina os tipos para a navegação
type RootStackParamList = {
  Home: undefined;
  UserDetails: { userId: number };
};

type UserCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserDetails"
>;

type UserCardProps = {
  id: number;
  name: string;
  email: string;
};

const UserCard: React.FC<UserCardProps> = ({ id, name, email }) => {
  const navigation = useNavigation<UserCardNavigationProp>(); // Aqui tipamos a navegação corretamente

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("UserDetails", { userId: id })} // Agora o TypeScript entende que esse parâmetro é válido
    >
      <View style={styles.card}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f3f3f3",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
});

export default UserCard;