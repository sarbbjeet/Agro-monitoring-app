import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Platform,
  PermissionsAndroid,
  NativeModules,
  Linking,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import WifiManager from 'react-native-wifi-reborn';

import WifiScanning from '../components/WifiScanning';
import SSIDAuthenticateModel from '../components/SSIDAuthenticateModel';
import * as permissions from 'react-native-permissions';
// you may also import just the functions or constants that you will use from this library
import {request, PERMISSIONS} from 'react-native-permissions';
import {UserContext} from '../context/WIFIGPSContext';
// import DeviceInfo from 'react-native-device-info';

export default function Settings({navigation}) {
  const [wifiList, setWifiList] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedWifi, setSelectedWifi] = useState({ssid: '', pass: ''});
  const {wifi, gps} = useContext(UserContext); //get wifi and gps state of the device

  const grantedLocationPermissions = async cb => {
    if (Platform.OS === 'android') {
      //const osVersion = await DeviceInfo?.getApiLevel();
      // const osVersion = await DeviceInfo.getApiLevel();
      // if (osVersion < 31) {
      //   const granted = await PermissionsAndroid.request(
      //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      //     {
      //       title: 'Location Permission',
      //       message: 'To scan nearby wifi devices',
      //       buttonNeutral: 'Ask Me Later',
      //       buttonNegative: 'Cancel',
      //       buttonPositive: 'OK',
      //     },
      //   );
      //   cb(granted === PermissionsAndroid.RESULTS.GRANTED);
      // } else {
      const result = await permissions.requestMultiple([
        // PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        // PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]);

      const isGranted =
        // result['android.permission.BLUETOOTH_CONNECT'] ===
        //   PermissionsAndroid.RESULTS.GRANTED &&
        // result['android.permission.BLUETOOTH_SCAN'] ===
        //   PermissionsAndroid.RESULTS.GRANTED &&
        result['android.permission.ACCESS_FINE_LOCATION'] ===
        PermissionsAndroid.RESULTS.GRANTED;
      cb(isGranted);
      // }
    } else {
      cb(true);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      console.log('wifi is =', wifi);
      console.log('gps is =', gps);
      grantedLocationPermissions(async granted => {
        if (granted) {
          try {
            //ConnectivityStatus.toggleGpsButton();
            // await Linking.sendIntent('android.settings.WIFI_SETTINGS');
            // await Linking.sendIntent(
            //   'android.settings.LOCATION_SOURCE_SETTINGS',
            // );
            const list = await WifiManager.loadWifiList();
            console.log(list);
          } catch (err) {
            console.log(err.message);
            // Linking.openSettings();
          }
        } else {
          console.log('location access permission is not granted');
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //load list again
    WifiManager.loadWifiList().then(list => {
      setWifiList(list);
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <WifiScanning
        wifiList={wifiList}
        clickEvent={index => {
          setSelectedWifi({...selectedWifi, ssid: wifiList[index]?.SSID});
          console.log('click  me ');
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
      {/* </View> */}
    </ScrollView>
  );
}
