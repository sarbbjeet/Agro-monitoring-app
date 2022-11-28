import {View, Text, ToastAndroid} from 'react-native';
import React, {createContext, useContext, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import notifee from '@notifee/react-native';
import {useRequest} from '../context/HttpRequestProvider';
import {useAuth} from '../context/AuthProvider';

const FcmContext = createContext({});

const showToastWithGravityAndOffset = ({title, body}) => {
  ToastAndroid.showWithGravityAndOffset(
    `${body}  (${title})`,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

export default function NotificationController({children}) {
  const {updateFcmToken} = useRequest();
  const {user, token} = useAuth();

  async function onDisplayNotification({title, body}) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    //toast display
    // showToastWithGravity();
    showToastWithGravityAndOffset({title, body});

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  //get fcmtoken
  const getFcmToken = async () => {
    const fcm = await messaging().getToken();
    return fcm;
  };

  useEffect(() => {
    //get notification when app on the View(open)
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const data = JSON.parse(remoteMessage?.data?.data);
      onDisplayNotification({
        title: `Sprinkler ${data?.sprinker ? 'On' : 'Off'}`,
        body: data?.addr,
      });
    });

    //get notification when app is foreground mode
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!');
    });

    return unsubscribe;
  }, []);

  return (
    <FcmContext.Provider value={{getFcmToken}}>{children}</FcmContext.Provider>
  );
}

export const useFcmNotification = () => useContext(FcmContext);
