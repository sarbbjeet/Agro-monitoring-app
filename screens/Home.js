import {View, Text, StyleSheet, ScrollView, AppRegistry} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Dashboard from '../components/Dashboard';
import {moderateScale} from '../Scaling';
import {UserContext} from '../context/MQTTContext';
const dd = {
  title: 'sarb',
  addr: 'this is my app',
};

const broadcastEvent = async data => {
  console.log('listener -->', data);
};
export default function Home() {
  const [headless, setHeadless] = useState(false);
  const [data, setData] = useState({
    title: 'Potato Field',
    addr: 'middlesbrough, TS1 78L',
    temerature: 0,
    moisture: 0,
    sprinklerStatus: false,
  });
  const ref_client = useRef();
  const {client, connected} = useContext(UserContext);
  if (client) {
    ref_client.current = client;
    // client.subscribe('/data');
    client.on('message', async function (msg) {
      try {
        const obj = await JSON.parse(msg.data); // payload is a buffer
        setData({
          ...data,
          temerature: obj?.data?.sensor1,
          moisture: obj?.data?.sensor0,
          sprinklerStatus: obj?.data?.relay0,
        });
        //console.log('my message-->', obj);
      } catch (err) {
        console.log(err);
      }
    });
  }

  useEffect(() => {
    if (!headless) {
      setHeadless(true);
      AppRegistry.registerHeadlessTask('broadcastEvent', () => broadcastEvent);
    }
  }, []);
  return (
    <View className="mx-2 mt-6">
      <Text className="text-gray-700" style={styles.fontFamily}>
        Dashboard
      </Text>
      <View style={styles.divider} />
      <ScrollView horizontal className="mt-4 flex h-full" pagingEnabled>
        <View className="mr-2">
          <Dashboard
            {...data}
            sprinklerEvent={() => {
              ref_client.current.publish(
                '/inTopic/7890',
                JSON.stringify({
                  gateway: 170,
                  node: 187,
                  deviceModel: 0,
                  data: {
                    sensor0: 16.35,
                    sensor1: 91,
                    relay0: data?.sprinklerStatus == 1 ? 0 : 1,
                  },
                }),
                0,
                false,
              );
              console.log('publish event');
            }}
          />
        </View>
        {/* <View>
          <Dashboard />
        </View> */}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'BalooBhai2-Bold',
    fontSize: moderateScale(22),
  },
  divider: {
    height: 1,
    // width: "100%",
    backgroundColor: '#aaaaaa',
  },
});
