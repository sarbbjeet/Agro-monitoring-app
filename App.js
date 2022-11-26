import {StatusBar} from 'react-native';
import React from 'react';
import WifiManager from 'react-native-wifi-reborn';
import RootNavigationSatck from './navigator/RootNavigationSatck';
import {colors} from './constants/colors';
import WIFIGPSContext from './context/WIFIGPSContext';
import MQTTProvider from './context/MQTTProvider';
import AuthProvider from './context/AuthProvider';
import HttpRequestProvider from './context/HttpRequestProvider';
import NotificationController from './firebase/NotificationController';

// WifiManager.connectToProtectedSSID(ssid, password, isWep).then(
//   () => {
//     console.log('Connected successfully!');
//   },
//   () => {
//     console.log('Connection failed!');
//   },
// );

WifiManager.getCurrentWifiSSID().then(
  ssid => {
    console.log('Your current connected wifi SSID is ' + ssid);
  },
  () => {
    console.log('Cannot get current SSID!');
  },
);
WifiManager.loadWifiList().then(val => {
  console.log(val);
});
export default function App() {
  return (
    <AuthProvider>
      <MQTTProvider>
        <HttpRequestProvider>
          <NotificationController>
            <WIFIGPSContext>
              <StatusBar backgroundColor={colors.primary} />
              <RootNavigationSatck />
            </WIFIGPSContext>
          </NotificationController>
        </HttpRequestProvider>
      </MQTTProvider>
    </AuthProvider>
  );
}
