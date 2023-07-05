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

export default function HomeVendor({ navigation }) {
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
      const { data: couter_data } = await getVendorCounters(currentUser.ID);
      await storeData("vendor_counters", couter_data.data.counters);
      setRecentCounters(couter_data.data.counters);
    } else {
      const counters = await getData("vendor_counters");
      setRecentCounters(counters.slice(0, MAX_TOKEN_DISPLAY));
    }
  };

  const handleIconPress = () => {
    navigation.navigate("CreateNewCounter");
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
          onPress={handleIconPress}
          style={styles.iconContainer}
        >
          <Icon
            name="plus-circle"
            size={98}
            color="blue"
            style={styles.ticketIcon}
          />
        </TouchableOpacity>
        <Heading>Open Counters</Heading>

        {recentCounters.map((counterData, index) => (
          <CounterItem
            counterData={counterData}
            onPress={handleCounterItemPress}
            key={index}
          />
        ))}

        <IconInfo />
      </SafeAreaView>
    </ScrollView>
  );
}
