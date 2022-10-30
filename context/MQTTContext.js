import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import MQTT from 'sp-react-native-mqtt';
export const UserContext = React.createContext();
//read .env file
import {REACT_APP_MQTTHOST, REACT_APP_MQTTUSER, REACT_APP_MQTTPASS} from '@env';
export default function MQTTContext({children}) {
  const [connectionState, setConnectionState] = useState({
    client: null,
    connected: false,
  });
  useEffect(() => {
    const connectToMqtt = () =>
      MQTT.createClient({
        uri: `mqtt://${REACT_APP_MQTTHOST}:1883`,
        clientId: 'mqttjs01',
        user: REACT_APP_MQTTUSER,
        pass: REACT_APP_MQTTPASS,
        clean: true,
        auth: true,
      })
        .then(_client => {
          setConnectionState({...connectionState, client: _client});
          console.log('d1 -> ', _client);
          _client.connect();
          _client.on('connect', function () {
            console.log('connected');
            _client.subscribe('/outTopic/7890', 0);
            setConnectionState({...connectionState, connected: true});
          });
          _client.on('closed', function () {
            setConnectionState({...connectionState, connected: false});
            console.log('mqtt.event.closed');
            //reconnect request
            _client.connect();
          });
          _client.on('error', function (msg) {
            setConnectionState({...connectionState, connected: false});
            console.log('mqtt.event.error', msg);
            //reconnect request
            _client.connect();
          });
        })
        .catch(err => {
          console.log(err);
        });
    if (!connectionState.client) connectToMqtt();
    return () => {
      connectionState.client?.unsubscribe('/outTopic/7890');
    };
  }, []);
  return (
    <UserContext.Provider value={connectionState}>
      {children}
    </UserContext.Provider>
  );
}