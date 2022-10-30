import {View, Text} from 'react-native';
import React from 'react';
//import {Icon} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMugSaucer} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
// in App.js
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faSquareCheck} from '@fortawesome/free-solid-svg-icons/faSquareCheck';

library.add(fab, faSquareCheck, faMugSaucer);

import WifiManager from 'react-native-wifi-reborn';
import {faAddressBook, faGear} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';

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
    <View>
      <Text>app</Text>
      {/* <Icon name="house" type="font-awesome" size={32} color="#000" /> */}

      <FontAwesomeIcon icon={faEnvelope} size={50} color={'green'} />
    </View>
  );
}
