import {View, Text} from 'react-native';
import React, {useState} from 'react';
import WifiScanning from '../components/WifiScanning';
import SSIDAuthenticateModel from '../components/SSIDAuthenticateModel';

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
  const [openModel, setOpenModel] = useState(true);
  const [selectedWifi, setSelectedWifi] = useState({ssid: '', pass: ''});
  return (
    <View>
      <WifiScanning
        wifiList={wifiList}
        clickEvent={index => {
          setSelectedWifi({...selectedWifi, ssid: wifiList[index]?.ssid});
          setOpenModel(true);
        }}
      />
      {openModel && (
        <SSIDAuthenticateModel
          wifi={selectedWifi}
          okEvent={pass => {
            setSelectedWifi({...selectedWifi, pass});
            setOpenModel(false);
          }}
          cancelEvent={() => setOpenModel(false)}
        />
      )}
    </View>
  );
}
