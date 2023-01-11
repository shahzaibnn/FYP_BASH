import React from 'react';
import {View, Text} from 'react-native';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';

export const Toaster = () => {
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={{
        width: '90%',
        backgroundColor: '#4CA6A8',
        position: 'absolute',
        padding: 10,
        alignItems: 'center',
        top: 50,
        // left: 20,
        // right: 20,
        borderRadius: 8,
      }}>
      <Text style={{color: 'white', fontSize: 20}}>
        {'Hello, Welcome to our BASH App'}
      </Text>
    </Animated.View>
  );
};
