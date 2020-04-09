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
        <Stack.Navigator>
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="GameScreen" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
