import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { logout } from "../../Services/auth";

// Define the VendorSettings component
function VendorSettings({ navigation }) {
  // Define the items and their icons
  const items = [
    { text: "My Counters", icon: "navicon" },
    { text: "Profile Settings", icon: "cogs" },
    { text: "Logout", icon: "sign-out" },
  ];

  // Handle item press
  const handleItemPress = (itemText) => {
    console.log(itemText);
    if (itemText === "Logout") {
      handleLogout();
    } else {
      // Handle other item press actions
    }
  };

  // Handle logout action
  const handleLogout = async () => {
    await logout();
    navigation.navigate("AuthStack");
  };

  // Render each item as a list item
  // Render each item as a list item
  const renderItems = () => {
    return items.map((item, index) => (
      <View key={index}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleItemPress(item.text)}
        >
          <Icon name={item.icon} style={styles.icon} />
          <Text style={styles.text}>{item.text}</Text>
        </TouchableOpacity>
        {index !== items.length - 1 && <View style={styles.separator} />}
      </View>
    ));
  };

  // Return the JSX element
  return <View style={styles.container}>{renderItems()}</View>;
}

// Define the component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

// Export the component
export default VendorSettings;
