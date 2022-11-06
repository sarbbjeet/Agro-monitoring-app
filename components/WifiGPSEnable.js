import {View, Text, Linking, Button} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import WifiManager from 'react-native-wifi-reborn';
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

export default function WifiGPSEnable({children, gatewaySSID = 'VM9929625'}) {
  const {wifi, gps} = useContext(UserContext); //get wifi and gps state of the device
  const [ssid, setSSID] = useState('');
  const loadCurrentSSID = async () => {
    WifiManager.getCurrentWifiSSID()
      .then(ssid => {
        setSSID(ssid);
      })
      .catch(() => {
        setSSID('');
      });
  };

  useEffect(() => {
    loadCurrentSSID();
  }, []);
  return (
    <View className="flex-1">
      {!gps && <GpsModel ok={locationSetting} />}
      {gps && !wifi && <WIFIModel ok={wifiSetting} />}
      {gps && wifi && ssid != gatewaySSID && (
        <View className="flex px-2 pt-2">
          <Text className="text-gray-500">
            use the
            <Text className="font-bold"> {gatewaySSID} </Text>access point to
            connect to wifi. after joining, please click the link below to load
            the list of SSIDs.
          </Text>
          <Button title="load SSID" onPress={() => loadCurrentSSID()}></Button>
        </View>
      )}
      {gps && wifi && ssid == gatewaySSID && <>{children}</>}
    </View>
  );
}
