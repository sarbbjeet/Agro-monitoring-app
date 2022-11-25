import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export default function NotificationController() {
  useEffect(() => {
    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('token->', token);
    };
    getToken();
  });
  return (
    <View>
      <Text>NotificationController</Text>
    </View>
  );
}
