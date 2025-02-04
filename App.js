import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

// Customer Pages
import EnterNamePage from './pages/customer/EnterNamePage.js';
import CompleteOrderPage from './pages/customer/CompleteOrderPage.js';
import CustomerMenuPage from './pages/customer/CustomerMenuPage.js';

// Restaurant Pages
import OrderQueuePage from './pages/restaurant/OrderQueuePage.js'
import tablePage from './pages/restaurant/tablePage.js'


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
      initialRouteName='OrderQueuePage'
      screenOptions={{
        headerShown: false, // headerMode="none" is deprecated so don't use that
      }}>
        {/* Restaurant Pages */}
        <Screen name="OrderQueuePage" component={OrderQueuePage} />
        <Screen name="tablePage" component={tablePage} />

        {/* Customer Pages */}
        <Screen name="EnterNamePage" component={EnterNamePage} />
        <Screen name="CompleteOrderPage" component={CompleteOrderPage} />
        <Screen name="CustomerMenuPage" component={CustomerMenuPage} />
      </Navigator>
    </NavigationContainer>
  );
}
