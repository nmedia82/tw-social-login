import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import styles from "../Stylels";
import { login } from "../Services/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (email && password) {
        const data = { email, password };
        const user = await login(data);
        setIsLoading(false);
        // navigation.navigate("HomeVendor", { User: user });
        navigation.navigate("VendorStack");
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  const navigateSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.loginContainer}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
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
      <TouchableOpacity onPress={navigateSignup}>
        <Text style={styles.forgotPassword}>Don't have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
