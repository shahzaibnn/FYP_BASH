import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase/compat/app';

import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {auth} from '@react-native-firebase/auth';
import {db, authorization, auth} from '../Firebase/Config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
// import {useNavigation} from '@react-navigation/core';
// import {useNavigation} from '@react-navigation/native';
export default function LoginScreen({navigation}) {
  // export default function LoginScreen() {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [eye, setEye] = useState('eye');

  console.log(email);
  console.log(password);
  // const navigation = useNavigation();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log('logged in');
        navigation.navigate('Home');
      } else {
        console.log('not logged in');
      }
      // Check for user status
    });

    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   if (user) {
    //     navigation.navigate('HomeScreen');
    //   }
    // }

    // );
    // return unsubscribe;
  });

  const handleLogin = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(cred => {
        console.log(cred);
        console.log('success');
        const user = cred.user;
        console.log('Logged in as ', user.email);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <ScrollView style={{backgroundColor: '#E5E3E4'}}>
      {/* <Text>check</Text> */}
      <Image
        source={require('../assets/images/bash_icon.png')}
        style={{
          height: Dimensions.get('window').height * 0.4,
          width: Dimensions.get('window').width,
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
          // marginHorizontal: '10%',
        }}>
        Welcome
      </Text>

      <Text
        style={{
          color: '#5BA199',
          marginHorizontal: '12%',
          marginVertical: '5%',
          fontSize: 18,
          // textAlign: 'center',
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
          onChangeText={email => setEmail(email)}
          value={email}
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
          onChangeText={password => setPassword(password)}
          value={password}
          placeholder="Password"
          secureTextEntry={passwordVisible}
        />

        <TouchableOpacity
          style={{marginRight: '8%'}}
          onPress={() => {
            setPasswordVisible(!passwordVisible);
            if (passwordVisible) {
              setEye('eye-off');
            } else {
              setEye('eye');
            }
          }}>
          <MaterialCommunityIcons
            name={eye}
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

      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
        style={{marginHorizontal: '10%', marginVertical: '8%'}}>
        <Text style={{color: '#5BA199', textAlign: 'right'}}>
          Forget Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          marginHorizontal: '10%',
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

        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#5BA199'}}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
