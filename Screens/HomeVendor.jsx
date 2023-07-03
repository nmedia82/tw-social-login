import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import styles from "../Stylels";
import { getCurrentUser, getData, logout } from "../Services/auth";
import CounterItem from "../Components/CounterItem";
import Icon from "react-native-vector-icons/FontAwesome";
import Heading from "./../Components/Header";

export default function HomeVendor({ navigation, route }) {
  const [User, setUser] = useState({});
  const [RecentCounters, setRecentCounters] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon name="sign-out" size={24} color="black" onPress={handleLogout} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    // if redirected from create new counter
    // if (route.params.newCounterData) {
    //   const new_counter = route.params.newCounterData;
    //   const recent_counters = [...RecentCounters, new_counter];
    //   console.log("new", recent_counters);
    //   setRecentCounters(recent_counters);
    // }

    async function fetchData() {
      const user = await getCurrentUser();
      if (user) {
        setUser(user);
      }

      const counters = await getData("vendor_counters");
      // console.log(counters);
      setRecentCounters(counters);
    }

    fetchData();

    const backAction = () => {
      // Do nothing when back button is pressed
      alert("Not allowed");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  }, [route]);

  const handleLogout = async () => {
    await logout();
    // navigation.navigate("Login");
    navigation.navigate("AuthStack");
  };

  const handleIconPress = () => {
    // Handle the icon press event here
    navigation.navigate("CreateNewCounter");
  };

  const fakeCounter = {
    title: "Morning July 3",
    status: "closed",
    totalTokens: 44,
    openDate: "July 3, 2003",
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
      <TouchableOpacity onPress={handleIconPress} style={styles.iconContainer}>
        <Icon
          name="plus-circle"
          size={98}
          color="blue"
          style={styles.ticketIcon}
        />
      </TouchableOpacity>
      <Heading>Recent Counters</Heading>
      {RecentCounters.slice(0, 5).map((counterData, index) => (
        <CounterItem key={index} counterData={counterData} />
      ))}
    </SafeAreaView>
  );
}
