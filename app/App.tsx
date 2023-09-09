import React from "react";
import Home from "../src/screens/home"
import FoodScanner from "../src/screens/FoodScanner";
import Food from "../src/screens/Food";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

function App(): JSX.Element {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Food"
          component={Food}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FoodScanner"
          component={FoodScanner}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
