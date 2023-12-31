import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeVendor from "../Screens/Vendorzz/HomeVendor";
import CreateNewCounter from "../Screens/Vendorzz/CreateCounter";
import CounterDetail from "../Screens/Vendorzz/CounterDetail";
import CounterTokens from "../Screens/Vendorzz/CounterTokens";
import VendorSettings from "../Screens/Settings/VendorSettings";
import VendorCounters from "../Screens/Vendorzz/VendorCounters";
import Home from "../Screens/User/Home";
import GetToken from "../Screens/User/GetToken";
import UserSettings from "../Screens/Settings/UserSettings";

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeUser"
        component={Home}
        options={{ title: "Welcome User", headerBackVisible: false }}
      />
      <Stack.Screen
        name="GetToken"
        component={GetToken}
        options={{ title: "Get A Token" }}
      />
      <Stack.Screen
        name="UserSettings"
        component={UserSettings}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
}
