import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import Animated, {
  interpolate,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
const IMAGE_OFFSET = 100;
const PI = Math.PI;
const HALF_PI = PI / 2;

const SensorAnimatedImage = ({image, order}: any) => {
  const {width, height} = useWindowDimensions();
  const sensor = useAnimatedSensor(SensorType.ROTATION);
  const imageStyle = useAnimatedStyle(() => {
    // pitch image to bottom or top
    // roll image to left or right
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {yaw, pitch, roll} = sensor.sensor.value;
    // console.log(yaw.toFixed(1), pitch.toFixed(1), roll.toFixed(1));
    return {
      top: withTiming(
        interpolate(
          pitch,
          [-HALF_PI, HALF_PI],
          [(-IMAGE_OFFSET * 2) / order, 0],
        ),
      ),
      left: withTiming(
        interpolate(roll, [-PI, PI], [(-IMAGE_OFFSET * 2) / order, 0]),
      ),
    };
  });
  return (
    <Animated.Image
      style={[
        {
          width: width + (2 * IMAGE_OFFSET) / order,
          height: height + (2 * IMAGE_OFFSET) / order,
        },
        styles.image,
        imageStyle,
      ]}
      source={image}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
  },
});

export default SensorAnimatedImage;
