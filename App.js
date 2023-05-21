import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from "./Screens/Home";
// import Login from "./Screens/Login";
import { getCurrentUser } from "./Services/auth";
import { useEffect, useState } from "react";
import LoginStack from "./Stacks/LoginStack";
import BusinessStack from "./Stacks/BusinessStack";

// const Stack = createNativeStackNavigator();

const App = () => {
  const [User, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      if (user) {
        setUser(user);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <SafeAreaProvider>
      {User ? (
        <BusinessStack User={User} onLogout={() => handleLogout} />
      ) : (
        <LoginStack />
      )}
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
};

export default App;
