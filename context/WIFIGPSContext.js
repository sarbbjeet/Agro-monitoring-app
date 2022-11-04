import React, {useEffect, useState} from 'react';
import {AppRegistry, NativeModules} from 'react-native';

export const UserContext = React.createContext();
const {ConnectivityStatus} = NativeModules; //custom module

export default function WIFIGPSContext({children}) {
  const [stateObj, setStateObj] = useState({
    wifi: false,
    gps: false,
  });

  const [headless, setHeadless] = useState(false);
  const broadcastEvent = async data => {
    const {gps, wifi} = data;
    if (gps && gps == 'on') setStateObj({...stateObj, gps: true});
    else if (gps && gps == 'off') setStateObj({...stateObj, gps: false});

    if (wifi && wifi == 'on') setStateObj({...stateObj, wifi: true});
    else if (wifi && wifi == 'off') setStateObj({...stateObj, wifi: false});
  };

  useEffect(() => {
    //get wifi and gps location state //is they are on or off
    ConnectivityStatus.isWifiGPSOn((wifi, gps) => {
      setStateObj({wifi, gps});
    });
    //create event listener to listen state of wifi and gps changes
    if (!headless) {
      setHeadless(true);
      AppRegistry.registerHeadlessTask('broadcastEvent', () => broadcastEvent);
    }
  }, []);
  return (
    <UserContext.Provider value={stateObj}>{children}</UserContext.Provider>
  );
}
