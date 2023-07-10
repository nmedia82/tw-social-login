import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "../../Stylels";
import { issueToken, searchVendor } from "../../Services/model";
import CounterItemGetToken from "../../Components/CounterItemGetToken";
import Header2 from "../../Components/Header2";
import { getCurrentUser } from "../../Services/auth";

const GetToken = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [VendorsFound, setVendorsFound] = useState([]);
  const [User, setUser] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setUser(user);
    }

    fetchUser();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const { data: results } = await searchVendor(searchText);
      const { data, success } = results;
      if (!success) {
        setSearchText("");
        setIsLoading(false);
        return Alert.alert("Error", data.message);
      }
      //   console.log(data.vendors);
      setVendorsFound(data.vendors);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  const handleIssueToken = async (counter_id) => {
    const postData = { user_id: User.ID, counter_id };
    // console.log(postData);
    try {
      const { data: response } = await issueToken(postData);
      const { data, success } = response;
      if (!success) {
        setSearchText("");
        setIsLoading(false);
        return Alert.alert("Error", data.message);
      }
      setIsLoading(false);
      console.log(data.user_token);
      navigation.navigate("HomeUser", { new_token: data.user_token });
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by ID or Name"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleSearch}
          disabled={isLoading}
          style={[styles.button, isLoading && styles.buttonDisabled]}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Search Business</Text>
          )}
        </TouchableOpacity>
      </View>

      {VendorsFound.length > 0 && (
        <View style={styles.searchResults}>
          <Text>{`${VendorsFound.length} Results`}</Text>
          {VendorsFound.map((vendor) => (
            <View key={vendor.id}>
              <Header2>{vendor.business_name}</Header2>
              {vendor.counters.map((counter) => (
                <CounterItemGetToken
                  key={counter.id}
                  counterData={counter}
                  onTokenIssue={handleIssueToken}
                />
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default GetToken;
