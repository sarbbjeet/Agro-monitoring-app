import {
  View,
  Text,
  ScrollView,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import {moderateScale} from '../Scaling';
import {navheaderFont} from '../constants/theme';
import axios from 'axios';
import {useAuth} from '../context/AuthProvider';
import {REACT_APP_HOST} from '@env';
import {useRequest} from '../context/HttpRequestProvider';
const url = `${REACT_APP_HOST}/api/user/field`;
const dropdown = [
  {label: 'Potato Field', value: 0},
  {label: 'Wheat Field', value: 1},
  {label: 'Onion Field', value: 2},
];

export default function FieldSettings({route, navigation}) {
  const {item, update = false} = route.params;
  const {loadUserFromDB} = useAuth();
  const {addOrUpdateField} = useRequest();
  const [state, setState] = useState({});

  useEffect(() => {
    setState({
      id: update ? item?.id : '',
      field_type_id: item?.field_type_id != undefined ? item?.field_type_id : 0,
      addr: item?.addr || '',
      gateway: item?.gateway,
      node: item?.node,
      min_moist: item?.min_moist ? item?.min_moist : 0,
      max_moist: item?.max_moist ? item?.max_moist : 0,
      min_temp: item?.min_temp != undefined ? item?.min_temp : 0,
      max_temp: item?.max_temp != undefined ? item?.max_temp : 0,
      moist_auto: item?.moist_auto != undefined ? item?.moist_auto : false,
      temp_auto: item?.temp_auto != undefined ? item?.temp_auto : false,
      msg: '',
      error: false,
    });
  }, [item, update]);

  const onChange = ({name, value}) => {
    setState(currentState => ({
      ...currentState,
      [name]: value,
      error: false,
      msg: '',
    }));
  };

  //add or update field to database
  const onFieldToDB = async () => {
    //post
    const newField = {...state};
    delete newField?.id;
    delete newField?.error;
    delete newField?.msg;
    const {error, msg} = await addOrUpdateField({update, newField});
    if (error)
      return setState(currentState => ({
        ...currentState,
        error: true,
        msg: msg?.length > 200 ? `${msg?.slice(0, 200)}` : msg,
      }));
    //reset state
    setState(currentState => ({...currentState, error: false, msg}));
    //reload user data
    loadUserFromDB();
    navigation?.navigate('dHome'); //navigate to home
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View className="px-4 mt-5">
        {/* feedback */}
        {state?.msg && (
          <View
            className={`p-2 text-gray-500  ${
              state?.error ? 'bg-red-300' : 'bg-green-200 '
            }`}>
            <Text className="m-0">{state?.msg}</Text>
          </View>
        )}
        <View>
          <Text className="text-lg" style={{fontFamily: 'BalooBhai2-SemiBold'}}>
            Field Type
          </Text>
          <Dropdown
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            style={styles.dropdown}
            data={dropdown}
            labelField="label"
            valueField="value"
            value={state?.field_type_id}
            onChange={item =>
              onChange({name: 'field_type_id', value: item?.value})
            }
            placeholder="Select Field Type"
          />
        </View>

        <View className="my-2">
          <Text className="text-lg" style={{fontFamily: 'BalooBhai2-SemiBold'}}>
            Location
          </Text>
          <TextInput
            style={{fontFamily: 'BalooBhai2-SemiBold'}}
            id="addr"
            name="addr"
            placeholder="Location"
            value={state?.addr}
            onChangeText={text => onChange({name: 'addr', value: text})}
            className="border-[1px] p-2 rounded-lg border-green-900  text-base"
          />
        </View>

        <View
          className="border-2 border-[#ccc] shadow-inner p-2 my-4 rounded-sm"
          style={{
            shadowColor: 'green',
            shadowOffset: {
              width: 1,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 1,
          }}>
          <Text className="text-lg" style={{fontFamily: 'BalooBhai2-SemiBold'}}>
            Moisture Sensor Threshold Values
          </Text>
          <View className="flex flex-row my-2">
            <View className="flex-1 mr-2">
              <Text
                className="text-lg text-[#555]"
                style={{fontFamily: 'BalooBhai2-SemiBold'}}>
                Min %
              </Text>
              <TextInput
                style={{fontFamily: 'BalooBhai2-SemiBold'}}
                id="min_moist"
                name="min_moist"
                placeholder="min"
                keyboardType="numeric"
                value={state?.min_moist?.toString()}
                onChangeText={text =>
                  onChange({name: 'min_moist', value: text})
                }
                className="border-[1px] p-2 rounded-lg border-green-900  text-base"
              />
            </View>
            <View className="flex-1">
              <Text
                className="text-lg text-[#555]"
                style={{fontFamily: 'BalooBhai2-SemiBold'}}>
                Max %
              </Text>
              <TextInput
                style={{
                  fontFamily: 'BalooBhai2-SemiBold',
                }}
                name="max_moist"
                placeholder="max"
                keyboardType="numeric"
                value={state?.max_moist?.toString()}
                onChangeText={text =>
                  onChange({name: 'max_moist', value: text})
                }
                className="border-[1px] p-2 rounded-lg border-green-900  text-base"
              />
            </View>
          </View>

          <View className="flex my-2">
            <Switch
              style={{width: 40, height: 30}}
              trackColor={{false: '#999', true: '#00cc00'}}
              thumbColor={state?.moist_auto ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                onChange({name: 'moist_auto', value: !state?.moist_auto})
              }
              value={state?.moist_auto}
            />

            <Text
              style={{fontFamily: 'BalooBhai2-Regular'}}
              className="text-gray-900">
              Press to adjust the automatic sprinkler state based on the minimum
              and maximum moisture sensor threshold values.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={onFieldToDB}
          style={{
            backgroundColor: navheaderFont.backgroundColor,
            shadowColor: 'green',
            shadowOffset: {
              width: 1,
              height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 1.41,
            elevation: 10,
          }}
          className="px-3 py-2 rounded-xl mt-8">
          <Text style={styles.text}>
            {update ? 'Update Field' : 'Add Field'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontFamily: 'BalooBhai2-Bold',
    fontSize: moderateScale(16),
    textTransform: 'uppercase',
    color: 'white',
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    shadowColor: 'green',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: moderateScale(14),
    color: '#444',
    fontFamily: 'BalooBhai2-SemiBold',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 20,
  },
});
