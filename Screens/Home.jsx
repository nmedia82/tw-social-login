import React from "react";
import { Text, SafeAreaView, StyleSheet, Button } from "react-native";
import styles from "../Stylels";
import { getCurrentUser, logout } from "../Services/auth";

const User = getCurrentUser();

export default function Home({ navigation }) {
  // const { User } = route.params;
  console.log(User);
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome {User.data.user_email}</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
    </SafeAreaView>
  );
}
