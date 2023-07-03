import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "../Stylels";
import { createAccount } from "../Services/model";

const Signup = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      if (email && password) {
        const data = { email, password };
        const user = await createAccount(data);
        // console.log(user);
        setIsLoading(false);
        navigation.navigate("Home");
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  const navigateLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={handleSignup}
        disabled={isLoading}
        style={[styles.button, isLoading && styles.buttonDisabled]}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateLogin}>
        <Text style={styles.forgotPassword}>Login here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
