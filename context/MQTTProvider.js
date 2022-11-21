import React, {useEffect, useState} from 'react';
import MQTT from 'sp-react-native-mqtt';
//read .env file
import {REACT_APP_MQTTHOST, REACT_APP_MQTTUSER, REACT_APP_MQTTPASS} from '@env';

export const MqttContext = React.createContext(null);

export default function MQTTProvider({children}) {
  const [connectionState, setConnectionState] = useState({
    client: null,
    connected: false,
  });
  const [messages, setMessages] = React.useState({});
  const [finalData, setFinalData] = React.useState([]);
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
          setConnectionState(currentState => ({
            ...currentState,
            client: _client,
          }));
          _client?.connect();
          _client?.on('connect', function () {
            console.log('connected');
            _client?.subscribe('/outTopic/7890', 0);
            setConnectionState(currentState => ({
              ...currentState,
              connected: true,
            }));
          });

          _client?.on('message', async message => {
            try {
              const json = await JSON.parse(message?.data);
              //verify recived data is correct
              const {gateway, node} = json;
              if (gateway == undefined || node == undefined)
                throw new Error('invaild json data received');
              //enter time stamping with received data
              json['time'] = Date.now();
              setMessages(json);
            } catch (err) {
              console.log('data error -> ', err.message);
            }
          });

          _client?.on('closed', function () {
            setConnectionState(currentState => ({
              ...currentState,
              connected: false,
            }));
            _client?.end();
            console.log('mqtt.event.closed');
            //reconnect request
            // _client.connect();
          });
          _client?.on('error', function (msg) {
            setConnectionState(currentState => ({
              ...currentState,
              connected: false,
            }));
            console.log('mqtt.event.error', msg);
            //reconnect request
            //  _client.connect();
          });
        })
        .catch(err => {
          console.log('new error-->', err);
        });

    if (connectionState.client == null) {
      connectToMqtt();
    }
    return () => {
      connectionState.client?.unsubscribe('/outTopic/7890');
    };
  }, []);
  //create timer
  useEffect(() => {
    const currentTime = Date.now().toString();
    const timer = setInterval(() => {
      //remove item from array if time difference is greater than 30s
      if (finalData.length > 0) {
        const itemsLeft = finalData.filter(
          item => Date.now() - item?.time < 30000,
        );
        setFinalData(itemsLeft);
      }
    }, 4000);
    return () => {
      clearInterval(timer);
    };
  }, [finalData]);

  //filter and insert received item to final data array
  useEffect(() => {
    const filter = async () => {
      if (messages?.gateway != undefined && messages?.node) {
        if (finalData.length > 0) {
          const filterItems = finalData.filter(
            item =>
              !(
                item?.gateway == messages?.gateway &&
                item?.node == messages?.node
              ),
          );
          setFinalData([...filterItems, messages]);
        } else setFinalData(currentData => [...currentData, messages]);
      }
    };
    filter();
  }, [messages]);
  return (
    <MqttContext.Provider value={{connectionState, finalData}}>
      {children}
    </MqttContext.Provider>
  );
}
export const useMqtt = () => React.useContext(MqttContext);
