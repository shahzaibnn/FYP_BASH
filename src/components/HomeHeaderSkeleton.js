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

export default function HomeHeaderSkeleton({}) {
  return (
    <SkeletonPlaceholder backgroundColor="#5BA199">
      <View
        style={{
          flexDirection: 'row',
          //   alignItems: 'center',
          marginLeft: '7%',
          marginVertical: '5%',
        }}>
        <View style={{width: 60, height: 60, borderRadius: 64}} />
        <View
          style={{width: '75%', height: 60, borderRadius: 16, marginLeft: '3%'}}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: '7%',
          borderRadius: 16,
          justifyContent: 'space-between',
        }}>
        <View style={{width: '50%', height: 10}} />
        <View style={{width: '15%', height: 6}} />
      </View>
    </SkeletonPlaceholder>
  );
}
