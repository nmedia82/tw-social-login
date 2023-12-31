import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CounterItemStatuses from "./CounterItemStatuses";

const CounterItem = ({ counterData, onPress }) => {
  // console.log(counterData);
  const { title, status, statuses_stats } = counterData;

  const handlePress = () => {
    onPress(counterData);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.leftSection}>
        <Text style={styles.title}>{title}</Text>
        <CounterItemStatuses statuses_stats={statuses_stats} />
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.status}>{status}</Text>
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
  },
  leftSection: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
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
    flex: 1,
    marginLeft: 12,
  },
  status: {
    fontSize: 16,
    textAlign: "right",
  },
});

export default CounterItem;
