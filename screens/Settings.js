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
import SSIDAuthenticateModel from '../model/SSIDAuthenticateModel';
import * as permissions from 'react-native-permissions';
// you may also import just the functions or constants that you will use from this library
import {request, PERMISSIONS} from 'react-native-permissions';
import {UserContext} from '../context/WIFIGPSContext';
import GpsSelectModel from '../model/GpsModel';
import WifiGPSEnable from '../components/WifiGPSEnable';
import axios from 'axios';
import {useAuth} from '../context/AuthProvider';
// import DeviceInfo from 'react-native-device-info';

export default function Settings({navigation}) {
  const [wifiList, setWifiList] = useState([]);
  const {user} = useAuth();
  const [startRequest, setStartRequest] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedWifi, setSelectedWifi] = useState({
    ssid: '',
    pass: '',
    user_id: '7890',
  });

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
    const asyncLoop = async () => {
      try {
        if (startRequest) {
          //post request
          const res = await axios('http://192.168.4.1/', {
            method: 'POST',
            data: selectedWifi,
          });
          setStartRequest(false);
          console.log('response->', res?.data);
        }
      } catch (err) {
        console.log('error->', err?.message);
      }
    };
    asyncLoop();
  }, [startRequest]);

  useEffect(() => {
    //check when user click on side navigation
    const unsubscribe = navigation.addListener('focus', async () => {
      grantedLocationPermissions(async granted => {
        if (granted) {
          try {
            const list = await WifiManager.loadWifiList();
            // const ssid = await WifiManager.getCurrentWifiSSID();
            setWifiList(list);
          } catch (err) {
            console.log(err.message);
          }
        } else {
          alert('location access permission is not granted');
          // console.log('location access permission is not granted');
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
    <WifiGPSEnable>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <WifiScanning
          wifiList={wifiList}
          clickEvent={index => {
            setSelectedWifi({
              ...selectedWifi,
              ssid: wifiList[index]?.SSID,
              user_id: user?.id,
            });
            console.log('click  me ');
            setOpenModel(true);
          }}
        />
        {openModel && (
          <SSIDAuthenticateModel
            wifi={selectedWifi}
            okEvent={pass => {
              setSelectedWifi({...selectedWifi, pass});
              //http post request
              setStartRequest(true);
              setOpenModel(false);
            }}
            cancelEvent={() => setOpenModel(false)}
          />
        )}
      </ScrollView>
    </WifiGPSEnable>
  );
}
