import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { logout } from "../../Services/auth";
import { ListItem } from "react-native-elements";

// Define the VendorSettings component
function UserSettings({ navigation }) {
  // Define the items and their icons
  const items = [
    { title: "My Tokens", icon: "av-timer" },
    { title: "Profile Settings", icon: "av-timer" },
    { title: "Logout", icon: "av-timer" },
  ];

  // Handle item press
  const handleItemPress = (itemText) => {
    if (itemText === "Logout") {
      handleLogout();
    } else if (itemText === "My Tokens") {
      navigation.navigate("VendorCounters");
    }
  };

  // Handle logout action
  const handleLogout = async () => {
    await logout();
    navigation.navigate("AuthStack");
  };

  // Return the JSX element
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <ListItem key={index} bottomDivider>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleItemPress(item.title)}
          >
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
          </TouchableOpacity>
        </ListItem>
      ))}
    </View>
  );
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
export default UserSettings;
