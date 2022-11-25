/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}
import App from './App';
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => HeadlessCheck);
