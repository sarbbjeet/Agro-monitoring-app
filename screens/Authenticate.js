import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {navheaderFont} from '../constants/theme';
import {moderateScale} from '../Scaling';
import Login from '../components/Login';
import Register from '../components/Register';

export default function Authenticate() {
  const [page, setPage] = useState(false);
  const changePage = state => {
    setPage(page => setPage(state));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}} className="justify-center items-center py-4">
        <Image
          source={require('../resources/monitoring.png')}
          style={{width: 100, height: 100}}
        />
        <Text className="text-white text-lg font-semibold mt-2">
          Agriculture Monitoring Stystem
        </Text>
      </View>
      <View style={styles.wrapper} className=" bg-white rounded-t-3xl">
        <View
          style={styles.wrapper_header}
          className="h-16 flex flex-row items-center transition-all">
          <TouchableOpacity
            onPress={() => changePage(false)}
            className={`flex-1 flex items-center mx-4 transition-all ${
              !page && 'border-red-400 border-b-2'
            }`}>
            <Text
              style={styles.fontHeader}
              className={`py-2 ${!page && 'text-red-400'}`}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changePage(true)}
            className={`flex-1 flex items-center mx-4 transition-all ${
              page && 'border-red-400 border-b-2'
            }`}>
            <Text
              style={styles.fontHeader}
              className={`py-2 ${page && 'text-red-400'}`}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        {!page ? <Login /> : <Register />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: navheaderFont.backgroundColor,
  },
  fontHeader: {
    fontFamily: 'BalooBhai2-SemiBold',
    fontSize: moderateScale(18),
  },
  wrapper: {
    flex: 3,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  wrapper_header: {},
});
