import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CounterItem = ({ counterData }) => {
  const { title, status, max_number } = counterData;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.tokensContainer}>
          <Icon
            name="ticket"
            size={18}
            color="blue"
            style={styles.ticketIcon}
          />
          <Text style={styles.max_number}>{max_number}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.status}>{status}</Text>
      </View>
    </View>
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
  ticketIcon: {
    marginRight: 6,
  },
  max_number: {
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
