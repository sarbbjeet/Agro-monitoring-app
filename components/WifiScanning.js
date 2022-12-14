import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../constants/colors';
import {moderateScale} from '../Scaling';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

export default function WifiScanning({wifiList, clickEvent}) {
  return (
    <ScrollView>
      {/* {loading ? (
        <Text>Scanning ....</Text>
      ) : (
        <> */}
      {!wifiList.length > 0 ? (
        <View className="flex h-full justify-center items-center">
          <Text
            className="text-zinc-700 font-semibold text-lg px-2 mt-2"
            style={{fontFamily: 'BalooBhai2-Regular'}}>
            no wifi access point found, pull down{' '}
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              size={moderateScale(22)}
            />{' '}
            to load wifi list
          </Text>
        </View>
      ) : (
        <View className="h-full">
          {wifiList.map((wifi, i) => (
            <TouchableOpacity
              key={i}
              style={styles.wrapper}
              onPress={() => clickEvent(i)}>
              <Text style={styles.ssid}>{wifi?.SSID}</Text>
              <Text style={styles.mac}>{wifi?.BSSID}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    backgroundColor: 'white',
    padding: moderateScale(5),
    // height: 20,
    margin: 5,
    border: 1,
    borderColor: colors.dark_text,
    borderRadius: 5,

    color: colors.dark_text,
  },
  ssid: {
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Bold',
  },
  mac: {
    color: colors.light_text,
    fontSize: moderateScale(12),
    fontFamily: 'BalooBhai2-SemiBold',
  },
});
