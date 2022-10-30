import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useContext} from 'react';
import Dashboard from '../components/Dashboard';
import {moderateScale} from '../Scaling';
import {UserContext} from '../context/MQTTContext';
const dd = {
  title: 'sarb',
  addr: 'this is my app',
};
export default function Home() {
  const {client, connected} = useContext(UserContext);
  if (client) {
    console.log(client);
    // client.subscribe('/data');
    client.on('message', function (msg) {
      console.log('my message-->', msg);
    });
  }
  return (
    <View className="mx-2 mt-6">
      <Text className="text-gray-700" style={styles.fontFamily}>
        Dashboard
      </Text>
      <View style={styles.divider} />
      <ScrollView horizontal className="mt-4 flex h-full" pagingEnabled>
        <View className="mr-2">
          <Dashboard {...dd} />
        </View>
        {/* <View>
          <Dashboard />
        </View> */}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'BalooBhai2-Bold',
    fontSize: moderateScale(22),
  },
  divider: {
    height: 1,
    // width: "100%",
    backgroundColor: '#aaaaaa',
  },
});
