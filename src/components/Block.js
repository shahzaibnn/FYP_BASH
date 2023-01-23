import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const Block = () => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withDelay(
      // random offset to make it prettier
      2000 * Math.random(),
      withRepeat(
        withSequence(
          withTiming(0.4, {duration: 1000}),
          withTiming(1, {duration: 1000}),
        ),
        // "-1" => the loop is infinite
        -1,
        // "true" => when the animation has ended, it is triggered backwards
        true,
      ),
    ),
  }));

  return <Animated.View style={[animatedStyle, styles.block]}></Animated.View>;
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
  },
});
