import 'react-native-gesture-handler';
import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnBoarding from './app/screens/OnBoarding/OnBoarding';
import CarOnBoarding from './app/screens/OnBoarding/CarOnBoarding';

const Stack = createStackNavigator();
// constants
import { images, theme } from "./app/constants";
const { onboarding1, onboarding2, onboarding3 } = images;

// theme
const { COLORS, FONTS, SIZES } = theme;

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='OnBoarding' component={CarOnBoarding}
          options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

export default App;