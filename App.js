import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getCurrentUser, storeData } from "./Services/auth";
import { useEffect, useState } from "react";
import LoginStack from "./Stacks/LoginStack";
import AuthStack from "./Stacks/AuthStack";
import VendorStack from "./Stacks/VendorStack";
import AppContainer from "./NavContainers";
import { get_user_role } from "./Services/helper";
import { getVendorCounters } from "./Services/model";
// import BusinessStack from "./Stacks/BusinessStack";

// const Stack = createNativeStackNavigator();

const App = () => {
  const [User, setUser] = useState(null);
  const [VendorCounters, setVendorCounters] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      try {
        if (user) {
          setUser(user);
          if ("vendor" === get_user_role(user)) {
            const { data: couter_data } = await getVendorCounters(user.ID);
            await storeData("vendor_counters", couter_data.data.counters);
          }
        }
      } catch (e) {
        console.log("Error while store data:", e.message);
      }
    }
    fetchUser();
  }, []);

  return (
    <SafeAreaProvider>
      <AppContainer User={User} />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
};

export default App;
