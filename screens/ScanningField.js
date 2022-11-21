import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import ListItem from '../components/ListItem';
import {useMqtt} from '../context/MQTTProvider';

export default function ScanningField() {
  const {finalData} = useMqtt();
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {finalData.length == 0 ? (
        <View
          style={{fontFamily: 'BalooBhai2-Bold'}}
          className="flex-1 flex-row items-center justify-center">
          <View className="h-[1px] w-full bg-[#777] mx-4"></View>
          <Text className="p-0 m-0 whitespace-nowrap text-base font-semibold text-[#777]">
            field list is empty
          </Text>
          <View className="h-[1px] w-full bg-[#777] mx-4"></View>
        </View>
      ) : (
        <>
          {finalData.map((item, i) => (
            <ListItem
              key={i}
              className="mx-1"
              gateway={item?.gateway}
              node={item?.node}
            />
          ))}
        </>
      )}
    </ScrollView>
  );
}
