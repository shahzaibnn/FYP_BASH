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

export default function PostSkeleton({}) {
  return (
    <SkeletonPlaceholder backgroundColor="#5BA199">
      <View
        style={{
          flexDirection: 'row',
          //   alignItems: 'center',
          marginLeft: '7%',
          marginVertical: '5%',
          alignItems: 'center',
        }}>
        <View style={{width: 60, height: 60, borderRadius: 64}} />
        <View style={{marginLeft: '5%'}}>
          <Image
            style={{width: 60, height: 12, borderRadius: 16}}
            src={require('../assets/images/bash_icon.png')}
          />
          <Text
            style={{
              marginTop: 6,
              fontSize: 10,
              lineHeight: 10,
              borderRadius: 16,
              width: '80%',
            }}>
            Hello world
          </Text>
          <Text
            style={{
              marginTop: 6,
              fontSize: 10,
              lineHeight: 10,
              width: '100%',
              borderRadius: 16,
            }}>
            Hello world
          </Text>
        </View>
      </View>

      <View
        style={{width: '84%', height: 200, borderRadius: 16, marginLeft: '7%'}}
      />
      <View
        style={{
          width: '80%',
          height: 50,
          borderRadius: 16,
          marginLeft: '10%',
          marginTop: '2%',
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginBottom: '7%',
        }}>
        <View
          style={{
            width: '20%',
            height: 45,
            borderRadius: 16,
            // marginLeft: '10%',
            marginTop: '2%',
          }}
        />
        <View
          style={{
            width: '20%',
            height: 45,
            borderRadius: 16,
            // marginLeft: '10%',
            marginTop: '2%',
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
}
