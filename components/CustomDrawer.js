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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowRightFromBracket,
  faGear,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import {faContactBook} from '@fortawesome/free-regular-svg-icons';
import {useAuth} from '../context/AuthProvider';
const farmer = {
  name: 'sarbjit singh ',
  id: 'a9902',
};

const Item = ({route, navigation, children}) => {
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
      {children}
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
      <FontAwesomeIcon
        icon={faArrowRightFromBracket}
        size={moderateScale(22)}
        style={{marginRight: moderateScale(10)}}
      />
      <Text style={styles.drawerItemText}> {title} </Text>
    </TouchableOpacity>
  );
};

export default function CustomDrawer(props) {
  const {logout} = useAuth();
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
            ...styles.headerName,
          }}>
          {farmer.name}
        </Text>
      </View>
      <View style={{flex: 7}}>
        <ScrollView style={{width: '100%', marginTop: 4}}>
          <Item title="Home" route="dHome" {...props}>
            <FontAwesomeIcon
              icon={faHome}
              size={moderateScale(22)}
              style={{marginRight: moderateScale(10)}}
            />
            <Text style={styles.drawerItemText}> Home </Text>
          </Item>
          <View style={styles.divider} />
          <Item title="Settings" route="dSettings" {...props}>
            <FontAwesomeIcon
              icon={faGear}
              size={moderateScale(22)}
              style={{marginRight: moderateScale(10)}}
            />
            <Text style={styles.drawerItemText}> Gateway Settings </Text>
          </Item>
          <View style={styles.divider} />
          <Item title="About" route="dAbout" {...props}>
            <FontAwesomeIcon
              icon={faContactBook}
              size={moderateScale(22)}
              style={{marginRight: moderateScale(10)}}
            />
            <Text style={styles.drawerItemText}> About </Text>
          </Item>
          <View style={styles.divider} />

          <AppButton title="Logout" icon="logout" onPress={logout} />
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
  headerName: {
    fontSize: moderateScale(20),
    fontFamily: 'BalooBhai2-Bold',
    textTransform: 'capitalize',
    padding: moderateScale(5),
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
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-SemiBold',
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
    fontFamily: 'BalooBhai2-Regular',
    fontSize: moderateScale(18),
  },
});
