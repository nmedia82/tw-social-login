import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeVendor from "../Screens/HomeVendor";
import CreateNewCounter from "../Screens/CreateCounter";

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
    </Stack.Navigator>
  );
}
