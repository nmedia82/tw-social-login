import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  BackHandler,
} from "react-native";
import styles from "../Stylels";
import { getCurrentUser, logout } from "../Services/auth";
import { useEffect, useState } from "react";

export default function Home({ navigation, route }) {
  const [User, setUser] = useState({});

  useEffect(() => {
    const { User } = route.params;
    console.log(User);
    setUser(User);

    const backAction = () => {
      // Do nothing when back button is pressed
      alert("Not allowed");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.title}>Welcome {User.user_email}</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
    </SafeAreaView>
  );
}
