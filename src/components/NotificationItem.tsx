import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  useDerivedValue,
} from 'react-native-reanimated';

const NotificationHeight = 80;

const NotificationItem = ({
  data,
  index,
  listVisiblity,
  footerHeight,
  scrollY,
}: any) => {
  const {height} = useWindowDimensions();
  const containerHeight = useDerivedValue(
    () => height - 250 - footerHeight.value,
  );
  const startPosition: number = NotificationHeight * index;
  // const animatedStyle2 = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateY: interpolate(
  //           listVisiblity.value,
  //           [0, 1],
  //           [containerHeight - startPosition, 1],
  //         ),
  //       },
  //       {
  //         scale: interpolate(listVisiblity.value, [0, 1], [0.5, 1]),
  //       },
  //     ],
  //     opacity: listVisiblity.value,
  //   };
  // });
  const animatedStyle = useAnimatedStyle(() => {
    const position1 = startPosition - containerHeight.value;
    const position2 =
      startPosition + NotificationHeight - containerHeight.value;
    if (listVisiblity.value >= 1) {
      return {
        opacity: interpolate(scrollY.value, [position1, position2], [0, 1]),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              [position1, position2],
              [-NotificationHeight / 2, 0],
              Extrapolation.CLAMP,
            ),
          },
          {
            scale: interpolate(
              scrollY.value,
              [position1, position2],
              [0.5, 1],
              Extrapolation.CLAMP,
            ),
          },
        ],
      };
    } else {
      return {
        transform: [
          {
            translateY: interpolate(
              listVisiblity.value,
              [0, 1],
              [containerHeight.value - startPosition, 1],
            ),
          },
          {
            scale: interpolate(listVisiblity.value, [0, 1], [0.5, 1]),
          },
        ],
        opacity: listVisiblity.value,
      };
    }
  });
  return (
    <Animated.View style={[styles.container, animatedStyle]} key={index}>
      <Image source={data.icon} style={styles.icon} />
      <View style={{flex: 1}}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {data.subtitle}
        </Text>
      </View>
      <Text style={styles.time}>{data.createdAt} ago</Text>
    </Animated.View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: '#00000075',
    margin: 5,
    marginHorizontal: 10,
    padding: 13,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  time: {
    color: 'lightgray',
    fontSize: 12,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    color: 'white',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  subtitle: {
    color: 'white',
    lineHeight: 18,
    letterSpacing: 0.2,
  },
});
