import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Define a component to render a single token item
const TokenItem = ({ icon, color, value }) => {
  return (
    <View style={styles.tokenItem}>
      <Icon name={icon} size={18} color={color} style={styles.ticketIcon} />
      <Text style={styles.status_number}>{value || 0}</Text>
    </View>
  );
};

// Define a component to render the tokens container
const CounterItemStatuses = ({ statuses_stats }) => {
  const { served, waiting, reserved, serving } = statuses_stats;

  return (
    <View style={styles.tokensContainer}>
      <TokenItem icon="check" color="green" value={served} />
      <TokenItem icon="clock-o" color="orange" value={waiting} />
      <TokenItem icon="bookmark" color="blue" value={reserved} />
      <TokenItem icon="play" color="purple" value={serving} />
    </View>
  );
};

const styles = StyleSheet.create({
  tokensContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  tokenItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  ticketIcon: {
    marginRight: 6,
  },
  status_number: {
    fontSize: 14,
    color: "#888",
  },
});

export default CounterItemStatuses;
