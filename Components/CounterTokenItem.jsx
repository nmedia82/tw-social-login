import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { time_elapsed } from "../Services/helper";

const CounterTokenItem = ({ Token, onTokenStatusUpdate }) => {
  // console.log(Token);
  const { token_no, token_status, token_served_date, token_owner } = Token;
  const { user_name } = token_owner;

  const handleButtonPress = (buttonType) => {
    const newStatusConfig = {
      Serve: "serving",
      Cancel: "open",
      Served: "served",
      "Served/Next": "served_next",
      Reserve: "reserved",
    };
    const newStatus = newStatusConfig[buttonType] || "";
    onTokenStatusUpdate(token_no, token_status, newStatus);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            token_status === "open"
              ? "white" // Use a white color for open tokens
              : token_status === "reserved"
              ? "#ffd591" // Use a light orange color for reserve tokens
              : token_status === "waiting"
              ? "#d9d9d9" // Use a gray color for waiting tokens
              : token_status === "serving"
              ? "#b7eb8f" // Use a green color for serving tokens
              : "#91d5ff", // Use a blue color for served tokens
        },
      ]}
      onPress={() => {}}
    >
      <View style={styles.leftSection}>
        <View style={styles.tokensContainer}>
          <Text style={styles.tokenNumber}>{token_no}</Text>
          <Text> {user_name ? `(${user_name})` : ""}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          {(token_status === "waiting" || token_status === "reserved") && (
            <>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "green" }]}
                onPress={() => handleButtonPress("Serve")}
              >
                <Text style={styles.buttonText}>Serve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "red" }]}
                onPress={() => handleButtonPress("Cancel")}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
          {token_status === "serving" && (
            <>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "green" }]}
                onPress={() => handleButtonPress("Served")}
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "green" }]}
                onPress={() => handleButtonPress("Served/Next")}
              >
                <Text style={styles.buttonText}>{`Done/Next`}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "red" }]}
                onPress={() => handleButtonPress("Cancel")}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
          {token_status === "served" && (
            <Text style={styles.servedDate}>
              {time_elapsed(token_served_date)}
            </Text>
          )}
        </View>
      </View>
      {token_status === "open" && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "black" }]}
          onPress={() => handleButtonPress("Reserve")}
        >
          <Text style={styles.buttonText}>Reserve</Text>
        </TouchableOpacity>
      )}
      <Text
        style={[
          styles.statusText,
          { color: token_status === "open" ? "green" : "gray" },
        ]}
      >
        {token_status}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between", // Use space-between to distribute the items
    alignItems: "flex-start", // Align the items to the top
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
  },
  leftSection: {
    flex: 1,
    marginRight: 12,
  },
  tokensContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  tokenNumber: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "blue",
    color: "white",
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  buttonsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  statusText: {
    fontWeight: "bold",
    alignSelf: "flex-start", // Align the text to the end
    marginTop: 8, // Add some margin to the top
  },
  servedDate: {
    color: "gray",
    fontStyle: "italic",
  },
});

export default CounterTokenItem;
