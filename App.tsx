import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LockScreen from './src/screens/LockScreens';
// import SensorAnimatedImage from './src/components/SensorAnimatedImage';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import LockScreen from './src/screens/LockScreens';

const App = () => {
  // let arr: any = [
  //   require('./assets/images/Parallax/2.png'),
  //   require('./assets/images/Parallax/3.png'),
  //   require('./assets/images/Parallax/4.png'),
  //   require('./assets/images/Parallax/5.png'),
  // ];
  return (
    <GestureHandlerRootView style={styles.container}>
      <LockScreen />

      {/* <Parallax layers={arr} /> */}
      {/* <SensorAnimatedImage image={require('./assets/images/bg.jpeg')} /> */}
      <StatusBar barStyle={'light-content'} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
