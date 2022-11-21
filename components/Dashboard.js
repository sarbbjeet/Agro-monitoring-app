import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {moderateScale} from '../Scaling';
import RoundIndicator from './RoundIndicator';
import {colors} from '../constants/colors';
import Sprinkler from './Sprinkler';
import {fieldTypes} from '../constants/fieldTypes';
import {useEffect} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

const field = {
  name: 'wheat Field',
  addr: 'mamumajra, ts1 4lz',
};
export default function Dashboard({
  title = 'field_title',
  addr = 'address',
  field_id = 1,
  temerature = 10.5,
  moisture = 20,
  sprinklerStatus = false,
  numberOfDashboard = 1,
  sprinklerEvent, //method
}) {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  return (
    <ScrollView
      className="overflow-scroll"
      style={{maxHeight: height - moderateScale(150)}}>
      <View
        className={`border-gray-300 border rounded-t-2xl shadow bg-gray-50
      }`}
        style={{
          width:
            width -
            (numberOfDashboard == 1 ? moderateScale(20) : moderateScale(35)),
          overflow: 'scroll',
        }}>
        <View className="relative">
          <View className="absolute z-30 top-1 right-1 flex flex-row ">
            <TouchableOpacity className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-l-md">
              <FontAwesomeIcon icon={faEdit} size={22} color="white" />
            </TouchableOpacity>
            <View style={{backgroundColor: colors?.p3}} className="w-1" />
            <TouchableOpacity className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-r-md">
              <FontAwesomeIcon icon={faTrash} size={22} color="white" />
            </TouchableOpacity>
          </View>
          <Image
            style={styles.bannerImage}
            className="rounded-t-xl"
            source={
              fieldTypes?.find(field => field.id == field_id)?.image ||
              fieldTypes[0]?.image
            }
          />
        </View>
        {/* body */}
        <View className="p-2">
          {/* header text */}
          <View className="mt-3">
            <Text style={styles.headerText}>{title}</Text>
            <Text style={styles.subHeaderText}>{addr}</Text>
          </View>
          <View className="flex flex-row justify-around py-2 flex-wrap">
            <RoundIndicator
              activeStrokeColor={colors.primary}
              value={temerature}
            />
            <RoundIndicator
              title="Soil Moisture"
              isFloatValue={false}
              valueSuffix="%"
              maxValue={100}
              activeStrokeColor={colors.yellow_}
              value={moisture}
            />
          </View>
          <View className="flex items-center">
            <Sprinkler powerStatus={sprinklerStatus} onClick={sprinklerEvent} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: moderateScale(150),
    resizeMode: 'stretch',
  },
  text: {
    fontFamily: 'BalooBhai2-Bold',
  },
  headerText: {
    fontFamily: 'BalooBhai2-Bold',
    textTransform: 'capitalize',
    fontSize: moderateScale(20),
    // backgroundColor: "red",
    alignItems: 'center',
  },
  subHeaderText: {
    fontFamily: 'BalooBhai2-Regular',
    fontSize: moderateScale(18),
    lineHeight: 26,
  },
});
