import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const AuthContext = createContext({});
import {REACT_APP_HOST} from '@env';

const url = `${REACT_APP_HOST}/api/user/login`;
const createUserUrl = `${REACT_APP_HOST}/api/user`;

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    return null;
    // error reading value
  }
};

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [_token, setToken] = useState('');

  const loadUserFromDB = async () => {
    //const token = Cookies.get("authToken");
    const token = await getData('@authToken');
    if (token && token != '') {
      console.log("Got a token in the cookies, let's see if it is valid");
      // api.defaults.headers.Authorization = `Bearer ${token}`;
      const {data: user} = await axios(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (user?.data) {
        setUser(user?.data);
        setToken(token);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUserFromDB();
  }, []);

  const register = async dataToSend => {
    try {
      const {data} = await axios.post(createUserUrl, dataToSend);
      return {error: false, msg: 'register successfully'};
    } catch (err) {
      if (err?.response?.data?.error)
        return {error: true, msg: err?.response?.data?.error};
      return {error: true, msg: err?.message};
    }
  };

  const login = async ({email, password}) => {
    try {
      const {data: token} = await axios.post(url, {
        email,
        password,
      });
      if (!token?.data) throw new Error('token is not received');
      //store token
      await AsyncStorage.setItem('@authToken', token?.data);

      const {data: user} = await axios(url, {
        headers: {
          Authorization: `Bearer ${token?.data}`,
        },
      });
      if (user?.data) {
        setUser(user?.data);
      }
      setToken(token?.data);
      return {error: false, msg: 'successfully login'};
    } catch (err) {
      if (err?.response?.data)
        return {error: true, msg: err?.response?.data?.error};
      return {error: true, msg: err?.message};
    }
  };

  const logout = async () => {
    //remove token from
    try {
      await AsyncStorage.removeItem('@authToken');
      setUser(null);
      console.log('siccessfull delete token from storagfe ...');
      return 'successfully removed logout';
    } catch (err) {
      console.log('error to delete tokn from storage', err?.message);
      return null;
    }

    //    window.location.pathname = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        logout,
        register,
        loadUserFromDB,
        token: _token,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
