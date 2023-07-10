import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CounterItemStatuses from "./CounterItemStatuses";

const TokenItem = ({ tokenData, onTrackToken }) => {
  const { token_no, token_status, counter_id, counter_title } = tokenData;

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.token_no}>{`Token# ${token_no}`}</Text>
        <Text style={styles.business_title}>{counter_title}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text onPress={() => onTrackToken(tokenData)} style={styles.button}>
          Track
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
    width: "100%",
  },
  leftSection: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    width: "100%",
    color: "#fff",
  },
  tokensContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  tokenItem: {
    flexDirection: "row", // Use row direction for each token item
    alignItems: "center",
    marginRight: 12, // Add some margin to the right
  },
  ticketIcon: {
    marginRight: 6,
  },
  status_number: {
    fontSize: 14,
    color: "#888",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  status: {
    fontSize: 16,
    textAlign: "right",
  },
  token_no: {
    fontSize: 26,
  },
});

export default TokenItem;
