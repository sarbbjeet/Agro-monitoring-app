import {View, Text, StyleSheet, TextInput, Linking} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../constants/colors';
import {moderateScale} from '../Scaling';
import {Button} from 'react-native-elements';
import Btn from '../components/Btn';

export default function GpsModel({ok, cancel}) {
  return (
    <View className="absolute flex h-full w-full bg-transparent justify-center pb-40 items-center z-10">
      <View style={styles.container} className="rounded-md">
        <View style={styles.header} className="bg-blue-400">
          <Text style={styles.headerText}>Use Location </Text>
        </View>
        <View className="flex flex-row mt-2 mx-2 items-center">
          <Text className="font-bold text-md mr-1">
            This app need to turn on gps settings of your device.
          </Text>
        </View>
        <View style={styles.btnGroup}>
          <Btn onClick={cancel}>cancel</Btn>
          <Btn onClick={ok}>ok</Btn>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: moderateScale(150),
    backgroundColor: 'white',
    //borderColor: '#bbb',
    // borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    width: '100%',
    // backgroundColor: '#0077aa',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'BalooBhai2-SemiBold',
    textTransform: 'capitalize',
    fontSize: moderateScale(14),
    color: 'white',
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 5,
    alignSelf: 'flex-end',
    paddingRight: 20,
    height: 40,
    marginTop: 'auto',
    marginBottom: 10,
    marginTop: 10,
  },
});
