import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  View,
  Text,
} from "react-native";
import styles from "../../Stylels";
import {
  getCurrentUser,
  getData,
  logout,
  storeData,
} from "../../Services/auth";
import CounterItem from "../../Components/CounterItem";
import Icon from "react-native-vector-icons/FontAwesome";
import Heading from "../../Components/Header";
import { getVendorCounters } from "../../Services/model";
import IconInfo from "../../Components/IconsInfo";

const MAX_TOKEN_DISPLAY = 3;

export default function Home({ navigation }) {
  const [recentCounters, setRecentCounters] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("VendorSettings")}>
          <Icon name="gear" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchData = async (fresh_data = false) => {
    const currentUser = await getCurrentUser();

    if (fresh_data) {
      const { data: couter_data } = await getVendorCounters(
        currentUser.ID,
        "open"
      );
      await storeData("vendor_counters", couter_data.data.counters);
      setRecentCounters(couter_data.data.counters);
    } else {
      const counters = await getData("vendor_counters");
      setRecentCounters(counters.slice(0, MAX_TOKEN_DISPLAY));
    }
  };

  const handleGetTokenPress = () => {
    navigation.navigate("GetToken");
  };

  const handleCounterItemPress = (counterData) => {
    navigation.navigate("CounterTokens", { counterData });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData(true);
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <SafeAreaView style={styles.screenContainer}>
        <TouchableOpacity
          onPress={handleGetTokenPress}
          style={styles.iconContainer}
        >
          <Icon
            name="repeat"
            size={98}
            color="blue"
            style={styles.ticketIcon}
          />
          <Text>Get Token</Text>
        </TouchableOpacity>

        {recentCounters.length > 0 && (
          <View style={styles.recentCountersContainer}>
            <Heading>Open Counters</Heading>

            {recentCounters.map((counterData, index) => (
              <CounterItem
                counterData={counterData}
                onPress={handleCounterItemPress}
                key={index}
              />
            ))}

            <IconInfo />
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
