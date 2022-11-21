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
import {REACT_APP_HOST} from '@env';
import axios from 'axios';
import {useAuth} from '../context/AuthProvider';
const url = `${REACT_APP_HOST}/api/user/login`;
export default function Login() {
  const initialState = {
    email: '',
    password: '',
    error: false,
    msg: '',
  };
  const [crediential, setCrediential] = useState(initialState);
  const {login} = useAuth();
  const resetCrediential = () => {
    setCrediential(currentState => ({
      ...currentState,
      email: '',
      password: '',
    }));
  };

  const onSubmit = async () => {
    //send login request ...
    if (crediential?.email == '' || crediential?.password == '')
      return setCrediential(currentState => ({
        ...currentState,
        error: true,
        msg: 'input should not be empty',
      }));
    const sendCredential = {...crediential};
    delete sendCredential?.msg;
    delete sendCredential?.error;
    const response = await login(sendCredential);
    if (response?.error)
      return setCrediential(currentState => ({
        ...currentState,
        error: true,
        msg: response?.msg,
      }));
    setCrediential(currentState => ({
      ...currentState,
      error: false,
      msg: 'successfully login',
    }));
    resetCrediential();
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
      <View className="px-4 mt-20">
        {crediential?.msg.length != '' && (
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
          id="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
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
        <Text
          className="text-right my-2"
          style={{fontFamily: 'BalooBhai2-SemiBold'}}>
          Forget Password
        </Text>

        <TouchableOpacity
          onPress={onSubmit}
          className="bg-red-400 px-3 py-2 mt-12 rounded-xl">
          <Text style={styles.text}>LOGIN</Text>
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
