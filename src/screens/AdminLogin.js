import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import firebase from 'firebase/compat/app';
import Spinner from 'react-native-spinkit';
import Toast from 'react-native-toast-message';

import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {auth} from '@react-native-firebase/auth';
import {db, authorization, auth, dbFirestore} from '../Firebase/Config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';

import {CommonActions} from '@react-navigation/native';
import {Grid} from 'react-native-animated-spinkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getAuth} from 'firebase/auth';

import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export default function AdminLogin({navigation}) {
  // export default function LoginScreen() {

  const showToast = heading => {
    Toast.show({
      type: 'error',
      text1: heading,
      // text2: text,
    });
  };

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [eye, setEye] = useState('eye');

  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [pointerEvent, setPointerEvent] = useState('auto');
  const [opacity, setOpacity] = useState(1);
  const [flag, setFlag] = useState(true);
  const [approved, setApproved] = useState(true);

  console.log(email);
  console.log(password);
  const adminEmail = 'bashfyp@gmail.com';
  const adminPassword = 'admin';
  const handleLogin = () => {
    if (!email) {
      showToast('Please fill Email');
    } else if (!password) {
      showToast('Please fill Password');
    } else {
      setFlag(false);
      if (email === adminEmail && password === adminPassword) {
        navigation.navigate('AdminUserManagement');
        setFlag(true);
      }
    }
  };

  useEffect(() => {
    if (flag) {
      setSpinnerLoader(false);
      setPointerEvent('auto');
      setOpacity(1);
    } else {
      setSpinnerLoader(true);
      setPointerEvent('none');
      setOpacity(0.8);
    }
  }, [flag]);

  return (
    <ScrollView style={{backgroundColor: '#E5E3E4'}}>
      <View pointerEvents={pointerEvent} style={{opacity: opacity}}>
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
            // fontStyle: 'italic',
            // marginHorizontal: '10%',
          }}>
          Admin Panel
        </Text>

        <Text
          style={{
            color: '#5BA199',
            marginHorizontal: '12%',
            marginVertical: '5%',
            fontSize: 18,
            // fontStyle: 'italic',
            textAlign: 'center',
          }}>
          {/* Control Panel Login */}
          Admin Dashboard Access
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
            marginTop: '10%',
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
            placeholder="Email Address"
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

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={{marginHorizontal: '10%', marginVertical: '8%'}}>
          <Text style={{color: '#5BA199', textAlign: 'right'}}>
            Forget Password?
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            marginHorizontal: '10%',
            backgroundColor: '#469597',
            paddingVertical: '4%',
            borderRadius: 16,
            marginTop: '10%',
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

        {/* <View
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
        </View> */}
        {spinnerLoader ? (
          <Grid
            style={styles.gridStyle}
            size={Dimensions.get('window').width * 0.2}
            color="#5BA199"
          />
        ) : null}
      </View>
      <Toast topOffset={30} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gridStyle: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.5,
    left: Dimensions.get('window').width * 0.4,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
