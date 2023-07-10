import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Define a component to render a single token item
const TokenItem = ({ title, value, color }) => {
  return (
    <View style={styles.tokenItem}>
      <Text style={styles.ticketTitle} color={color}>
        {title}
      </Text>
      <Text style={styles.status_number}>{value || 0}</Text>
    </View>
  );
};

// Define a component to render the tokens container
const CounterItemStatusesToken = ({ statuses_stats }) => {
  const { open, waiting, serving } = statuses_stats;

  return (
    <View style={styles.tokensContainer}>
      <TokenItem title={"open"} value={open} color={"green"} />
      <TokenItem title={"serving"} value={serving} color={"green"} />
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
  ticketTitle: {
    marginRight: 6,
  },
  status_number: {
    fontSize: 14,
    color: "#888",
  },
});

export default CounterItemStatusesToken;
