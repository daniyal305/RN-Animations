import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
} from 'react-native-reanimated';

const SwipeUpToOpen = () => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withRepeat(
          withSequence(
            withTiming(-15),
            withDelay(1500, withTiming(0)),
            withTiming(-15),
          ),
          -1,
        ),
      },
    ],
    opacity: withRepeat(
      withSequence(
        withDelay(1500, withTiming(0)),
        withDelay(300, withTiming(1)),
      ),
      //   -1 to repeat immedietly
      -1,
    ),
  }));
  return (
    <Animated.Text style={[styles.textStyle, animatedStyle]}>
      Swipe up to open
    </Animated.Text>
  );
};

export default SwipeUpToOpen;
const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontWeight: '600',
    alignSelf: 'flex-end',
    letterSpacing: 0.5,
  },
});
