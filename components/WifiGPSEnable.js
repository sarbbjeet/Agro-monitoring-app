import {View, Text, Linking} from 'react-native';
import React, {useContext} from 'react';
import {UserContext} from '../context/WIFIGPSContext';
import GpsSelectModel from '../model/GpsModel';
import GpsModel from '../model/GpsModel';
import WIFIModel from '../model/WIFIModel';

//open location turn on/off selection option
const locationSetting = () =>
  Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
//open wifi turn on/off selection option
const wifiSetting = () => Linking.sendIntent('android.settings.WIFI_SETTINGS');
//open app settings selection options
const appSettings = () => Linking.openSettings();

export default function WifiGPSEnable({children}) {
  const {wifi, gps} = useContext(UserContext); //get wifi and gps state of the device

  return (
    <View className="flex-1">
      {!gps && <GpsModel ok={locationSetting} />}
      {gps && !wifi && <WIFIModel ok={wifiSetting} />}
      {gps && wifi && <Text>both on</Text>}
    </View>
  );
}
