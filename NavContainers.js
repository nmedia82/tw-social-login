import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./Stacks/AuthStack";
import VendorStack from "./Stacks/VendorStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
function AppContainer({ User }) {
  return (
    <NavigationContainer>
      {!User ? (
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
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppContainer;
