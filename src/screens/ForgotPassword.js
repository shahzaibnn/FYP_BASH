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
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import {withFirebaseHOC} from '../Firebase/Config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {db, authorization, auth} from '../Firebase/Config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
export default function ForgotPassword({navigation}) {
  const [text, setText] = useState('');

  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [emailGenerated, setemailGenerated] = useState('');

  console.log(id);
  console.log(email);

  const forgotPassword = email => {
    // firebase
    // authorization()
    console.log('reset email sent to ' + email);
    sendPasswordResetEmail(auth, email, null)
      .then(function (user) {
        setemailGenerated(true);
        alert('Please check your email...');
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  return (
    <ScrollView style={{backgroundColor: '#E5E3E4'}}>
      {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            // marginTop: '10%',
            // marginLeft: '5%',
          }}>
          <AntDesign name="leftcircle" size={32} color="#777777" />
        </TouchableOpacity>
        <Text
          style={{
            color: '#469597',
            textAlign: 'center',
            justifyContent: 'center',
            // alignSelf: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: '8%',
            // marginLeft: '20%',
            // backgroundColor: 'orange',
          }}>
          Forgot Password
        </Text>
      </View> */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: '5%',
          marginVertical: '7%',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{position: 'absolute', left: 0}}
          onPress={() => navigation.navigate('Login')}>
          <AntDesign name="leftcircle" size={32} color="#777777" />
        </TouchableOpacity>

        <Text
          style={{
            color: '#469597',
            textAlign: 'center',
            justifyContent: 'center',
            // alignSelf: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            marginLeft: '5%',
            // marginTop: '8%',
            // marginLeft: '20%',
            // backgroundColor: 'orange',
          }}>
          Forgot Password
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#ffffff',
          width: Dimensions.get('window').width * 0.8,
          //   height: Dimensions.get('window').height * 0.8,
          marginHorizontal: '10%',
          marginTop: '40%',
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
          placeholder="ID"
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
          onChangeText={email => setEmail(email)}
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
        }}
        onPress={forgotPassword(email)}>
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
      <View>
        {emailGenerated ? (
          <View
            style={{
              //   backgroundColor: '#777777',
              width: Dimensions.get('window').width * 0.8,
              //   height: Dimensions.get('window').height * 0.8,
              marginHorizontal: '10%',
              marginTop: '40%',
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '7%',
              justifyContent: 'center',
            }}>
            <MaterialIcons
              name="mark-email-read"
              size={30}
              color="green"
              style={{
                // alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                // alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '7%',
                // fontStyle: 'italic',
                alignSelf: 'center',
                fontSize: 22,
                fontWeight: 'bold',
              }}>
              Email sent successfully!
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
  );
}

// export default withFirebaseHOC(ForgotPassword);
