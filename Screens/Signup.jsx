import React, { useDeferredValue, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Switch,
} from "react-native";
import styles from "../Stylels";
import { singup, verifyByPin } from "../Services/auth";
import VerifyPin from "./VerifyPin";
import { get_user_role } from "../Services/helper";

const Signup = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isBusinessType, SetIsBusinessType] = useState("");
  const [BusinessName, setBusinessName] = useState("");
  const [BusinessAddress, setBusinessAddress] = useState("");
  const [UserID, setUserID] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (number) => {
    // Regular expression to match international phone number format
    const phoneNumberRegex = /^(?:[0-9] ?){6,14}[0-9]$/;
    return phoneNumberRegex.test(number);
  };

  const handleSignup = async () => {
    setIsLoading(true);

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid international phone number."
      );
      setIsLoading(false);
      return;
    }

    if (!isEmailValid) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (isBusinessType) {
      if (!BusinessName || !BusinessAddress) {
        Alert.alert("Business Info Missing", "Please enter Business Info");
        setIsLoading(false);
        return;
      }
    }

    try {
      if (phoneNumber && fullName) {
        const data = {
          phone_number: phoneNumber,
          full_name: fullName,
          email,
          is_business: isBusinessType,
          business_name: BusinessName,
          business_address: BusinessAddress,
        };
        const user_id = await singup(data);
        setUserID(user_id);
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  const navigateLogin = () => {
    navigation.navigate("Login");
  };

  const handleVerification = async (pin_code) => {
    setIsLoading(true);
    try {
      const postData = { source: "signup", pin_code, user_id: UserID };
      console.log(postData);
      const user = await verifyByPin(postData);
      console.log(user);
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
          <TextInput
            placeholder="Full Name"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email (optional)"
            onChangeText={(text) => {
              setEmail(text);
              setIsEmailValid(validateEmail(text) || text === ""); // Allow empty string as a valid email
            }}
            value={email}
            style={styles.input}
          />
          <View style={styles.switchContainer}>
            <Text>Business Account?</Text>
            <Switch
              value={isBusinessType === true}
              onValueChange={() =>
                SetIsBusinessType(isBusinessType === true ? false : true)
              }
            />
            <Text>{isBusinessType ? "Yes" : "No"}</Text>
          </View>
          {isBusinessType && (
            <View style={styles.businessInfo}>
              <TextInput
                placeholder="Business Name e.g Noor Clinic"
                onChangeText={(text) => setBusinessName(text)}
                value={BusinessName}
                style={styles.input}
              />
              <TextInput
                placeholder="Business Address"
                onChangeText={(text) => setBusinessAddress(text)}
                value={BusinessAddress}
                style={styles.input}
              />
            </View>
          )}
          <TouchableOpacity
            onPress={handleSignup}
            disabled={isLoading}
            style={[styles.button, isLoading && styles.buttonDisabled]}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Signup</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateLogin}>
            <Text style={styles.forgotPassword}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {UserID && <VerifyPin onVerification={handleVerification} />}
    </>
  );
};

export default Signup;
