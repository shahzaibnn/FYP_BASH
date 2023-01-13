import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';

export const Toaster = props => {
  console.log('ooo' + props.msg);
  console.log('ooo' + props.emailId);

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={{
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.15,
        backgroundColor: '#4CA6A8',
        position: 'absolute',
        padding: 10,
        // alignItems: 'center',
        // top: 50,
        marginRight: '15%',
        marginLeft: '15%',
        // paddingTop: '45%',
        marginTop: '30%',
        // marginTop: '25%',
        // left: '20',
        // right: 20,
        borderRadius: 8,
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 18,
          textAlign: 'center',
          // fontStyle: 'italic',
        }}>
        {props.msg}
        {props.emailId}
      </Text>
      {/* <Text style={{color: 'white', fontSize: 20}}>hello</Text> */}
    </Animated.View>
  );
};
