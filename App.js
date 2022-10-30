import {View, Text} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import WifiManager from 'react-native-wifi-reborn';
import {faHourglass} from '@fortawesome/free-regular-svg-icons';
import MQTTContext from './context/MQTTContext';
import RootNavigationSatck from './navigator/RootNavigationSatck';

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
    // <View>
    //   <Text
    //     style={{fontSize: 30, fontFamily: 'BalooBhai2-Bold'}}
    //     className="flex justify-center items-center text-amber-300">
    //     this is my apped
    //   </Text>
    //   {/* <Icon name="house" type="font-awesome" size={32} color="#000" /> */}
    //   <MQTTContext></MQTTContext>
    //   <FontAwesomeIcon icon={faHourglass} size={50} color={'green'} />
    // </View>
    <>
      <RootNavigationSatck />
    </>
  );
}
