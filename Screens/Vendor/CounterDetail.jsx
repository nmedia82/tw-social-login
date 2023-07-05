import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const CounterDetail = ({ route }) => {
  const { counterData } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  const data = [
    { label: "Title", value: counterData.title },
    { label: "Status", value: counterData.status },
    { label: "Max Tokens", value: counterData.max_number },
    { label: "Current Token", value: counterData.current_number },
    { label: "Date Created", value: counterData.created_date },
    // Add more details as needed
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  value: {
    fontSize: 16,
    flex: 2,
  },
});

export default CounterDetail;
