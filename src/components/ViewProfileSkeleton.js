import {View, Text} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import PostSkeleton from './PostSkeleton';

export default function ViewProfileSkeleton() {
  return (
    <SkeletonPlaceholder backgroundColor="#5BA199">
      <View
        style={{
          width: 200,
          height: 200,
          borderRadius: 16,
          alignSelf: 'center',
          marginTop: 20,
        }}
      />

      <View
        style={{
          width: 80,
          height: 20,
          marginTop: 20,
          marginLeft: '5%',
          borderRadius: 16,
        }}
      />
      <View
        style={{
          width: 180,
          height: 10,
          marginTop: 10,
          marginLeft: '5%',
          borderRadius: 16,
        }}
      />

      <View
        style={{
          width: 50,
          height: 25,
          marginTop: 20,
          marginLeft: '5%',
          borderRadius: 16,
        }}
      />

      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: 70,
            height: 30,
            marginTop: 10,
            marginLeft: '5%',
            borderRadius: 32,
          }}
        />

        <View
          style={{
            width: 70,
            height: 30,
            marginTop: 10,
            marginLeft: '5%',
            borderRadius: 32,
          }}
        />

        <View
          style={{
            width: 70,
            height: 30,
            marginTop: 10,
            marginLeft: '5%',
            borderRadius: 32,
          }}
        />

        <View
          style={{
            width: 70,
            height: 30,
            marginTop: 10,
            marginLeft: '5%',
            borderRadius: 32,
          }}
        />
      </View>

      <View
        style={{
          width: 70,
          height: 25,
          marginTop: 20,
          marginLeft: '5%',
          borderRadius: 16,
        }}
      />

      <Text
        style={{
          width: '90%',
          height: 60,
          marginTop: 20,
          marginLeft: '5%',
          borderRadius: 16,
        }}>
        hggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
      </Text>

      <View
        style={{
          width: 70,
          height: 40,
          marginTop: 20,
          marginLeft: '5%',
          borderRadius: 16,
          alignSelf: 'center',
        }}
      />

      <View
        style={{
          width: 90,
          height: 20,
          marginTop: 20,
          marginLeft: '5%',
          borderRadius: 16,
          alignSelf: 'center',
        }}
      />

      <View
        style={{
          width: 80,
          height: 25,
          marginTop: 20,
          marginLeft: '5%',
          borderRadius: 16,
        }}
      />

      <View
        style={{
          width: 200,
          height: 80,
          marginTop: 20,
          marginLeft: '5%',
          borderRadius: 16,
        }}
      />
    </SkeletonPlaceholder>
  );
}
