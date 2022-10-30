import { View, Text, StyleSheet } from "react-native";
import React from "react";
import DonutChart from "./DonutChart";
import CircularProgress from "react-native-circular-progress-indicator";
import { moderateScale } from "../Scaling";
import { colors } from "../constants/colors";

export default function RoundIndicator({
  title = "Temerature",
  value = 10,
  maxValue = 150,
  valueSuffix = "°C",
  activeStrokeColor = "red",
  isFloatValue = true,
}) {
  return (
    <View className="flex items-center p-2 border border-gray-300 rounded-3xl shadow">
      <Text style={styles.titleText}>{title}</Text>
      <CircularProgress
        value={value}
        maxValue={maxValue}
        radius={moderateScale(55)}
        duration={700}
        progressValueFontSize={moderateScale(20)}
        valueSuffix={valueSuffix}
        valueSuffixStyle={{ marginLeft: 2 }}
        // title="degree"
        progressValueColor={"#777"}
        // titleFontSize={16}
        titleColor={"#777"}
        progressValueStyle={{
          fontFamily: "BalooBhai_bold",
        }}
        // circleBackgroundColor={"#ff0000"}
        activeStrokeColor={activeStrokeColor}
        activeStrokeWidth={25}
        inActiveStrokeWidth={20}
        activeStrokeSecondaryColor={"#C3305D"}
        inActiveStrokeColor={"#fff"}
        progressFormatter={(value) => {
          "worklet";
          return value.toFixed(isFloatValue ? 1 : 0); // 2 decimal places
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "Poppins_semibold",
    fontSize: moderateScale(14),
    color: colors.dark_text,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(2),
  },
});
