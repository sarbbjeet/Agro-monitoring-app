import React, {useEffect, useRef, useState} from 'react';
import MQTT from 'sp-react-native-mqtt';
//read .env file
import {REACT_APP_MQTTHOST, REACT_APP_MQTTUSER, REACT_APP_MQTTPASS} from '@env';
import {useAuth} from './AuthProvider';

export const MqttContext = React.createContext(null);

export default function MQTTProvider({children}) {
  const [connectionState, setConnectionState] = useState({
    client: null,
    connected: false,
  });
  // const [client, setClient] = React.useState(null);
  const [messages, setMessages] = React.useState({});
  const [reconnect, setReconnect] = React.useState('');
  const [allReceived, setAllReceived] = React.useState([]);
  const [scanList, setScanList] = React.useState([]);
  const ref_client = useRef();
  const {user} = useAuth();
  useEffect(() => {
    if (connectionState?.client != null) {
      ref_client.current = connectionState?.client;
    }
  }, [connectionState?.connected]);

  const reconnectRequest = async () => {
    if (user?.id && !connectionState?.connected) {
      const _client = await MQTT.createClient({
        uri: `mqtt://${REACT_APP_MQTTHOST}:1883`,
        clientId: `clientId=${Date.now().toString()}`,
        user: REACT_APP_MQTTUSER,
        pass: REACT_APP_MQTTPASS,
        clean: true,
        auth: true,
      });
      _client.connect();
      _client.on('connect', () => {
        console.log('connected..');
        _client?.subscribe(`/outTopic/${user?.id}`, 0);
        setConnectionState({
          client: _client,
          connected: true,
        });
      });
      _client.on('error', () => {
        setConnectionState(currentState => ({
          ...currentState,
          connected: false,
        }));
        _client?.unsubscribe(`/outTopic/${user?.id}`);
        console.log('connecion error');
      });
      _client.on('closed', () => {
        console.log('conneciton is closed');
        _client?.unsubscribe(`/outTopic/${user?.id}`);
        setConnectionState(currentState => ({
          ...currentState,
          connected: false,
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
    }
  };

  useEffect(() => {
    reconnectRequest();
  }, [reconnect]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!connectionState?.connected)
        //just randomly change the reconnect string value to enable to run loop again
        setReconnect(Date.now().toString());
    }, 5000);
    return () => clearInterval(timer);
  }, [ref_client?.current, connectionState?.connected]);

  //create timer
  useEffect(() => {
    const currentTime = Date.now().toString();
    const timer = setInterval(() => {
      //remove item from array if time difference is greater than 30s
      if (allReceived.length > 0) {
        const itemsLeft = allReceived.filter(
          item => Date.now() - item?.time < 30000,
        );
        setAllReceived(itemsLeft);
      }
    }, 4000);
    return () => {
      clearInterval(timer);
    };
  }, [allReceived]);

  //filter and insert received item to final data array
  useEffect(() => {
    const filter = async () => {
      if (messages?.gateway != undefined && messages?.node) {
        if (allReceived.length > 0) {
          const filterItems = allReceived.filter(
            item =>
              !(
                item?.gateway == messages?.gateway &&
                item?.node == messages?.node
              ),
          );
          setAllReceived([...filterItems, messages]);
        } else setAllReceived(currentData => [...currentData, messages]);
      }
    };
    filter();
  }, [messages]);

  useEffect(() => {
    setScanList(
      allReceived?.filter(
        f =>
          !user?.fields.find(
            e => e?.gateway == f?.gateway && e?.node == f?.node,
          ),
      ),
    );
  }, [allReceived]);

  const publish_data = msg => {
    try {
      ref_client?.current?.publish(
        `/inTopic/${user?.id}`,
        JSON.stringify(msg),
        0,
        false,
      );
    } catch (err) {
      console.log('error to publish mqtt', err.message);
    }
  };
  return (
    <MqttContext.Provider
      value={{
        connectionState,
        setConnectionState,
        allReceived,
        publish_data,
        scanList,
        ref_client,
      }}>
      {children}
    </MqttContext.Provider>
  );
}
export const useMqtt = () => React.useContext(MqttContext);
