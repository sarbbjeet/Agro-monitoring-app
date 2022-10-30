import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Dashboard from '../components/Dashboard';
import {moderateScale} from '../Scaling';

export default function Home() {
  return (
    // <View className="flex-1">
    <View className="mx-2 mt-6">
      <Text className="text-gray-700" style={styles.fontFamily}>
        Dashboard
      </Text>
      <View style={styles.divider} />
      <ScrollView horizontal className="mt-4 flex h-full" pagingEnabled>
        <View className="mr-2">
          <Dashboard />
        </View>
        <View>
          <Dashboard />
        </View>
      </ScrollView>
    </View>
    // </View>
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
