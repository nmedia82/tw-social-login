import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "../../Stylels";
import { searchVendor } from "../../Services/model";
import Heading from "../../Components/Header";
import CounterItemGetToken from "../../Components/CounterItemGetToken";

const GetToken = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [VendorsFound, setVendorsFound] = useState([]);

  const handleSearch = async () => {
    const { data: results } = await searchVendor(searchText);
    try {
      const { data, success } = results;
      if (!success) {
        setSearchText("");
        return Alert.alert("Error", data.message);
      }
      console.log(data.vendors);
      setVendorsFound(data.vendors);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleSearchButtonPress = () => {
    if (!isLoading) {
      setIsLoading(true);
      handleSearch();
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      {!VendorsFound.length && (
        <View style={styles.searchResults}>
          <TextInput
            placeholder="Search by ID or Name"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={handleSearchButtonPress}
            disabled={isLoading}
            style={[styles.button, isLoading && styles.buttonDisabled]}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={(styles.buttonText, styles.button)}>
                Search Business
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {VendorsFound.length > 0 && (
        <View style={styles.searchResults}>
          <Heading>Results</Heading>
          {VendorsFound.map((vendor) => (
            <View key={vendor.id}>
              <Text>{vendor.business_name}</Text>
              {vendor.counters.map((counter) => (
                <CounterItemGetToken key={counter.id} counterData={counter} />
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default GetToken;
