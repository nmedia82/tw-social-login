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
import { loginByPin, verifyByPin } from "../Services/auth";
import VerifyPin from "./VerifyPin";
import { get_user_role } from "../Services/helper";

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [UserID, setUserID] = useState(null);

  const validatePhoneNumber = (number) => {
    // Regular expression to match international phone number format
    const phoneNumberRegex = /^(?:[0-9] ?){6,14}[0-9]$/;
    return phoneNumberRegex.test(number);
  };

  const handleLogin = async () => {
    setIsLoading(true);

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid international phone number."
      );
      setIsLoading(false);
      return;
    }

    try {
      const postData = { phone_number: phoneNumber };
      const user_id = await loginByPin(postData);
      console.log("userid", user_id);
      setUserID(user_id);
      setIsLoading(false);
      // const stack =
      //   "vendor" === get_user_role(user) ? "VendorStack" : "UserStack";
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: stack }],
      // });
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  const handleVerification = async (pin_code) => {
    setIsLoading(true);
    try {
      const postData = { source: "login", pin_code, user_id: UserID };
      // console.log(postData);
      const user = await verifyByPin(postData);
      setIsLoading(false);
      const stack =
        "vendor" === get_user_role(user) ? "VendorStack" : "UserStack";
      // navigation.navigate(stack);
      navigation.reset({
        index: 0,
        routes: [{ name: stack }],
      });
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  const navigateSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <>
      {!UserID && (
        <View style={styles.loginContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <TextInput
            placeholder="Phone Number (+92300xxxxxxx)"
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
            style={styles.input}
            inputMode="numeric"
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
          {/* <TouchableOpacity onPress={navigateSignup}>
            <Text style={styles.forgotPassword}>Don't have an account?</Text>
          </TouchableOpacity> */}
        </View>
      )}
      {UserID && <VerifyPin onVerification={handleVerification} />}
    </>
  );
};

export default Login;
