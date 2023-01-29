import {
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function SkeletonPropertyList({}) {
  return (
    <SkeletonPlaceholder backgroundColor="#5BA199">
      <View
        style={{
          flexDirection: 'row',
          //   alignItems: 'center',
          marginLeft: Dimensions.get('screen').width * 0.05,
          marginBottom: Dimensions.get('screen').height * 0.05,
          marginTop: Dimensions.get('screen').height * 0.02,
        }}>
        <View style={{width: 60, height: 60, borderRadius: 16}} />
        <View style={{marginLeft: 20}}>
          <Image
            style={{width: 130, height: 10, borderRadius: 16}}
            src={require('../assets/images/bash_icon.png')}
          />
          <Text
            style={{
              marginTop: 6,
              fontSize: 14,
              lineHeight: 18,
              borderRadius: 16,
            }}>
            Hello world
          </Text>
          <Text
            style={{
              marginTop: 6,
              fontSize: 10,
              lineHeight: 10,
              width: Dimensions.get('screen').width * 0.4,
              borderRadius: 16,
            }}>
            Hello world
          </Text>
        </View>
        <View
          style={{
            marginLeft: Dimensions.get('screen').width * 0.06,
            width: 10,
            height: 30,
            borderRadius: 32,
          }}
        />
      </View>
      <View
        style={{
          marginLeft: Dimensions.get('screen').width * 0.07,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: Dimensions.get('screen').height * 0.07,
        }}>
        <View style={{width: 120, height: 30, borderRadius: 32}} />
        <Text
          style={{
            marginLeft: Dimensions.get('screen').width * 0.05,
            fontSize: 10,
            lineHeight: 10,
            width: Dimensions.get('screen').width * 0.3,
            borderRadius: 16,
          }}>
          Hello world
        </Text>
      </View>
    </SkeletonPlaceholder>
  );
}
