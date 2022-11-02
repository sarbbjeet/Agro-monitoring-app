import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../constants/colors';
import {moderateScale} from '../Scaling';
import {Button} from 'react-native-elements';
import Btn from './Btn';

export default function SSIDAuthenticateModel({
  wifi = {ssid: 'nokia'},
  cancelEvent,
  okEvent,
}) {
  const [pass, setPass] = useState('');
  return (
    <View className="absolute flex h-full w-full bg-transparent pt-20 items-center">
      <View style={styles.container} className="rounded-md">
        <View style={styles.header}>
          <Text style={styles.headerText}>gateway authentication</Text>
        </View>
        <View className="flex flex-row mt-2 mx-2 items-center">
          <Text className="font-bold text-md mr-1">SSID: </Text>
          <Text className="border border-gray-100 p-1 text-md bg-slate-200">
            {wifi?.ssid}
          </Text>
        </View>
        <View className="flex flex-row mx-2 items-center">
          <Text className="font-bold text-md mr-1">PASS:</Text>
          <TextInput
            textContentType="password"
            secureTextEntry={false}
            value={pass}
            onChangeText={d => setPass(d)}
            className="border border-gray-400 w-5/6 rounded p-1"
          />
        </View>
        <View style={styles.btnGroup}>
          <Btn onClick={cancelEvent}>cancel</Btn>
          <Btn onClick={() => okEvent(pass)}>ok</Btn>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: 'white',
    borderColor: '#bbb',
    borderWidth: 1,
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
    backgroundColor: colors.primary,
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
