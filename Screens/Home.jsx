import React from "react";
import { Text, SafeAreaView, StyleSheet, Button } from "react-native";
import styles from "../Stylels";
import { logout } from "../Services/auth";

export default function Home({ route, navigation }) {
  const { User, onLogout } = route.params;
  console.log(User);
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome {User.data.user_email}</Text>
      <Button title="Logout" onPress={onLogout} />
    </SafeAreaView>
  );
}
