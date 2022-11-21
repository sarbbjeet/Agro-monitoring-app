import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function ListItem({gateway, node, ...props}) {
  return (
    <TouchableOpacity
      {...props}
      className="my-1 shadow-sm h-20 border-[1px] border-green-600 bg-[#ddd] mb-1 flex flex-row px-2 transition-all">
      <View className="w-3/6 flex flex-col justify-center h-full ">
        <Text
          className="text-base text-gray-700"
          style={{fontFamily: 'BalooBhai2-Bold'}}>
          Gateway
        </Text>
        <Text className="text-black" style={{fontFamily: 'BalooBhai2-Medium'}}>
          {gateway}
        </Text>
      </View>
      <View className="w-3/6 flex flex-col justify-center h-full ">
        <Text
          className="text-base text-gray-700"
          style={{fontFamily: 'BalooBhai2-Bold'}}>
          Node
        </Text>
        <Text className="text-black" style={{fontFamily: 'BalooBhai2-Medium'}}>
          {node}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
