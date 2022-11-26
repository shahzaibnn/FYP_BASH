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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ForgotPassword() {
  const [text, setText] = useState('');

  const [id, setId] = useState('');
  const [email, setEmail] = useState('');

  console.log(id);
  console.log(email);

  return (
    <ScrollView style={{backgroundColor: '#E5E3E4'}}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          marginTop: '10%',
          marginLeft: '6%',
        }}>
        <AntDesign name="leftcircle" size={32} color="#777777" />
      </TouchableOpacity>
      <Text
        style={{
          color: '#469597',
          textAlign: 'center',
          justifyContent: 'center',
          fontSize: 30,
          fontWeight: 'bold',
          marginTop: '8%',
          marginLeft: '5%',
        }}>
        Forgot Password
      </Text>
      <View
        style={{
          backgroundColor: '#ffffff',
          width: Dimensions.get('window').width * 0.8,
          //   height: Dimensions.get('window').height * 0.8,
          marginHorizontal: '10%',
          marginTop: '50%',
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
          onChangeText={setId}
          value={id}
          placeholder="Student ID"
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
        <MaterialCommunityIcons
          name="email-outline"
          size={20}
          color="#777777"
          style={{
            marginHorizontal: '5%',
            width: 20,
          }}
        />
        <TextInput
          style={{flex: 1}}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
      </View>

      <TouchableOpacity
        style={{
          marginHorizontal: '10%',
          marginTop: '10%',
          backgroundColor: '#469597',
          paddingVertical: '4%',
          borderRadius: 16,
        }}>
        <Text
          style={{
            color: '#ffffff',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Generate Password
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
