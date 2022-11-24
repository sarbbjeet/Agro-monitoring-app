import {View, Text, ScrollView, RefreshControl} from 'react-native';
import React from 'react';

export default function PullDownRefresh({children, _onEvent}) {
  //pull down to refresh logic
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    //apply code
    _onEvent();
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  ///////////////////////////////////////////////////

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {children}
    </ScrollView>
  );
}
