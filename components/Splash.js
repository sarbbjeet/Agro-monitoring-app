import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {navheaderFont} from '../constants/theme';

export default function Splash() {
  return (
    <View
      className="flex-1 flex justify-center items-center"
      style={{backgroundColor: navheaderFont.backgroundColor}}>
      <Image
        source={require('../resources/monitoring.png')}
        style={{width: 100, height: 100}}
      />
      <Text
        className="text-white text-lg mt-4"
        style={{fontFamily: 'BalooBhai2-Bold'}}>
        Agriculture Monitoring System
      </Text>
    </View>
  );
}
