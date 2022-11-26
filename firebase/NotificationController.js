import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {useRequest} from '../context/HttpRequestProvider';
import {useAuth} from '../context/AuthProvider';

export default function NotificationController({children}) {
  const {updateFcmToken} = useRequest();
  const {user, token} = useAuth();

  useEffect(() => {
    const getToken = async () => {
      const fsctoken = await messaging().getToken();
      if (token) await updateFcmToken(fsctoken);
    };
    getToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(JSON.stringify(remoteMessage));
    });
    return unsubscribe;
    //   PushNotification.configure({
    //     // (optional) Called when Token is generated (iOS and Android)
    //     onRegister: function (token) {
    //       console.log('TOKEN:', token);
    //     },
    //     onNotification: function (notification) {
    //       console.log('REMOTE NOTIFICATION ==>', notification);
    //       // process the notification here
    //     },
    //   });
  }, [user, token]);

  return <>{children}</>;
}
