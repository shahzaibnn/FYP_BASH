import {
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function StartScreen() {
  return (
    <ScrollView style={{backgroundColor: '#E5E3E4', flex: 1}}>
      <Image
        source={require('../assets/images/start_image.png')}
        style={{
          // backgroundColor: '#E5E3E4',
          // marginHorizontal: '5%',
          marginVertical: '10%',
          height: Dimensions.get('window').height * 0.55,
          width: Dimensions.get('window').width * 0.85,
          alignSelf: 'center',
        }}
        resizeMode="stretch"
      />

      <Text
        style={{
          color: '#000000',
          fontSize: 40,
          textAlign: 'center',
          fontWeight: 'bold',
          // marginTop: '10%',
        }}>
        Let's Connect
      </Text>

      <Text
        style={{
          textAlign: 'center',
          fontStyle: 'italic',
          width: '50%',
          alignSelf: 'center',
          color: '#777777',
          marginTop: '5%',
          fontSize: 20,
        }}>
        and stregthen the community to discover more oppurtunities
      </Text>

      <TouchableOpacity
        style={{
          alignSelf: 'center',
          backgroundColor: '#469597',
          // paddingHorizontal: '20%',
          paddingVertical: '5%',
          marginTop: '7%',
          // marginHorizontal: '5%',
          width: '80%',
          borderRadius: 32,
        }}>
        <Text
          style={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 22,
            textAlign: 'center',
          }}>
          Get Started
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
