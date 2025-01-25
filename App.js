import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import EnterNamePage from './pages/customer/EnterNamePage.js';
import OrderQueuePage from './pages/restaurant/OrderQueuePage.js'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Navigator 
      initialRouteName='EnterNamePage'
      screenOptions={{
        headerShown: false, // headerMode="none" is deprecated so don't use that
      }}>
        <Screen name="EnterNamePage" component={EnterNamePage} />
        <Screen name="OrderQueuePage" component={OrderQueuePage} />
      </Navigator>
    </NavigationContainer>
  );
}
