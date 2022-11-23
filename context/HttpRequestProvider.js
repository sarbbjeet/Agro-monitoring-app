import React, {createContext, useContext} from 'react';
const HttpContext = createContext({});
import {REACT_APP_HOST} from '@env';
import axios from 'axios';
import {useAuth} from './AuthProvider';
const fieldUrl = `${REACT_APP_HOST}/api/user/field`;

export default function HttpRequestProvider({children}) {
  const {token, isAuthenticated, user} = useAuth();

  const addOrUpdateField = async ({newField, update = false}) => {
    try {
      let userID = isAuthenticated ? user?.id : '7890'; //set dafault id if your not authenticated
      await axios(
        `${fieldUrl}?farmer_id=${userID}${
          update ? `&field_id=${state?.id}` : ''
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
      const error = _err?.response?.data?.error;
      if (error)
        return {
          error: true,
          msg: error,
        };
      return {
        error: true,
        msg: _err.message,
      };
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
      const error = err?.response?.data?.error;
      console.log('errror', error);
      if (error)
        return {
          error: true,
          msg: error,
        };
      return {
        error: true,
        msg: err?.message,
      };
    }
  };
  return (
    <HttpContext.Provider value={{deleteField, addOrUpdateField}}>
      {children}
    </HttpContext.Provider>
  );
}

export const useRequest = () => useContext(HttpContext);
