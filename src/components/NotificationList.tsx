import React from 'react';
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import notifications from '../../assets/data/notifications';
import NotificationItem from './NotificationItem';
const NotificationList = ({
  footerVisiblity,
  footerHeight,
  ...FlatListProps
}: any) => {
  // const {height} = useWindowDimensions();
  const listVisiblity = useSharedValue(1);
  const scrollY = useSharedValue(0);
  const handler = useAnimatedScrollHandler({
    onScroll: event => {
      const {y} = event.contentOffset;
      scrollY.value = y;
      if (y < 10) {
        // ,{duration:1000}
        footerVisiblity.value = withTiming(1, {easing: Easing.linear});
      } else {
        footerVisiblity.value = withTiming(0, {easing: Easing.linear});
      }
    },
    onBeginDrag: event => {
      const {y} = event.contentOffset;
      if (y < 1) {
        listVisiblity.value = withSpring(1);
      }
    },
    onEndDrag: event => {
      const {y} = event.contentOffset;
      if (y < 0) {
        listVisiblity.value = withTiming(0);
      }
    },
  });

  return (
    <Animated.FlatList
      data={notifications}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16} // Ensures smooth updates for scrolling
      // contentContainerStyle={{paddingVertical: 20}} // Adds some padding to avoid cutoff
      {...FlatListProps}
      renderItem={({item, index}) => (
        <NotificationItem
          data={item}
          index={index}
          listVisiblity={listVisiblity}
          scrollY={scrollY}
          footerHeight={footerHeight}
        />
      )}
      onScroll={handler}
    />
  );
};

export default NotificationList;

// const styles = StyleSheet.create({});
