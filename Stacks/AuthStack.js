import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Signup" }}
      />
      {/* <Stack.Screen
        name="HomeUser"
        component={Home}
        options={{ title: "Welcome User", headerBackVisible: false }}
      />
      <Stack.Screen
        name="HomeVendor"
        component={HomeVendor}
        options={{ title: "Welcome Vendor", headerBackVisible: false }}
      /> */}
    </Stack.Navigator>
  );
}
