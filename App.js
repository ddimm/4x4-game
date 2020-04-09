import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import GameScreen from "./components/GameScreen";
import StartScreen from "./components/StartScreen";
import reducer from "./utils/reducers";

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
