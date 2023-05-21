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
import { login } from "../Services/auth";

const Login = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (email && password) {
        const data = { email, password };
        const user = await login(data);
        // console.log(user);
        setIsLoading(false);
        navigation.navigate("Home");
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  const handleForgotPassword = () => {
    // Perform forget password logic here
    if (email) {
      Alert.alert("Success", "Password reset link sent to your email");
    } else {
      Alert.alert("Error", "Please enter your email");
    }
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
        onPress={handleLogin}
        disabled={isLoading}
        style={[styles.button, isLoading && styles.buttonDisabled]}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
