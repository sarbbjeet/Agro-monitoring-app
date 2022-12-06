import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import {createContext} from 'react';
import {AppRegistry, NativeModules} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
const {ConnectivityStatus} = NativeModules; //custom module

const WGContext = createContext({});
export default function WGProvider({children}) {
  const [headless, setHeadless] = useState(false);
  const [connectedSSID, setCurrentSSID] = useState('');
  const [settings, setSettings] = useState({
    wifi: false,
    gps: false,
  });

  useEffect(() => {
    console.log('settimgs1', settings);
    loadCurrentSSID();
  }, [settings]);

  const broadcastEvent = async ({gps, wifi}) => {
    if (gps == 'on')
      setSettings(currentState => ({...currentState, gps: true}));
    else if (gps == 'off')
      setSettings(currentState => ({...currentState, gps: false}));
    if (wifi == 'on')
      setSettings(currentState => ({...currentState, wifi: true}));
    else if (wifi == 'off')
      setSettings(currentState => ({...currentState, wifi: false}));
  };

  useEffect(() => {
    //get wifi and gps location state //is they are on or off
    ConnectivityStatus.isWifiGPSOn((wifi, gps) => {
      setSettings({wifi, gps});
      // setContext(currentState => ({...currentState, wifi, gps}));
    });
    //create event listener to listen state of wifi and gps changes
    if (!headless) {
      setHeadless(true);
      AppRegistry.registerHeadlessTask('broadcastEvent', () => broadcastEvent);
    }
  }, []);

  const loadCurrentSSID = async () => {
    WifiManager.getCurrentWifiSSID()
      .then(ssid => {
        setCurrentSSID(ssid);
      })
      .catch(() => {
        setCurrentSSID(''); //null
      });
  };

  return (
    <WGContext.Provider value={{settings, loadCurrentSSID, connectedSSID}}>
      {children}
    </WGContext.Provider>
  );
}

export const useWG = () => useContext(WGContext);
