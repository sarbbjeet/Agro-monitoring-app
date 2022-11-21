import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import {Button, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {navheaderFont} from '../constants/theme';
import AppDrawerNavigator from './AppDrawerNavigator';
import ScanningField from '../screens/ScanningField';
import FieldSettings from '../screens/FieldSettings';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Authenticate from '../screens/Authenticate';
import {useAuth} from '../context/AuthProvider';
import Splash from '../components/Splash';

const Stack = createNativeStackNavigator();

export default function RootNavigationSatck() {
  const {isAuthenticated, loading} = useAuth();
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
        {!isAuthenticated ? (
          <Stack.Group>
            {loading && (
              <Stack.Screen
                name="splash"
                component={Splash}
                options={{headerShown: false}}
              />
            )}

            <Stack.Screen
              name="login"
              component={Authenticate}
              options={{headerShown: false}}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="drawer"
              component={AppDrawerNavigator}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="field_scanning"
              component={ScanningField}
              options={{title: 'Field Scanning'}}
            />
            <Stack.Screen
              name="field_settings"
              component={FieldSettings}
              options={{
                title: 'Settings',
                // headerLeft: () => (
                //   <TouchableOpacity title="Update count" style={{marginRight: 20}}>
                //     <Text style={{color: 'white'}}>Back</Text>
                //   </TouchableOpacity>
                // ),
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
