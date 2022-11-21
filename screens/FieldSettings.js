import {
  View,
  Text,
  ScrollView,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import {moderateScale} from '../Scaling';
import {navheaderFont} from '../constants/theme';

export default function FieldSettings() {
  const [state, setState] = useState({
    field_type_id: 0,
    addr: '',
    gateway: 0,
    node: 0,
    min_moist: 0,
    min_temp: 0,
    max_temp: 0,
    max_moist: 0,
    moist_auto: false,
    temp_auto: false,

    error: false,
    msg: '',
  });
  const onChange = ({name, value}) => {
    setState(currentState => ({
      ...currentState,
      [name]: value,
      error: false,
      msg: '',
    }));
  };

  const DATA = [
    {label: 'Potato Field', value: '1'},
    {label: 'Wheat Field', value: '2'},
    {label: 'Onion Field', value: '3'},
  ];

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View className="px-4 mt-5">
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
            data={DATA}
            labelField="label"
            valueField="value"
            value={'3'}
            onChange={item => console.log(item)}
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

        <View className="border-2 border-[#ccc] shadow-lg p-2 my-4">
          <Text className="text-base font-bold">
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
                value={state?.min_moist}
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
                style={{fontFamily: 'BalooBhai2-SemiBold'}}
                name="max_moist"
                placeholder="max"
                keyboardType="numeric"
                value={state?.max_moist}
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

            <Text>
              Press to adjust the automatic sprinkler state based on the minimum
              and maximum moisture sensor threshold values.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          //   onPress={onSubmit}
          style={{backgroundColor: navheaderFont.backgroundColor}}
          className="px-3 py-2 rounded-xl mt-8">
          <Text style={styles.text}>Add Field </Text>
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
