import "react-native-gesture-handler";

import moment from "moment";
import "moment/locale/pt-br";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { Provider as StoreProvider } from "react-redux";
import { store } from "../reducers";

import CalendarScreen from "../screens/calendar";
import IndexAppointmentScreen from "../screens/indexAppointment";

moment.locale("pt-br");

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StoreProvider store={store}>
        <PaperProvider>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator>
            <Stack.Screen
              name="Calendar"
              component={CalendarScreen}
              options={CalendarScreen.navigationOptions}
            />
            <Stack.Screen
              name="index-appointment"
              component={IndexAppointmentScreen}
              options={IndexAppointmentScreen.navigationOptions}
            />
          </Stack.Navigator>
        </PaperProvider>
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
