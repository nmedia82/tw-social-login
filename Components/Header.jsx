import React from "react";
import { Text, StyleSheet } from "react-native";

const Heading = ({ children }) => {
  return <Text style={styles.heading}>{children}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default Heading;
