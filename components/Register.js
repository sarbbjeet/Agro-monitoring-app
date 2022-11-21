import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Btn from './Btn';
import {moderateScale} from '../Scaling';
import {useAuth} from '../context/AuthProvider';

export default function Register() {
  const [crediential, setCrediential] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
    // country_code: '',
    phone: '',
    error: false,
    msg: '',
  });
  const {register} = useAuth();
  const resetState = () => {
    setCrediential(currentState => ({
      ...currentState,
      name: '',
      last_name: '',
      email: '',
      password: '',
      country_code: '',
      phone: '',
    }));
  };
  const onSubmit = async () => {
    //send login request ...
    if (
      crediential?.email == '' ||
      crediential?.password == '' ||
      crediential?.name == ''
    )
      return setCrediential(currentState => ({
        ...currentState,
        error: true,
        msg: 'input should not be empty',
      }));
    const sendCredential = {...crediential};
    delete sendCredential?.msg;
    delete sendCredential?.error;

    const response = await register(sendCredential);
    if (response?.error)
      return setCrediential(currentState => ({
        ...currentState,
        error: true,
        msg: response?.msg,
      }));
    setCrediential(currentState => ({
      ...currentState,
      error: false,
      msg: 'successfully created user',
    }));
    resetState();
  };

  const onChange = ({name, value}) => {
    setCrediential(currentState => ({
      ...currentState,
      [name]: value.trim(),
      msg: '',
      error: false,
    }));
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View className="px-4 mt-10">
        {crediential?.msg?.length != '' && (
          <Text
            style={{fontFamily: 'BalooBhai2-Medium'}}
            className={`text-base  rounded p-2 mb-2
              ${
                crediential?.error
                  ? 'border-2 border-red-100 text-red-400'
                  : 'border-2 border-green-100 text-green-500'
              }
              `}>
            {crediential?.msg}
          </Text>
        )}

        <TextInput
          style={{fontFamily: 'BalooBhai2-SemiBold'}}
          id="name"
          name="name"
          placeholder="First Name"
          value={crediential?.name}
          onChangeText={text => onChange({name: 'name', value: text})}
          className="border-2 p-2 rounded-lg border-red-300 my-2 text-base"
        />
        <TextInput
          style={{fontFamily: 'BalooBhai2-SemiBold'}}
          id="last"
          name="last"
          placeholder="Last Name"
          value={crediential?.last_name}
          onChangeText={text => onChange({name: 'last_name', value: text})}
          className="border-2 p-2 rounded-lg border-red-300 my-2 text-base"
        />

        <TextInput
          style={{fontFamily: 'BalooBhai2-SemiBold'}}
          id="email"
          name="email"
          placeholder="Email"
          value={crediential?.email}
          onChangeText={text => onChange({name: 'email', value: text})}
          className="border-2 p-2 rounded-lg border-red-300 my-2 text-base"
        />

        <TextInput
          style={{fontFamily: 'BalooBhai2-SemiBold'}}
          id="password"
          name="password"
          placeholder="Password"
          value={crediential?.password}
          secureTextEntry
          onChangeText={text => onChange({name: 'password', value: text})}
          className="border-2 p-2 rounded-lg border-red-300 my-2 text-base"
        />

        <TextInput
          style={{fontFamily: 'BalooBhai2-SemiBold'}}
          id="phone"
          name="phone"
          placeholder="Phone"
          value={crediential?.phone}
          keyboardType="phone-pad"
          onChangeText={text => onChange({name: 'phone', value: text})}
          className="border-2 p-2 rounded-lg border-red-300 my-2 text-base"
        />

        <TouchableOpacity
          onPress={onSubmit}
          className="bg-red-400 px-3 py-2 mt-10 rounded-xl">
          <Text style={styles.text}>SIGNUP</Text>
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
});
