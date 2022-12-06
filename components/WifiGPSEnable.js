import {View, Text, Linking, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import WifiManager from 'react-native-wifi-reborn';
import GpsModel from '../model/GpsModel';
import WIFIModel from '../model/WIFIModel';
import {useWG} from '../context/WGProvider';

//open location turn on/off selection option
const locationSetting = () =>
  Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
//open wifi turn on/off selection option
const wifiSetting = () => Linking.sendIntent('android.settings.WIFI_SETTINGS');
//open app settings selection options
const appSettings = () => Linking.openSettings();

export default function WifiGPSEnable({children, gatewaySSID = 'agri_wifi'}) {
  const {
    settings: {gps, wifi},
    loadCurrentSSID,
    connectedSSID,
  } = useWG(); //get wifi and gps state of the device

  useEffect(() => {
    console.log('wifi', wifi);
    console.log('gps', gps);
  }, [wifi, gps]);

  return (
    <View className="flex-1">
      {!gps && <GpsModel ok={locationSetting} />}
      {gps && !wifi && <WIFIModel ok={wifiSetting} />}
      {gps && wifi && connectedSSID != gatewaySSID && (
        <View className="flex px-2 pt-2">
          <Text className="text-gray-500 mb-2">
            Connect your device with
            <Text className="font-bold"> {gatewaySSID} </Text>access point.
            Please click on the below button after connected with mentioned
            access point.
          </Text>
          <Button
            title="load SSID names list"
            onPress={() => loadCurrentSSID()}></Button>
        </View>
      )}
      {gps && wifi && connectedSSID == gatewaySSID && <>{children}</>}
    </View>
  );
}
