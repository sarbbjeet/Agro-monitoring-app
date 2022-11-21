import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import ListItem from '../components/ListItem';
import {useMqtt} from '../context/MQTTProvider';
import {useAuth} from '../context/AuthProvider';

export default function ScanningField({navigation}) {
  const {finalData} = useMqtt();
  const {user} = useAuth();
  console.log('user id ->', user?.id);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {finalData.length == 0 ? (
        <View className="flex-1 flex-row  justify-center px-4 mt-6">
          {/* <View className="h-[1px] w-full bg-[#777] mx-4"></View> */}
          <Text
            style={{fontFamily: 'BalooBhai2-Bold'}}
            className="m-0 whitespace-nowrap text-base font-semibold text-[#777]">
            Sorry, there are no field units available to add.
          </Text>
          {/* <View className="h-[1px] w-full bg-[#777] mx-4"></View> */}
        </View>
      ) : (
        <>
          {finalData.map((item, i) => (
            <ListItem
              onPress={() =>
                navigation.navigate('dEditField', {
                  item,
                  update: false, //add new field
                })
              }
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
