import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./Stacks/AuthStack";
import VendorStack from "./Stacks/VendorStack";
import UserStack from "./Stacks/UserStack"; // Import the UserStack component
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { get_user_role } from "./Services/helper";

const Stack = createNativeStackNavigator();

function AppContainer({ User }) {
  const [Role, setRole] = useState("");

  useEffect(() => {
    if (User) {
      const role = get_user_role(User);
      setRole(role);
    }
  }, []);

  if (!User) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VendorStack"
            component={VendorStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserStack"
            component={UserStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {Role === "vendor" ? (
          <>
            <Stack.Screen
              name="VendorStack"
              component={VendorStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="UserStack"
              component={UserStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
