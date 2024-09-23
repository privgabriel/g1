import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";

// Defina os parâmetros esperados pela navegação
type RootStackParamList = {
  Home: undefined;
  UserDetails: { userId: number };
};

// Defina os tipos para as props da tela de detalhes
type UserDetailsScreenRouteProp = RouteProp<RootStackParamList, "UserDetails">;

type UserDetailsScreenProps = {
  route: UserDetailsScreenRouteProp;
};

// Defina o tipo do usuário que você vai buscar
type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
};

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({ route }) => {
  const { userId } = route.params; // Pega o userId dos parâmetros da rota
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ea" />;
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text>Erro ao carregar os dados do usuário.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.detail}>Email: {user.email}</Text>
      <Text style={styles.detail}>Telefone: {user.phone}</Text>
      <Text style={styles.detail}>Website: {user.website}</Text>
      <Text style={styles.detail}>Empresa: {user.company.name}</Text>
      <Text style={styles.detail}>
        Endereço: {user.address.street}, {user.address.suite},{" "}
        {user.address.city}, {user.address.zipcode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserDetailsScreen;