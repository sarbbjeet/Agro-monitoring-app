import React, {useEffect, useState} from 'react';
import {Avatar} from 'react-native-elements';
// import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
//import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {DrawerActions} from '@react-navigation/native';
import {moderateScale, verticalScale} from '../Scaling';
import {navheaderFont} from '../constants/theme';
const farmer = {
  name: 'sarbjit singh ',
  id: 'a9902',
};
const menuRoutes = [
  {
    id: 1,
    title: 'Home',
    route: 'dHome',
    icon: 'home',
  },
  {
    id: 2,
    title: 'Configure Gateway',
    route: 'dSettings',
    icon: 'setting',
  },
  {
    id: 3,
    title: 'About',
    route: 'dAbout',
    icon: 'contacts',
  },
];

const Item = ({title, route, navigation, icon}) => {
  const [event, setEvent] = useState(false);
  return (
    <TouchableOpacity
      style={{
        ...styles.listItem,
        backgroundColor: event ? '#ccc' : 'white',
      }}
      onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
        navigation.navigate(route);
      }}>
      {/* <AntDesign
        name={icon}
        size={moderateScale(22)}
        color="black"
        style={{ paddingHorizontal: 5 }}
      /> */}
      <Text style={styles.drawerItemText}> {title} </Text>
    </TouchableOpacity>
  );
};

const AppButton = ({title = 'button', onPress, icon}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.listItem,
      }}
      onPress={onPress}>
      {/* <AntDesign
        name={icon}
        size={moderateScale(22)}
        color="black"
        style={{paddingHorizontal: 5}}
      /> */}
      <Text style={styles.drawerItemText}> {title} </Text>
    </TouchableOpacity>
  );
};

export default function CustomDrawer(props) {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          ...styles.Container,
          paddingTop: 40,
          backgroundColor: navheaderFont.backgroundColor,
        }}>
        <Avatar
          rounded
          source={require('../resources/img_avatar.png')}
          size={moderateScale(85)}
          onPress={() => console.log('Works!')}
          activeOpacity={0.4}
        />
        <Text
          className=""
          style={{
            ...styles.text,
            fontSize: moderateScale(22),
            fontFamily: 'BalooBhai_semibold',
            textTransform: 'capitalize',
            padding: moderateScale(5),
          }}>
          {farmer.name}
        </Text>
      </View>
      <View style={{flex: 7}}>
        <ScrollView style={{width: '100%', marginTop: 4}}>
          {menuRoutes.map(({id, title, route, icon}) => (
            <View key={id}>
              <Item title={title} route={route} {...props} icon={icon} />
              <View style={styles.divider} />
            </View>
          ))}
          <AppButton title="Logout" icon="logout" />
        </ScrollView>
      </View>
      <View
        style={{
          ...styles.footer,
          backgroundColor: navheaderFont.backgroundColor,
        }}>
        <Text style={styles.footerTag}>Agriculture Monitoring System</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    letterSpacing: 1.2,
    color: '#fff',
  },
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // flex: 2,
    backgroundColor: navheaderFont.backgroundColor,
  },
  drawerItem: {
    paddingVertical: moderateScale(20),
    paddingLeft: 10,
  },
  drawerItemText: {
    fontSize: moderateScale(16),
    fontFamily: 'Poppins_semibold',
  },

  listItem: {
    paddingLeft: moderateScale(16),
    paddingVertical: moderateScale(8),
    marginLeft: moderateScale(4),
    borderBottomWidth: 0,
    flexDirection: 'row',
  },
  divider: {
    width: '100%',
    height: 1,
    marginVertical: moderateScale(10),
    backgroundColor: '#eee',
  },
  footer: {
    backgroundColor: '#D90080',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  footerTag: {
    color: '#FDFFE2',
    fontFamily: 'BalooBhai_regular',
    fontSize: moderateScale(18),
  },
});
