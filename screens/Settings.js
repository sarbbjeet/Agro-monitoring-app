import {View, Text} from 'react-native';
import React from 'react';
import WifiScanning from '../components/WifiScanning';

const wifiList = [
  {
    ssid: 'nokia phone',
    mac: '72:32:ad:78:ad',
  },
  {
    ssid: 'my phone',
    mac: 'ad:32:fd:38:ad',
  },
  {
    ssid: 'my phone',
    mac: 'ad:32:fd:38:ad',
  },
  {
    ssid: 'my phone',
    mac: 'ad:32:fd:38:ad',
  },
  {
    ssid: 'my phone',
    mac: 'ad:32:fd:38:ad',
  },
  {
    ssid: 'my phone',
    mac: 'ad:32:fd:38:ad',
  },
  {
    ssid: 'my phone',
    mac: 'ad:32:fd:38:ad',
  },
  {
    ssid: 'my phone',
    mac: 'ad:32:fd:38:ad',
  },
  {
    ssid: 'my phone',
    mac: 'ad:32:fd:38:ad',
  },
  {
    ssid: 'my phone',
    mac: 'ad:32:fd:38:ad',
  },

  {
    ssid: 'my phone',
    mac: 'ad:32:fd:38:ad',
  },
  {
    ssid: 'my phone',
    mac: 'ad:32:fd:38:ad',
  },

  {
    ssid: 'my phone',
    mac: 'ad:32:fd:38:ad',
  },
  {
    ssid: 'my phone',
    mac: 'ad:32:fd:38:ad',
  },
];
export default function Settings() {
  return (
    <View>
      <WifiScanning wifiList={wifiList} />
    </View>
  );
}
