import React, {useEffect, useState} from 'react';
import {AppRegistry, NativeModules} from 'react-native';
const {ConnectivityStatus} = NativeModules; //custom module

const functionTemplate = () => {};
const userObjectContext = {
  wifi: false,
  gps: false,
  updateStatus: functionTemplate,
};
export const UserContext = React.createContext(userObjectContext);
export default function WIFIGPSContext({children}) {
  const [context, setContext] = useState(userObjectContext);
  const [headless, setHeadless] = useState(false);

  const updateContext = (contextUpdates = {}) =>
    setContext(currentContext => ({...currentContext, ...contextUpdates}));

  const broadcastEvent = async ({gps, wifi}) => {
    console.log('bbb', context);
    if (gps == 'on') updateContext({gps: true});
    else if (gps == 'off') updateContext({gps: false});
    if (wifi == 'on') updateContext({wifi: true});
    else if (wifi == 'off') updateContext({wifi: false});
  };

  useEffect(() => {
    //get wifi and gps location state //is they are on or off
    ConnectivityStatus.isWifiGPSOn((wifi, gps) => {
      setContext(currentState => ({...currentState, wifi, gps}));
    });
    //create event listener to listen state of wifi and gps changes
    if (!headless) {
      setHeadless(true);
      AppRegistry.registerHeadlessTask('broadcastEvent', () => broadcastEvent);
    }
  }, []);

  useEffect(() => {
    if (context?.updateStatus === functionTemplate) {
      updateContext({
        updateStatus: value => updateContext({status: value}),
      });
    }
  }, [context?.updateStatus]);

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
