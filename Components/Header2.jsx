import React from "react";
import { Text, StyleSheet } from "react-native";

const Header2 = ({ children }) => {
  return <Text style={styles.heading}>{children}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Header2;
