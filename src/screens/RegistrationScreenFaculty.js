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
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MonthPicker from 'react-native-month-year-picker';

import DatePicker from 'react-native-date-picker';

import {ref, set, update, onValue, remove, push} from 'firebase/database';
// import {db} from '../Firebase/Config';

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

const Tab = createMaterialTopTabNavigator();

var moment = require('moment'); // require

export default function RegistrationScreenFaculty({navigation}) {
  const [batch, setbatch] = useState();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [dob, setDob] = useState(new Date());
  const [open, setOpen] = useState(false);

  const showPicker = useCallback(value => {
    setShow(value);
  }, []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
      // setbatch(moment(date).format('MM-YYYY'));
    },
    [date, showPicker],

    console.log(moment(date).format('MM-YYYY')),
    // setbatch(moment(date).format('MM-YYYY')),
    // console.log(moment(date, 'MM-YYYY')),
  );

  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [userPassword, setUserPassword] = useState('');

  const [contactNo, setcontactNo] = useState('');

  const [dateOfBirth, setdateOfBirth] = useState('Date of Birth');

  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [eye, setEye] = useState('eye');

  const signupPressed = async () => {
    if (!userName) {
      alert('Please fill First Name');
    } else if (!lastName) {
      alert('Please fill Last Name');
    } else if (!userEmail) {
      alert('Please fill Email');
    } else if (!userPassword) {
      alert('Please fill Password');
    } else if (!contactNo) {
      alert('Please fill Contact Number');
    } else if (!batch) {
      alert('Please fill Batch');
    } else if (!dateOfBirth) {
      alert('Please fill Date of Birth');
    } else if (!/^[a-zA-Z]+$/.test(userName)) {
      alert('First Name can only contain alphabets');
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
      alert('Last Name can only contain alphabets');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(userEmail)) {
      alert('Invalid Email');
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&//.])[A-Za-z\d@$!%*?&//.]{8,}$/.test(
        userPassword,
      )
    ) {
      // alert(userPassword);

      alert(
        '(Password Criteria)\nMinimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      );
    } else if (!/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/.test(contactNo)) {
      alert('Inalid Contact Number');
    } else if (batch > 2023 || batch < 2000) {
      alert('Inavlid Batch');
    } else if (
      !/^(([0-9])|([0-2][0-9])|([3][0-1]))\-(01|02|03|04|05|06|07|08|09|10|11|12)\-\d{4}$/.test(
        dateOfBirth,
      )
    ) {
      alert('Invalid DOB');
    } else {
      alert('EVERYTHING GUD');

      createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then(cred => {
          console.log(cred);
          console.log('success');
          const user = cred.user;
          console.log('Logged in as ', user.email);
          //adding here so first the details are verified and then saved further
          dbFirestore()
            .collection('Users')
            .doc('roles')
            .collection('student')
            .add({
              role: 'faculty',
              firstName: userName,
              lastName: lastName,
              userEmail: userEmail,
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
                subject: 'Welcome To BASH',
                htmlBody: '<h1>Account Registered</h1>',
                // attachmentPaths: [path],
                // attachmentNames: ['anotherTest.pdf'],
              })
                .then(success => {
                  console.log(success);
                  alert('Account Regsitered');
                })
                .catch(err => console.log(err));
            })
            .catch(error => {
              // The write failed...
              const errorMessage = error.message;
              alert(errorMessage);
            });
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          // ..
        });
    }
  };
  const handleSignUp = e => {
    // e.preventDefault();
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(cred => {
        console.log(cred);
        console.log('success');
        const user = cred.user;
        console.log('Logged in as ', user.userEmail);
        //adding here so first the details are verified and then saved further
        push(ref(db, 'roles/students/'), {
          firstName: userName,
          lastName: lastName,
          userEmail: userEmail,
          userPassword: userPassword,
          contactNo: contactNo,
          dateOfBirth: dateOfBirth,
          pic: '',
          title: '',
          description: '',
          skills: ['java', 'React'],
          cv: '',
          experience: [{organization: 'one'}, {organization: 'two'}],
          postsId: ['1'],
          appliedJobId: ['1'],
          role: 'student',
        })
          .then(() => {
            // Data saved successfully!
            alert('Registered!');
          })
          .catch(error => {
            // The write failed...
            const errorMessage = error.message;
            alert(errorMessage);
          });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };

  useEffect(() => {
    setbatch('Join Month/Year: ' + moment(date).format('MM-YYYY'));
    setdateOfBirth('Date of Birth: ' + moment(dob).format('DD-MM-YYYY'));
  }, [date, dob]);

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
        {/* <View style={styles.Header}>
          <TouchableOpacity
            style={{position: 'absolute', left: '5%'}}
            onPress={() => navigation.navigate('Login')}>
            <AntDesign name="leftcircle" size={32} color="#777777" />
          </TouchableOpacity>
          <Text style={styles.titleText}>Student Sign Up</Text>
        </View> */}

        <KeyboardAvoidingView enabled>
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
              secureTextEntry={!passwordVisible}
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
              value={batch}
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
              minimumDate={new Date()}
              maximumDate={new Date(2025, 5)}
              mode="number"
            />
          )}
          <TouchableOpacity
            style={styles.SectionStyle}
            onPress={() => setOpen(true)}>
            <FontAwesome name="calendar" style={styles.icon} size={15} />

            <TextInput
              style={styles.inputStyle}
              value={dateOfBirth}
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
            maximumDate={new Date(2025, 5, 30)}
            mode="date"
            modal
            open={open}
            date={date}
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
        </KeyboardAvoidingView>
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
