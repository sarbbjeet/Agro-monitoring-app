import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {moderateScale} from '../Scaling';

export default function Btn({children, onClick}) {
  return (
    <TouchableOpacity
      onPress={onClick}
      className="bg-blue-400 rounded px-3 py-2 mx-1">
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  text: {
    fontFamily: 'BalooBhai2-Regular',
    fontSize: moderateScale(14),
    textTransform: 'uppercase',
    color: 'white',
  },
});
