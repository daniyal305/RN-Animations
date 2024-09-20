import dayjs from 'dayjs';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import Animated, {
  interpolate,
  SlideInDown,
  SlideInUp,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  useAnimatedGestureHandler,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import NotificationList from '../components/NotificationList';
import SwipeUpToOpen from '../components/SwipeUpToOpen';
import {PanGestureHandler} from 'react-native-gesture-handler';
const LockScreen = () => {
  const [date, setDate] = useState(dayjs());
  const footerVisiblity = useSharedValue(1);
  const {height} = useWindowDimensions();
  const y = useSharedValue(0);

  const footerHeight = useDerivedValue(() =>
    interpolate(footerVisiblity.value, [1, 0], [0, 85]),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);
  const animatedFooterStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(footerVisiblity.value, [0, 1], [-85, 0]),
    opacity: footerVisiblity.value,
  }));
  const Header = useMemo(
    () => (
      <Animated.View entering={SlideInUp} style={styles.header}>
        {/* <Ionicons name="ios-lock-closed" size={20} color="white" /> */}
        <Text style={styles.date}>{date.format('dddd, DD MMMM')}</Text>
        <Text style={styles.time}>{date.format('hh:mm')}</Text>
      </Animated.View>
    ),
    [date],
  );
  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(y.value - height, {
          duration: 100,
          easing: Easing.linear,
        }),
      },
    ],
  }));
  const UnlockGesture = useAnimatedGestureHandler({
    onStart: () => {
      console.log('on Start');
    },
    onActive: event => {
      // console.log(event, 'on Active');
      y.value = event.absoluteY;
    },
    onEnd: event => {
      console.log(event, 'on End');
      if (event.velocityY < -500) {
        // unlock
        y.value = withTiming(0, {easing: Easing.linear});
      } else if (event.velocityY > 500) {
        // reset
        y.value = withTiming(height, {easing: Easing.linear});
      } else if (y.value < height / 2 || event.velocityY < -500) {
        // unlock
        y.value = withTiming(0, {easing: Easing.linear});
      } else {
        // reset
        y.value = withTiming(height, {easing: Easing.linear});
      }
    },
  });
  return (
    <>
      <Image
        source={require('../../assets/images/home2.jpg')}
        style={[styles.image, StyleSheet.absoluteFill]}
      />

      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <ImageBackground
          source={require('../../assets/images/wallpaper.webp')}
          resizeMode="cover"
          style={[styles.container]}>
          <NotificationList
            footerVisiblity={footerVisiblity}
            footerHeight={footerHeight}
            ListHeaderComponent={Header}
          />
          <Animated.View
            entering={SlideInDown}
            style={[styles.footer, animatedFooterStyle]}>
            <View style={styles.icon}>
              {/* <MaterialCommunityIcons name="flashlight" size={24} color="white" /> */}
            </View>
            <SwipeUpToOpen />

            <View style={styles.icon}>
              {/* <Ionicons name="ios-camera" size={24} color="white" /> */}
            </View>
          </Animated.View>
          <PanGestureHandler onGestureEvent={UnlockGesture}>
            <Animated.View style={styles.panGestureContainerUnlock} />
          </PanGestureHandler>
        </ImageBackground>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
    // alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
  },
  date: {
    color: '#C3FFFE',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
  },
  time: {
    fontSize: 82,
    fontWeight: 'bold',
    color: '#C3FFFE',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    height: 75,
  },
  icon: {
    backgroundColor: '#00000050',
    width: 50,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  panGestureContainerUnlock: {
    position: 'absolute',
    width: '100%',
    height: 200,
    bottom: 0,
    left: 0,
    transform: [
      {
        translateY: 100,
      },
    ],
  },
});

export default LockScreen;
