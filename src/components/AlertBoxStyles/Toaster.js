import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const Toaster = props => {
  console.log('ooo' + props.msg);
  console.log('ooo' + props.emailId);

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={{
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.1,
        backgroundColor: '#4CA6A8',
        position: 'absolute',
        padding: 10,
        marginHorizontal: Dimensions.get('window').width * 0.1,
        marginTop: '30%',
        // borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 32,
      }}>
      <MaterialIcons
        name="mark-email-read"
        size={25}
        color="white"
        style={{
          // alignItems: 'center',
          // justifyContent: 'center',
          // alignSelf: 'flex-start',
          marginLeft: '5%',
          // marginTop: '5%',
        }}
      />

      <Text
        style={{
          fontStyle: 'italic',
          alignSelf: 'center',
          fontSize: 16,
          color: 'white',
          // fontWeight: '',
        }}>
        {props.msg}
        {props.emailId}
      </Text>
    </Animated.View>
  );
};
