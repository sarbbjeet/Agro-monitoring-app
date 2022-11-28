import React, {createContext, useContext} from 'react';
const HttpContext = createContext({});
import {REACT_APP_HOST} from '@env';
import axios from 'axios';
import {useAuth} from './AuthProvider';
import {useFcmNotification} from '../firebase/NotificationController';
const fieldUrl = `${REACT_APP_HOST}/api/user/field`;
const fcmUrl = `${REACT_APP_HOST}/api/user/fcmtoken`;

const errorTail = (error, _err) => {
  if (error)
    return {
      error: true,
      msg: error,
    };
  return {
    error: true,
    msg: _err.message,
  };
};
export default function HttpRequestProvider({children}) {
  const {token, isAuthenticated, user} = useAuth();
  const {getFcmToken} = useFcmNotification();

  const addOrUpdateField = async ({newField, update = false}) => {
    try {
      let userID = isAuthenticated ? user?.id : '7890'; //set dafault id if your not authenticated
      const fieldId = newField?.id;
      delete newField?.id;
      await axios(
        `${fieldUrl}?farmer_id=${userID}${
          update ? `&field_id=${fieldId}` : ''
        }`,
        {
          method: update ? 'PUT' : 'POST',
          data: newField,
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      return {
        error: false,
        msg: 'successfully operation performed',
      };
    } catch (_err) {
      return errorTail(_err?.response?.data?.error, _err);
    }
  };
  const deleteField = async fieldID => {
    //apply axios request here
    console.log('field_id', fieldID);
    try {
      await axios.delete(`${fieldUrl}?id=${fieldID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        error: false,
        msg: 'Delete field item successfully',
      };
    } catch (err) {
      return errorTail(err?.response?.data?.error, err);
    }
  };

  const deleteFcmToken = async () => {
    const fcmtoken = await getFcmToken();
    if (fcmtoken && token) {
      try {
        await axios.delete(`${fcmUrl}?fcmtoken=${fcmtoken}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return {
          error: false,
          msg: 'Delete fcm token successfully',
        };
      } catch (err) {
        return errorTail(err?.response?.data?.error, err);
      }
    }
  };

  //firebase notication just insert token to the server
  const updateFcmToken = async () => {
    //apply axios request here
    const fcmtoken = await getFcmToken();
    if (fcmtoken && token) {
      try {
        await axios(fcmUrl, {
          method: 'POST',
          data: {token: fcmtoken},
          headers: {Authorization: `Bearer ${token}`},
        });
        return {
          error: false,
          msg: 'token added successfully',
        };
      } catch (err) {
        console.log('token err..', err?.response?.data?.error, err);
        return errorTail(err?.response?.data?.error, err);
      }
    }
  };

  return (
    <HttpContext.Provider
      value={{deleteField, addOrUpdateField, updateFcmToken, deleteFcmToken}}>
      {children}
    </HttpContext.Provider>
  );
}

export const useRequest = () => useContext(HttpContext);
