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
      <View
        style={
          {
            //   backgroundColor: '#777777',
            // width: Dimensions.get('window').width * 0.8,
            // //   height: Dimensions.get('window').height * 0.8,
            // marginHorizontal: '10%',
            // marginTop: '40%',
            // borderRadius: 16,
            // flexDirection: 'row',
            // alignItems: 'center',
            // marginBottom: '7%',
            // justifyContent: 'center',
          }
        }>
        <MaterialIcons
          name="mark-email-read"
          size={25}
          color="green"
          style={{
            // alignItems: 'center',
            // justifyContent: 'center',
            alignSelf: 'flex-start',
            marginLeft: '5%',
            // marginTop: '5%',
          }}
        />
        {/* <Toaster msg="Check Email Please"></Toaster> */}

        <Text
          style={{
            // alignItems: 'center',
            justifyContent: 'center',
            marginTop: '-10%',
            marginLeft: '10%',
            fontStyle: 'italic',
            alignSelf: 'center',
            fontSize: 16,
            // fontWeight: '',
          }}>
          {/* Email sent successfully! */}
          {props.msg}
          {props.emailId}
        </Text>
      </View>

      {/* <MaterialCommunityIcons
        name="email-outline"
        size={20}
        color="#777777"
        style={{
          marginHorizontal: '5%',
          width: 20,
        }}
      /> */}
      {/* <Text
        style={{
          color: 'white',
          fontSize: 18,
          textAlign: 'center',
          // fontStyle: 'italic',
        }}>
        {props.msg}
        {props.emailId}
      </Text> */}
      {/* <Text style={{color: 'white', fontSize: 20}}>hello</Text> */}
    </Animated.View>
  );
};