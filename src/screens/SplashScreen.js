import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
// import {CommonActions} from '@react-navigation/native';

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#E5E3E4',
      }}>
      <LottieView
        source={require('../assets/animations/splash.json')}
        autoPlay
        loop={false}
        speed={1}
        onAnimationFinish={() => {
          console.log('Animation Finished!');
          //   navigation.navigate('StartScreen');
          //   // navigation.dispatch('StartScreen');
          //   navigation.dispatch(
          //     CommonActions.reset({
          //       index: 1,
          //       routes: [{name: 'StartScreen'}],
          //     }),
          //   );
        }}
      />
    </View>
  );
}
