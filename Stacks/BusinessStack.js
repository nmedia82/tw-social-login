import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";

const Stack = createNativeStackNavigator();

export default function BusinessStack({ User, onLogout }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
          initialParams={{ User, onLogout }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
