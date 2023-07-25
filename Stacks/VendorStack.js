import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeVendor from "../Screens/Vendorzz/HomeVendor";
import CreateNewCounter from "../Screens/Vendorzz/CreateCounter";
import CounterDetail from "../Screens/Vendorzz/CounterDetail";
import CounterTokens from "../Screens/Vendorzz/CounterTokens";
import VendorSettings from "../Screens/Settings/VendorSettings";
import VendorCounters from "../Screens/Vendorzz/VendorCounters";

const Stack = createNativeStackNavigator();

export default function VendorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeVendor"
        component={HomeVendor}
        options={{ title: "Welcome Vendor", headerBackVisible: false }}
      />
      <Stack.Screen
        name="CreateNewCounter"
        component={CreateNewCounter}
        options={{
          title: "Create A Counter",
        }}
      />
      <Stack.Screen
        name="CounterDetail"
        component={CounterDetail}
        options={{ title: "Counter Details" }}
      />
      <Stack.Screen
        name="CounterTokens"
        component={CounterTokens}
        options={{ title: "Tokens Manager" }}
      />
      <Stack.Screen
        name="VendorSettings"
        component={VendorSettings}
        options={{ title: "Settings" }}
      />
      <Stack.Screen
        name="VendorCounters"
        component={VendorCounters}
        options={{ title: "My Counters" }}
      />
    </Stack.Navigator>
  );
}
