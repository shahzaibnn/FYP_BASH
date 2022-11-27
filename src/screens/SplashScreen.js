import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import {CommonActions} from '@react-navigation/native';

export default function SplashScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#5BA199',
      }}>
      <LottieView
        source={require('../assets/animations/splash.json')}
        autoPlay
        loop={false}
        speed={1}
        onAnimationFinish={() => {
          console.log('Animation Finished!');
          navigation.navigate('Start');
          // navigation.dispatch('StartScreen');
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Start'}],
            }),
          );
        }}
      />
    </View>
  );
}
