import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { getCurrentUser, getData, storeData } from "../../Services/auth";
import { openCounter } from "../../Services/model";

const CreateNewCounter = ({ navigation }) => {
  const [User, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [maxTokens, setMaxTokens] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      if (user) {
        setUser(user);
      }
    }
    fetchUser();
  }, []);

  const handleCreateCounter = async () => {
    // Validate input fields here before making the API request
    if (title.trim() === "" || maxTokens.trim() === "") {
      showToast("Please fill in all fields.");
      return;
    }

    const parsedMaxTokens = parseInt(maxTokens.trim());
    if (isNaN(parsedMaxTokens)) {
      showToast("Max Tokens must be a valid number.");
      return;
    }

    const counterData = {
      title: title.trim(),
      max_tokens: parsedMaxTokens,
      user_id: User.ID,
    };

    const { data: new_counter } = await openCounter(counterData);
    if (new_counter.success) {
      navigation.navigate("HomeVendor", {
        newCounterData: new_counter.data.counter,
      });
    }
  };

  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      50
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter counter title"
        style={styles.input}
      />

      <Text style={styles.label}>Max Tokens</Text>
      <TextInput
        value={maxTokens}
        onChangeText={setMaxTokens}
        placeholder="Enter max tokens"
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Create Counter" onPress={handleCreateCounter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});

export default CreateNewCounter;
