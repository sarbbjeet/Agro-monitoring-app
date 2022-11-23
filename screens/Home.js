import {
  View,
  Text,
  StyleSheet,
  AppRegistry,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Dashboard from '../components/Dashboard';
import {moderateScale} from '../Scaling';
import {useMqtt} from '../context/MQTTProvider';
import DeleteModel from '../components/DeleteModel';
import {useRequest} from '../context/HttpRequestProvider';
import {useAuth} from '../context/AuthProvider';
import {faL} from '@fortawesome/free-solid-svg-icons';
import CardCarousel from '../components/CardCarousel';

const broadcastEvent = async data => {
  console.log('listener -->', data);
};

const Header = ({title, pageTag}) => (
  <>
    <View className="flex flex-row items-center justify-between">
      <Text className="text-gray-700" style={styles.fontFamily}>
        {title}
      </Text>
      <Text className="text-lg" style={{fontFamily: 'BalooBhai2-SemiBold'}}>
        {pageTag}
      </Text>
    </View>
    <View style={styles.divider} />
  </>
);
export default function Home({navigation}) {
  const [headless, setHeadless] = useState(false);
  const ref_client = useRef();
  const initialModelValues = {
    selectedItemID: '',
    hidden: true,
  };
  const [page, setPage] = useState({
    totalPages: 0,
    currentPage: 0,
  });

  const [deleteModelState, setDeleteModelState] = useState(initialModelValues);
  const {user, loadUserFromDB} = useAuth();
  const {deleteField} = useRequest(); //http request context provider
  const {
    finalData,
    publish_data,
    connectionState: {client, connected},
  } = useMqtt();

  //set dashboard props
  const dash_props = f => ({
    addr: f?.addr,
    fId: f?.field_type_id,
    data: getSensorValues({gateway: f.gateway, node: f.node}),
    deleteBtn: () => {
      setDeleteModelState({
        hidden: false,
        selectedItemID: f?.id,
      });
    },
    sprinklerEvent: state =>
      publish_data({
        gateway: f?.gateway,
        node: f?.node,
        data: {
          relay0: state,
        },
      }),
  });

  //set delete model props
  const deleteModelProps = () => ({
    cancelEvent: () =>
      setDeleteModelState(currentState => ({...currentState, hidden: true})),

    okEvent: () => {
      deleteField(deleteModelState?.selectedItemID);
      setDeleteModelState(initialModelValues); //reset model
      loadUserFromDB(); //request for reload user data
    },
  });

  //to insert into dashboards
  const getSensorValues = ({gateway, node}) => {
    const matched = finalData.find(
      d => d.gateway == gateway && d.node === node,
    );
    return matched?.data;
  };

  //change page
  const onChangePage = pageData => setPage(pageData);

  //get page tag
  const getPageTag = () => {
    const {currentPage, totalPages} = page;
    return `${currentPage + 1}/${totalPages}`;
  };

  useEffect(() => {
    if (client != null) {
      ref_client.current = client;
    }
  }, [client, connected]);

  useEffect(() => {
    console.log('finalData->', finalData);
  }, [finalData]);

  useEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation?.navigate('dScanField')}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'BalooBhai2-Bold',
              fontSize: moderateScale(16),
              marginRight: moderateScale(10),
            }}>
            Add Field
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    if (!headless) {
      setHeadless(true);
      AppRegistry.registerHeadlessTask('broadcastEvent', () => broadcastEvent);
    }
  }, []);

  return (
    <View className="mx-2 mt-6">
      {/* take confirmation to delete field entry  */}
      <DeleteModel
        visible={!deleteModelState?.hidden}
        {...deleteModelProps()}
      />
      <Header title={'Dashboard'} pageTag={getPageTag()} />
      <CardCarousel
        data={user?.fields}
        onActivePage={onChangePage}
        component={field => <Dashboard {...dash_props(field)} />}
      />
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
