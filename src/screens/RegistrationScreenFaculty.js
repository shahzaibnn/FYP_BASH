import React, {useState, createRef, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Button,
  Dimensions,
} from 'react-native';
import Spinner from 'react-native-spinkit';

import Toast from 'react-native-toast-message';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MonthPicker from 'react-native-month-year-picker';

import DatePicker from 'react-native-date-picker';

import {ref, set, update, onValue, remove, push} from 'firebase/database';

import {firebase} from '@react-native-firebase/database';
import database from '@react-native-firebase/database';
import {db, authorization, auth, dbFirestore} from '../Firebase/Config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SettingsScreen from './SettingsScreen';
import CreatePostScreen from './CreatePostScreen';
import RNSmtpMailer from 'react-native-smtp-mailer';
import {Grid} from 'react-native-animated-spinkit';

const Tab = createMaterialTopTabNavigator();

var moment = require('moment'); // require

export default function RegistrationScreenFaculty({navigation}) {
  const [batch, setbatch] = useState('Join Month/Year: ');

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [dob, setDob] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [pointerEvent, setPointerEvent] = useState('auto');
  const [opacity, setOpacity] = useState(1);

  const [flag, setFlag] = useState(true);

  const showToast = heading => {
    Toast.show({
      type: 'error',
      text1: heading,
      // text2: text,
    });
  };

  const showPicker = useCallback(value => {
    setShow(value);
  }, []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],

    console.log(moment(date).format('MM-YYYY')),
  );

  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [userPassword, setUserPassword] = useState('');

  const [contactNo, setcontactNo] = useState('');

  const [dateOfBirth, setdateOfBirth] = useState('Date of Birth: ');

  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [eye, setEye] = useState('eye');

  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  }

  const signupPressed = async () => {
    if (!userName) {
      // showToast('Please fill First Name');
      showToast('Please fill First Name');
    } else if (!lastName) {
      showToast('Please fill Last Name');

      // showToast('Please fill Last Name');
    } else if (!userEmail) {
      // showToast('Please fill Email');
      showToast('Please fill Email');
    } else if (!userPassword) {
      // showToast('Please fill Password');
      showToast('Please fill Password');
    } else if (!contactNo) {
      showToast('Please fill Contact Number');
    } else if (!batch) {
      showToast('Please fill Batch');
    } else if (!dateOfBirth) {
      showToast('Please fill Date of Birth');
    } else if (!/^[a-zA-Z]+$/.test(userName)) {
      showToast('First Name can only contain alphabets');
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
      showToast('Last Name can only contain alphabets');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(userEmail)) {
      showToast('Invalid Email');
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&//.])[A-Za-z\d@$!%*?&//.]{8,}$/.test(
        userPassword,
      )
    ) {
      showToast(
        '(Password Criteria)\nMinimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      );
    } else if (!/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/.test(contactNo)) {
      showToast('Invalid Contact Number');
    }
    // else if (batch > 2023 || batch < 2000) {
    //   showToast('Inavlid Batch');
    // }
    else {
      // showToast('EVERYTHING GUD');

      setFlag(false);

      // createUserWithEmailAndPassword(auth, userEmail, userPassword)
      // .then(cred => {
      // console.log(cred);
      // console.log('success');
      // const user = cred.user;
      // console.log('Logged in as ', user.email);
      //adding here so first the details are verified and then saved further
      dbFirestore()
        .collection('Users')
        // .doc('roles')
        // .collection('faculty')
        .add({
          role: 'faculty',
          firstName: userName,
          lastName: lastName,
          userEmail: userEmail.toLowerCase(),
          userPassword: userPassword,
          contactNo: contactNo,
          dateOfBirth: dateOfBirth,
          batch: batch,
          pic: '',
          title: '',
          description: '',
          skills: [],
          cv: '',
          experience: [{}],
          postsId: [],
          appliedJobId: [],
          accountApproved: 'pending',
        })
        .then(() => {
          console.log('User added!');
          RNSmtpMailer.sendMail({
            mailhost: 'smtp.gmail.com',
            port: '465',
            ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
            username: 'bashfyp@gmail.com',
            password: 'ltdapqlallccrgss',
            // fromName: 'Some Name', // optional
            // replyTo: 'usernameEmail', // optional
            recipients: userEmail,
            // bcc: ['bccEmail1', 'bccEmail2'], // optional
            // bcc: ['shahzaibnn@gmail.com'], // optional
            subject: 'BASH Account Registered',
            htmlBody:
              '<h1>Welcome</h1>' +
              '<p>Thank you for registering with BASH Application</p',
            // attachmentPaths: [path],
            // attachmentNames: ['anotherTest.pdf'],
          })
            .then(success => {
              console.log(success);
              setUserName('');
              setLastName('');
              setUserEmail('');
              setUserPassword('');
              setcontactNo('');
              setDate(new Date());
              setDob(new Date());
              setFlag(true);
              showToast('Account Registered');
              navigation.navigate('Login');
              notifyMessage('Account Registered');
            })
            .catch(err => {
              console.log(err);
              setFlag(true);
            });
        })
        .catch(error => {
          // The write failed...
          const errorMessage = error.message;
          showToast(errorMessage);
          setFlag(true);
        });
      // })
      // .catch(error => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   showToast(errorMessage);
      //   setFlag(true);
      //   // ..
      // });
    }
  };

  useEffect(() => {
    setbatch(moment(date).format('MM-YYYY'));
    setdateOfBirth(moment(dob).format('DD-MM-YYYY'));

    if (flag) {
      setSpinnerLoader(false);
      setPointerEvent('auto');
      setOpacity(1);
    } else {
      setSpinnerLoader(true);
      setPointerEvent('none');
      setOpacity(0.8);
    }
  }, [date, dob, flag]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#E5E3E4',
        flex: 1,
      }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <KeyboardAvoidingView
          enabled
          pointerEvents={pointerEvent}
          style={{opacity: opacity}}>
          <View style={styles.SectionStyle}>
            <FontAwesome
              name="user-circle-o"
              style={styles.icon}
              size={15}
              color="blacks"
            />

            <TextInput
              style={styles.inputStyle}
              value={userName}
              onChangeText={userName => setUserName(userName)}
              placeholder="Enter First Name"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <FontAwesome name="user-circle-o" style={styles.icon} size={15} />
            <TextInput
              style={styles.inputStyle}
              value={lastName}
              onChangeText={lastName => setLastName(lastName)}
              placeholder="Enter Last Name"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <FontAwesome
              name="envelope-o"
              style={styles.icon}
              size={15}
              color="blacks"
            />
            <TextInput
              style={styles.inputStyle}
              value={userEmail}
              onChangeText={userEmail => setUserEmail(userEmail)}
              placeholder="Enter Email Address"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <FontAwesome name="lock" style={styles.icon} size={15} />
            <TextInput
              style={styles.inputStyle}
              value={userPassword}
              onChangeText={userPassword => setUserPassword(userPassword)}
              placeholder="Enter Password"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
              secureTextEntry={passwordVisible}
            />
            <MaterialCommunityIcons
              name={eye}
              style={styles.icon}
              size={15}
              onPress={() => {
                setPasswordVisible(!passwordVisible);
                if (passwordVisible) {
                  setEye('eye-off');
                } else {
                  setEye('eye');
                }
              }}
            />
          </View>
          <View style={styles.SectionStyle}>
            <FontAwesome name="phone" style={styles.icon} size={15} />
            <TextInput
              value={contactNo}
              style={styles.inputStyle}
              keyboardType="numeric"
              onChangeText={contactNo => setcontactNo(contactNo)}
              placeholder="Enter Contact Number"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
              // maxLength={11}
            />
          </View>
          <TouchableOpacity
            style={styles.SectionStyle}
            onPress={() => showPicker(true)}>
            {/* <TouchableOpacity onPress={() => showPicker(true)}> */}
            <FontAwesome name="book" style={styles.icon} size={15} />

            <TextInput
              value={'Join Month/Year: ' + batch}
              style={styles.inputStyle}
              onChangeText={batch => setbatch(batch)}
              placeholder="Batch"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
              keyboardType="numeric"
              editable={false}
            />
            {/* </TouchableOpacity> */}
          </TouchableOpacity>

          {show && (
            <MonthPicker
              onChange={onValueChange}
              value={date}
              minimumDate={new Date(2000, 1)}
              maximumDate={new Date()}
              mode="number"
            />
          )}
          <TouchableOpacity
            style={styles.SectionStyle}
            onPress={() => setOpen(true)}>
            <FontAwesome name="calendar" style={styles.icon} size={15} />

            <TextInput
              style={styles.inputStyle}
              value={'Date of Birth: ' + dateOfBirth}
              onChangeText={dateOfBirth => setdateOfBirth(dateOfBirth)}
              placeholder="Enter Date of Birth"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
              keyboardType="numeric"
              editable={false}
            />
          </TouchableOpacity>

          <DatePicker
            // style={{backgroundColor: 'orange'}}
            androidVariant="iosClone"
            maximumDate={new Date()}
            mode="date"
            modal
            open={open}
            date={dob}
            onConfirm={dob => {
              setOpen(false);
              setDob(dob);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            // onPress={createData}
            onPress={() => {
              signupPressed();
            }}>
            {/* <Button onPress={createData()} title="press"></Button> */}
            <Text style={styles.buttonTextStyle}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.RegisteredUser}>
            <Text style={styles.registered_1}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.registered_2}>Login Here</Text>
            </TouchableOpacity>
          </View>

          {spinnerLoader ? (
            <Grid
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
        </KeyboardAvoidingView>

        {/* <Toast topOffset={-60} /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 15,
    marginLeft: 25,
    marginRight: 25,
    margin: 10,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
  },
  RegisteredUser: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  buttonStyle: {
    backgroundColor: '#469597',
    color: '#FFFFFF',
    height: 50,
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    // marginTop: 25,
    marginBottom: 10,
    color: '#5BA199',
  },
  icon: {
    padding: 20,
    margin: 2,
    height: 60,
    width: 60,
    resizeMode: 'stretch',
    alignItems: 'center',
    color: '#777777',
  },
  back: {
    padding: 10,
    height: 60,
    width: 60,
    paddingLeft: 20,
    paddingTop: 28,
    color: 'black',
  },
  inputStyle: {
    flex: 1,
    backgroundColor: 'white',
    color: '#6A6A6A',
    paddingLeft: 0,
    paddingRight: 15,
    borderRadius: 12,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  registered_1: {
    color: '#5BA199',
    textAlign: 'center',
    fontSize: 15,
  },
  registered_2: {
    color: '#5BA199',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
