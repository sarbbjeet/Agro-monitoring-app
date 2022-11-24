import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
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
  moist_auto = false,
  addr = '7 tennyson street',
  sprinklerEvent, //method
  deleteBtn,
  editBtn,
  isActive = false,
}) {
  return (
    <ScrollView className="overflow-scroll w-[96%]">
      <View
        className={`border-gray-300 border rounded-t-2xl shadow bg-gray-50 relative`}
        style={{
          overflow: 'scroll',
        }}>
        {!isActive && (
          <View className="absolute z-20 flex w-full justify-center items-center h-full bg-[#0f0d0c6f]">
            <ActivityIndicator
              size="large"
              color="#00ff00"
              className="-top-20"
            />
          </View>
        )}

        <View className="relative">
          <View className="absolute z-30 top-1 left-1 flex flex-row ">
            <TouchableOpacity
              onPress={editBtn}
              className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-l-md">
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
          <View className="flex items-center flex-row px-3">
            <Sprinkler
              disabled={moist_auto} //Is moist auto on?
              powerStatus={!data?.relay0}
              onClick={() => sprinklerEvent(!data?.relay0)}
            />
            {moist_auto && (
              <Text className="mt-2 ml-1" style={styles.text}>
                (un-clickable)
              </Text>
            )}
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
