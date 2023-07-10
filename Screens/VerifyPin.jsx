import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import styles from "../Stylels";

const VerifyPin = ({ onVerification }) => {
  const [PinCode, setPinCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pinCodeRef = useRef(null);

  useEffect(() => {
    // Focus on the PinCode TextInput when the component mounts
    pinCodeRef.current.focus();
  }, []);

  const handleVerification = () => {
    onVerification(PinCode);
  };

  return (
    <View style={styles.loginContainer}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <TextInput
        ref={pinCodeRef}
        placeholder="Enter 4-Digit Pin"
        onChangeText={(text) => setPinCode(text)}
        value={PinCode}
        style={styles.input}
        inputMode="numeric"
      />
      <TouchableOpacity
        onPress={handleVerification}
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
