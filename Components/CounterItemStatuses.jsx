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

const TokenItemList = ({ icon, color, value, text }) => {
  return (
    <View style={styles.tokenItem}>
      <Icon name={icon} size={18} color={color} style={styles.ticketIcon} />
      <Text style={styles.status_title}>{text}</Text>
      <Text style={styles.status_number}>{value || 0}</Text>
    </View>
  );
};

// Define a component to render the tokens container
const CounterItemStatuses = ({ statuses_stats, layout = "inline" }) => {
  const { served, waiting, reserved, serving } = statuses_stats;

  return (
    <>
      {layout === "inline" && (
        <View style={styles.tokensContainer}>
          <TokenItem icon="check" color="green" value={served} />
          <TokenItem icon="clock-o" color="orange" value={waiting} />
          <TokenItem icon="bookmark" color="blue" value={reserved} />
          <TokenItem icon="play" color="purple" value={serving} />
        </View>
      )}
      {layout === "list" && (
        <View style={styles.tokensContainerList}>
          <TokenItemList
            icon="play"
            color="purple"
            value={serving}
            text="Serving"
          />
          <TokenItemList
            icon="check"
            color="green"
            value={served}
            text="Served"
          />
          <TokenItemList
            icon="clock-o"
            color="orange"
            value={waiting}
            text="Waiting"
          />
          {/* <TokenItemList
            icon="bookmark"
            color="blue"
            value={reserved}
            text="Reserved"
          /> */}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tokensContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  tokensContainerList: {
    flexDirection: "column",
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
  status_title: {
    marginRight: 6,
    fontSize: 22,
  },
  status_number: {
    fontSize: 22,
    color: "#888",
  },
});

export default CounterItemStatuses;
