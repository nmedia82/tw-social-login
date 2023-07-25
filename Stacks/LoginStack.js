import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../Screens/Profile";
import Login from "../Screens/Login";
import Home from "../Screens/User/Home";
import HomeVendor from "../Screens/Vendorzz/HomeVendor";
import Signup from "../Screens/Signup";
import { get_user_role } from "../Services/helper";
import CreateNewCounter from "../Screens/Vendorzz/CreateCounter";

const Stack = createNativeStackNavigator();

export default function LoginStack({ User }) {
  // const [UserRole, setUserRole] = useState("");
  const [HomePage, setHomePage] = useState({
    name: "Welcome",
    component: Home,
  });

  useEffect(() => {
    if (User) {
      const user_role = get_user_role(User);
      // setUserRole(user_role);
      console.log(user_role);
      if (user_role === "vendor") {
        let home_page = { name: "Welcome Vendor", component: HomeVendor };
        setHomePage(home_page);
      }
    }
  }, [User]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!User ? (
          <>
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
            <Stack.Screen
              name={HomePage.name}
              component={HomePage.component}
              options={{ title: "Home", headerBackVisible: false }}
              initialParams={{ User }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={HomePage.name}
              component={HomePage.component}
              options={{ title: "Home" }}
              initialParams={{ User }}
            />
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
            <Stack.Screen
              name="CreateNewCounter"
              component={CreateNewCounter}
              options={{ title: "Create A Counter" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
