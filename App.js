import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import { initialState, appReducers } from "./src/reducers/index";
import { AppStateProvider } from "./src/context/appState";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppStateProvider reducer={appReducers} initialState={initialState}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </AppStateProvider>
    </NavigationContainer>
  );
};

export default App;
