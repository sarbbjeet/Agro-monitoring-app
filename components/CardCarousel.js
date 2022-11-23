import React, {useEffect} from 'react';
import {
  ScrollView,
  Animated,
  SafeAreaView,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {useMqtt} from '../context/MQTTProvider';
import {moderateScale} from '../Scaling';

const OFFSET = 5;
const ITEM_WIDTH = Dimensions.get('window').width - OFFSET * 2;
const ITEM_HEIGHT = Dimensions.get('window').height - moderateScale(150);

const cards = [
  {
    title: 'Movie 1',
    posterUrl: require('../resources/field_images/potato.jpeg'),
  },
  {
    title: 'Movie 2',
    posterUrl: require('../resources/field_images/wheat_2.jpg'),
  },
  {
    title: 'Movie 3',
    posterUrl: require('../resources/field_images/wheat_field.png'),
  },
  {
    title: 'Movie 4',
    posterUrl: require('../resources/field_images/wheat_2.jpg'),
  },
];

export default function CardCarousel({data, component, onActivePage}) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const {
    finalData,
    publish_data,
    connectionState: {client, connected},
  } = useMqtt();

  //to insert into dashboards
  const getSensorValues = ({gateway, node}) => {
    const matched = finalData.find(
      d => d.gateway == gateway && d.node === node,
    );
    return matched?.data;
  };
  return (
    <ScrollView
      horizontal={true}
      decelerationRate={'normal'}
      snapToInterval={ITEM_WIDTH}
      style={{marginTop: 40, paddingHorizontal: 0}}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      disableIntervalMomentum
      onMomentumScrollEnd={({nativeEvent}) => {
        const totalPages = data?.length;
        const currentPage = Math.floor(
          // (nativeEvent.contentOffset.x ) /   real formula
          (nativeEvent.contentOffset.x + totalPages * 5) /
            nativeEvent.layoutMeasurement.width,
        );
        onActivePage({totalPages, currentPage});
      }}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: false,
      })}
      scrollEventThrottle={12}>
      {data.map((f, idx) => {
        const inputRange = [
          (idx - 1) * ITEM_WIDTH,
          idx * ITEM_WIDTH,
          (idx + 1) * ITEM_WIDTH,
        ];

        const translate = scrollX.interpolate({
          inputRange,
          outputRange: [0.85, 1, 0.85],
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
        });

        return (
          <Animated.View
            key={idx}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              marginLeft: idx === 0 ? OFFSET : undefined,
              marginRight: idx === cards.length - 1 ? OFFSET : undefined,
              opacity: opacity,
              transform: [{scale: translate}],
            }}>
            {component(f)}
          </Animated.View>
        );
      })}
    </ScrollView>
  );
}
