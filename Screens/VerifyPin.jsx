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

const VerifyPin = ({ onVerification }) => {
  const [PinCode, setPinCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.loginContainer}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <TextInput
        placeholder="Enter 4-Digit Pin"
        onChangeText={(text) => setPinCode(text)}
        value={PinCode}
        style={styles.input}
        inputMode="numeric"
      />
      <TouchableOpacity
        onPress={() => onVerification(PinCode)}
        disabled={isLoading}
        style={[styles.button, isLoading && styles.buttonDisabled]}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default VerifyPin;
