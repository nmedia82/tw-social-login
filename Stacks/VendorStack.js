import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeVendor from "../Screens/Vendor/HomeVendor";
import CreateNewCounter from "../Screens/Vendor/CreateCounter";
import CounterDetail from "../Screens/Vendor/CounterDetail";
import CounterTokens from "../Screens/Vendor/CounterTokens";
import VendorSettings from "../Screens/Settings/VendorSettings";

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
    </Stack.Navigator>
  );
}
