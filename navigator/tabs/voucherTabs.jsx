import React, { useEffect, useState } from "react";
import {
  Platform,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSelector, useDispatch } from "react-redux";

import { scale, moderateScale, verticalScale } from "../../components/Scaling";
import AppStatusBar from "../../components/AppStatusBar";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import Vouchers from "../../screens/Vouchers";
import FilterModal from "../../components/FilterModal";

import { getCategoryVouchers } from "../../store/actions/vouchers";
const tTabs = createMaterialTopTabNavigator();

export default function VoucherTabs(props) {
  const dispatch = useDispatch();
  const { vouchers, users } = useSelector((state) => state);
  //filter modal visable
  const [modalVisible, setModalVisible] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const { currentSelectedCategory } = vouchers;
  useEffect(() => {
    //create header right side filter button
    props.navigation.setOptions({
      backgroundColor: "red",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ marginRight: moderateScale(15) }}
        >
          <Text
            style={{
              color: "white",
              fontSize: moderateScale(14),
              fontWeight: "bold",
            }}
          >
            Filter
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  // props.navigation.setOptions({
  //   backgroundColor: "red",
  //   headerRight: () => (
  //     <View>
  //       <Text>Filter</Text>
  //     </View>
  //   ),
  // props.navigation.setOptions({
  //   headerRight: () => {
  //     return (
  //       <View>
  //         <Text>Filter</Text>
  //       </View>
  //     );
  //   },

  const getTitle = () => {
    const titles = [
      "Leisure & Days Out",
      "Restaurants & Dining Out",
      "Hair & Beauty",
    ];
    return titles[currentSelectedCategory - 1];
  };
  const changeTab = (tabIndex) => {
    dispatch({
      type: "SELECT_CATEGORY_AND_CLEAR_SEARCH",
      payload: { categoryId: tabIndex + 1 },
    });
  };

  const getColour = () => {
    const highlightColors = ["#C3D03D", "#00AC9F", "#FF2749"];
    return highlightColors[currentSelectedCategory - 1];
  };

  const highlightColor = getColour();
  const title = getTitle();
  const getCategoryData = (key) => {
    const category = vouchers.categories[currentSelectedCategory];
    return category[key];
  };

  const filterVouchers = () => {
    //reset vouchers of current category  //
    setFiltered(true); //filter button is used / /
    dispatch({
      type: "RESET_CATEGORY",
      payload: { categoryId: currentSelectedCategory },
    });
    setTimeout(
      () =>
        dispatch(
          getCategoryVouchers(
            currentSelectedCategory,
            users.token,
            getCategoryData("currentPage"),
            true,
            vouchers.searchParams,
            users.selectedUserBookId
          )
        ),
      500
    );
  };
  return (
    <>
      {/* below statusbar color is only work for andorid  */}
      <FocusAwareStatusBar backgroundColor={highlightColor} />

      {/* <AppStatusBar backgroundColor={highlightColor} /> */}

      <View
        style={{
          flex: 1,
          position: "relative",
          paddingBottom:
            Platform.OS === "android" ? moderateScale(0) : moderateScale(40),
        }}
      >
        <FilterModal
          visible={modalVisible}
          themeColor={highlightColor}
          onSearch={() => {
            filterVouchers();
            setModalVisible(false);
          }}
          onCancel={() => setModalVisible(false)}
        />

        <tTabs.Navigator
          screenListeners={{
            state: (e) => {
              changeTab(e.data.state.index);
              // Do something with the state
              // console.log("state changed", e.data.state.index);
            },
          }}
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: "black",
              height: 3,
            },
            tabBarInactiveTintColor: "white",
            tabBarLabelStyle: {
              fontSize: 14,
              letterSpacing: 1,
              // fontWeight: "",
            },
            tabBarActiveTintColor: "white",
            tabBarStyle: {
              backgroundColor: highlightColor,
            },
          }}
        >
          <tTabs.Screen
            name="vTab1"
            options={{ title: "Leisure" }}
            component={Vouchers}
            // listeners={({ navigation, route }) => ({
            //   tabPress: (e) => this.changeTab(0),
            // })}
          >
            {/* {(props) => (
              <Test1 {...props} extraData={{ msg: "welcome to Home screen" }} />
            )} */}
          </tTabs.Screen>

          <tTabs.Screen
            name="vTab2"
            options={{ title: "Dining Out" }}
            component={Vouchers}
          />

          <tTabs.Screen
            name="vTab3"
            component={Vouchers}
            options={{ title: "Beauty" }}
          />
        </tTabs.Navigator>
      </View>
    </>
  );
}
