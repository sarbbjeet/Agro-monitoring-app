import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import {SafeAreaView} from 'react-native';
import {navheaderFont} from '../constants/theme';
import AppDrawerNavigator from './AppDrawerNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigationSatck() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: navheaderFont.backgroundColor,
          },
          headerTintColor: navheaderFont.fontColor,
          headerTitleStyle: {
            fontSize: navheaderFont.fontSize,
            fontWeight: navheaderFont.fontWeight,
          },
        }}>
        <Stack.Screen
          name="drawer"
          component={AppDrawerNavigator}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen name="Home" component={Home} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
