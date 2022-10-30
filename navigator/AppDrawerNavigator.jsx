import React from 'react';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import Home from '../screens/Home';
import About from '../screens/About';
import Settings from '../screens/Settings';
import CustomDrawer from '../components/CustomDrawer';
import {moderateScale} from '../Scaling';
import {navheaderFont} from '../constants/theme';

const DrawerView = createDrawerNavigator();
export default function AppDrawerNavigator() {
  return (
    <DrawerView.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerTintColor: navheaderFont.fontColor,
        headerStyle: {
          backgroundColor: navheaderFont.backgroundColor,
        },
        headerTitleStyle: {
          fontSize: navheaderFont.fontSize,
          fontFamily: navheaderFont.fontFamily,
        },
      }}>
      <DrawerView.Screen
        name="dHome"
        component={Home}
        options={{title: 'Home'}}
      />
      <DrawerView.Screen
        name="dSettings"
        component={Settings}
        options={{
          title: 'Gateway Settings',
        }}
      />
      <DrawerView.Screen
        name="dAbout"
        component={About}
        options={{
          title: 'About',
        }}
      />
    </DrawerView.Navigator>
  );
}
