import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import NumberButton from "./components/NumberButton";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import reducer from "./utils/reducers";
import { Provider } from "react-redux";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";

const store = createStore(reducer);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen
            options={{ title: "4x4 Game" }}
            name="Start"
            component={StartScreen}
          />
          <Stack.Screen
            options={{ title: "4x4 Game" }}
            name="GameScreen"
            component={GameScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
