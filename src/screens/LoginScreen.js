import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LoginScreen() {
  const [text, onChangeText] = useState('');

  const [password, onChangePassword] = useState('');

  return (
    <ScrollView style={{backgroundColor: '#E5E3E4'}}>
      {/* <Text>check</Text> */}
      <FastImage
        source={require('../assets/images/bash_icon.png')}
        style={{
          // width: Dimensions.get('window').width,
          // height: Dimensions.get('window').height / 2,
          minHeight: Dimensions.get('window').height * 0.4,
          minWidth: Dimensions.get('window').width,
        }}
        resizeMode="cover"
      />

      <Text
        style={{
          fontSize: 35,
          textAlign: 'center',
          color: '#000000',
          marginTop: '-10%',
          fontWeight: 'bold',
        }}>
        Welcome
      </Text>

      <Text
        style={{
          color: '#5BA199',
          marginHorizontal: '10%',
          marginVertical: '5%',
          fontSize: 20,
        }}>
        Sign in to continue
      </Text>

      <View
        style={{
          backgroundColor: '#ffffff',
          width: Dimensions.get('window').width * 0.8,
          marginHorizontal: '10%',
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '7%',
        }}>
        <FontAwesome
          name="user-circle-o"
          size={20}
          color="#777777"
          style={{marginHorizontal: '5%', width: 20}}
        />
        <TextInput
          style={{flex: 1}}
          onChangeText={onChangeText}
          value={text}
          placeholder="UserName / ID"
        />
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
          width: Dimensions.get('window').width * 0.8,
          marginHorizontal: '10%',
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FontAwesome5
          name="lock"
          size={20}
          color="#777777"
          style={{
            marginHorizontal: '5%',
            width: 20,
          }}
        />
        <TextInput
          style={{flex: 1}}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
        />

        <TouchableOpacity style={{marginRight: '8%'}}>
          <MaterialCommunityIcons
            name="eye-off"
            size={20}
            color="#777777"
            style={
              {
                // marginHorizontal: '5%',
                // width: 20,
              }
            }
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{marginHorizontal: '10%', marginVertical: '8%'}}>
        <Text style={{color: '#5BA199', textAlign: 'right'}}>
          Forget Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginHorizontal: '10%',
          backgroundColor: '#469597',
          paddingVertical: '4%',
          borderRadius: 16,
        }}>
        <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 18}}>
          LOGIN
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: '10%',
          marginVertical: '7%',
        }}>
        <Text style={{fontSize: 18, color: '#5BA199'}}>New User? </Text>

        <TouchableOpacity>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#5BA199'}}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
