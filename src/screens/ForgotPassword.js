import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ToastAndroid, Platform, AlertIOS} from 'react-native';

// import {withFirebaseHOC} from '../Firebase/Config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {db, authorization} from '../Firebase/Config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  getAuth,
  updateCurrentUser,
  updatePassword,
  EmailAuthProvider,
  signOut,
} from 'firebase/auth';
// import * as firebase from 'firebase';
import {Toaster} from '../components/AlertBoxStyles/Toaster';
import {dbFirestore} from '../Firebase/Config';
import RNSmtpMailer from 'react-native-smtp-mailer';
import CryptoJS from 'react-native-crypto-js';

import RandExp from 'randexp';
import Spinner from 'react-native-spinkit';
import {Fold} from 'react-native-animated-spinkit';
import {get} from 'firebase/database';

import DropDownPicker from 'react-native-dropdown-picker';

var hereEmail = 'none';

// const user = getAuth().currentUser;
// const cred = EmailAuthProvider.credential('shahzaib@gmail.com', '123456');
// console.log(cred);

// var r = reauthenticateWithCredential('shahzaib@gmail.com', cred);
// console.log('value is ', r);
// const emailCred = firebase.auth.EmailAuthProvider.credential(
//   firebase.auth().currentUser,
//   currentPass,
// );
// firebase
//   .auth()
//   .currentUser.reauthenticateWithCredential(emailCred)
//   .then(() => {
//     // User successfully reauthenticated.
//     const newPass = '1234567';
//     return firebase.auth().currentUser.updatePassword(newPass);
//   })
//   .catch(error => {
//     // Handle error.
//   });

export default function ForgotPassword({navigation}) {
  const [id, setId] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [emailGenerated, setemailGenerated] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // const [role, setRole] = useState('');

  const [found, setFound] = useState(false);

  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [pointerEvent, setPointerEvent] = useState('auto');
  const [opacity, setOpacity] = useState(1);
  const [flag, setFlag] = useState(true);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Student');
  const [items, setItems] = useState([
    {label: 'Student', value: 'Student'},
    {label: 'Faculty', value: 'Faculty'},
    {label: 'Alumni', value: 'Alumni'},
  ]);

  console.log(id);
  console.log(email);

  // const check = () => {};

  const forgotPassword = () => {
    // firebase
    // authorization()

    if (!email) {
      alert('Please Enter Email Address');
    } else {
      setFlag(false);

      console.log(newPassword);

      dbFirestore()
        .collection('Users')
        // .doc('roles')
        // .collection(value.toLowerCase())
        .where('userEmail', '==', email.toLowerCase())
        .get()
        .then(querySnapshot => {
          console.log('Total Found users: ', querySnapshot.size);

          if (querySnapshot.size == 0) {
            setFlag(true);
            notifyMessage('Email Address does not Exists');
          } else {
            querySnapshot.forEach(documentSnapshot => {
              console.log(documentSnapshot.id);
              console.log(documentSnapshot.data().userPassword);
              setId(documentSnapshot.id);
              // setOldPassword(documentSnapshot.data().userPassword);
              let bytes = CryptoJS.AES.decrypt(
                documentSnapshot.data().userPassword,
                'secret key 123',
              );
              let originalText = bytes.toString(CryptoJS.enc.Utf8);
              console.log('decrypted old password here: ', originalText);
              setOldPassword(originalText);

              setFound(true);
            });
          }
        })
        .catch(error => {
          alert(error);

          setFlag(true);
        });
    }
  };

  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  }

  useEffect(() => {
    if (found) {
      let encryptedPassword = CryptoJS.AES.encrypt(
        newPassword,
        'secret key 123',
      ).toString();
      console.log('checking encrypted password', encryptedPassword);

      dbFirestore()
        .collection('Users')
        // .doc('roles')
        // .collection(value.toLowerCase())
        .doc(id)
        .update({
          userPassword: encryptedPassword,
        })
        .then(() => {
          console.log('----------------------------');

          RNSmtpMailer.sendMail({
            mailhost: 'smtp.gmail.com',
            port: '465',
            ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
            username: 'bashfyp@gmail.com',
            password: 'ltdapqlallccrgss',
            // fromName: 'Some Name', // optional
            // replyTo: 'usernameEmail', // optional
            recipients: email.toLowerCase(),
            // bcc: ['bccEmail1', 'bccEmail2'], // optional
            // bcc: ['shahzaibnn@gmail.com'], // optional
            subject: 'Welcome To BASH',
            htmlBody: '<h1>New Password is:' + newPassword + '</h1>',
            // attachmentPaths: [path],
            // attachmentNames: ['anotherTest.pdf'],
          })
            .then(success => {
              const auth = getAuth();
              console.log('----------------------------');

              signInWithEmailAndPassword(auth, email.toLowerCase(), oldPassword)
                .then(userCredential => {
                  console.log('----------------------------');

                  // Signed in
                  const user = userCredential.user;
                  console.log('firat : ', user);
                  updatePassword(user, newPassword)
                    .then(() =>
                      signOut(auth).then(() => {
                        console.log('pura done');
                        console.log(success);
                        console.log('Password Updated');

                        setemailGenerated(true);
                        notifyMessage('New Password Sent At ' + email);
                        setNewPassword('');

                        console.log('toaster sent');
                        setFound(false);
                        setFlag(true);
                        navigation.navigate('Login');
                      }),
                    )
                    .catch(error => {
                      setFlag(true);

                      console.log(error);
                    });
                  // ...
                })
                .catch(error => {
                  console.log(error);
                  setFlag(true);
                });
            })
            .catch(err => {
              console.log(err);
              setFound(false);
              setFlag(true);
            });
        });
    }
  }, [found]);

  useEffect(() => {
    while (true) {
      let randomPassword = new RandExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&//.])[A-Za-z\d@$!%*?&//.]{8,10}$/,
      ).gen();

      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&//.])[A-Za-z\d@$!%*?&//.]{8,}$/.test(
          randomPassword,
        )
      ) {
        console.log(randomPassword);
        console.log('Invalid');
      } else {
        console.log(randomPassword);
        console.log('Password Valid');
        setNewPassword(randomPassword);
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (flag) {
      setSpinnerLoader(false);
      setPointerEvent('auto');
      setOpacity(1);
    } else {
      setSpinnerLoader(true);
      setPointerEvent('none');
      setOpacity(0.6);
    }
  }, [flag]);

  return (
    <ScrollView style={{backgroundColor: '#E5E3E4'}}>
      <View
        pointerEvents={pointerEvent}
        style={{opacity: opacity, height: Dimensions.get('window').height}}>
        <View>
          {/* {emailGenerated ? (
            // <View
            //   style={{
            //     //   backgroundColor: '#777777',
            //     width: Dimensions.get('window').width * 0.8,
            //   }}>
            //   <Toaster msg="Check email at " emailId={email}></Toaster>
            // </View>
            null
          ) : (
            <></>
          )} */}
        </View>

        <View style={styles.backBtnStyle}>
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
        {/* <View
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
      </View> */}

        {/* <DropDownPicker
          listMode="SCROLLVIEW"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select country"
          style={{
            marginVertical: '5%',
            backgroundColor: '#BBC6C8',
            borderWidth: 0,
            borderRadius: 16,
            width: '80%',
            marginHorizontal: '10%',
            marginTop: '10%',
          }}
          textStyle={{color: '#000000', fontSize: 14, marginHorizontal: '2%'}}
          dropDownContainerStyle={{
            backgroundColor: '#ffffff',
            borderWidth: 0,
            marginTop: '10%',
            width: '80%',
            marginHorizontal: '10%',
            // position: 'absolute',
          }}
          //   labelStyle={{color: 'white'}}
          listItemLabelStyle={{color: '#000000', fontWeight: 'bold'}}
        /> */}

        <View
          style={{
            backgroundColor: '#ffffff',
            width: Dimensions.get('window').width * 0.8,
            marginHorizontal: '10%',
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '20%',
            borderWidth: 1.5,
            borderColor: '#5BA199',
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
            marginTop: '20%',
            backgroundColor: '#469597',
            paddingVertical: '4%',
            borderRadius: 16,
          }}
          onPress={forgotPassword}>
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
        {/* <View> */}
        {/* {emailGenerated ? (
            // <View
            //   style={{
            //     //   backgroundColor: '#777777',
            //     width: Dimensions.get('window').width * 0.8,
            //     //   height: Dimensions.get('window').height * 0.8,
            //     marginHorizontal: '10%',
            //     marginTop: '40%',
            //     borderRadius: 16,
            //     flexDirection: 'row',
            //     alignItems: 'center',
            //     marginBottom: '7%',
            //     justifyContent: 'center',
            //   }}>
            //   <MaterialIcons
            //     name="mark-email-read"
            //     size={30}
            //     color="green"
            //     style={{
            //       // alignItems: 'center',
            //       justifyContent: 'center',
            //       alignSelf: 'center',
            //     }}
            //   /> */}
        {/* <Toaster msg="Check Email Please"></Toaster> */}

        {/* <Text
                style={{
                  // alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '7%',
                  // fontStyle: 'italic',
                  alignSelf: 'center',
                  fontSize: 22,
                  fontWeight: 'bold',
                }}> */}
        {/* Email sent successfully! */}
        {/* </Text> */}
        {/* </View> */}
        {/* // ) : ( */}
        {/* // <></> */}
        {/* // )} */}

        {/* </View> */}

        {spinnerLoader ? (
          <Fold
            style={{
              position: 'absolute',
              top: Dimensions.get('window').height * 0.5,
              left: Dimensions.get('window').width * 0.4,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            size={Dimensions.get('window').width * 0.2}
            color="#5BA199"
          />
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backBtnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginVertical: '7%',
    justifyContent: 'center',
  },
});
