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

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard({
  data = {
    sensor0: 0,
    sensor1: 0,
    relay0: 0,
  },
  fId = 0,
  addr = '7 tennyson street',
  sprinklerEvent, //method
  deleteBtn,
}) {
  return (
    <ScrollView className="overflow-scroll">
      <View
        className={`border-gray-300 border rounded-t-2xl shadow bg-gray-50`}
        style={{
          overflow: 'scroll',
        }}>
        <View className="relative">
          <View className="absolute z-30 top-1 left-1 flex flex-row ">
            <TouchableOpacity className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-l-md">
              <FontAwesomeIcon icon={faEdit} size={22} color="white" />
            </TouchableOpacity>
            <View style={{backgroundColor: colors?.p3}} className="w-1" />
            <TouchableOpacity
              onPress={deleteBtn}
              className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-r-md">
              <FontAwesomeIcon icon={faTrash} size={22} color="white" />
            </TouchableOpacity>
          </View>
          <Image
            style={styles.bannerImage}
            className="rounded-t-xl"
            source={fieldTypes?.find(field => field.id == fId)?.image}
          />
        </View>
        {/* body */}
        <View className="p-2">
          {/* header text */}
          <View className="mt-3">
            <Text style={styles.headerText}>
              {fieldTypes.find(field => field.id == fId)?.name}
            </Text>
            <Text style={styles.subHeaderText}>
              {' '}
              {addr.length > 35 ? `${addr.slice(0, 35)} ...` : addr}
            </Text>
          </View>
          <View className="flex flex-row justify-around py-2 flex-wrap">
            <RoundIndicator
              activeStrokeColor={colors.primary}
              value={data?.sensor0}
            />
            <RoundIndicator
              title="Soil Moisture"
              isFloatValue={false}
              valueSuffix="%"
              maxValue={100}
              activeStrokeColor={colors.yellow_}
              value={data?.sensor1}
            />
          </View>
          <View className="flex items-center">
            <Sprinkler
              powerStatus={data?.relay0}
              onClick={() => sprinklerEvent(!data?.relay0)}
            />
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
