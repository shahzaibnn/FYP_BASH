import React, {useState, createRef} from 'react';
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

const Tab = createMaterialTopTabNavigator();

export default function RegistrationScreenStudent({navigation}) {
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [userPassword, setUserPassword] = useState('');

  const [contactNo, setcontactNo] = useState('');

  const [batch, setbatch] = useState('');

  const [dateOfBirth, setdateOfBirth] = useState('09-10-2020');

  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [eye, setEye] = useState('eye');

  const signupPressed = () => {
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
    } else {
      alert('EVERYTHING GUD');

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
    }
  };

  // const handleSubmitButton = () => {
  //   setErrortext('');
  //   if (!userName) {
  //     alert('Please fill Name');
  //     return;
  //   }
  //   if (!userEmail) {
  //     alert('Please fill Email');
  //     return;
  //   }
  //   if (!userAge) {
  //     alert('Please fill Age');
  //     return;
  //   }
  //   if (!userAddress) {
  //     alert('Please fill Address');
  //     return;
  //   }
  //   if (!userPassword) {
  //     alert('Please fill Password');
  //     return;
  //   }
  //   //Show Loader
  //   setLoading(true);
  //   var dataToSend = {
  //     name: userName,
  //     email: userEmail,
  //     age: userAge,
  //     address: userAddress,
  //     password: userPassword,
  //   };
  //   var formBody = [];
  //   for (var key in dataToSend) {
  //     var encodedKey = encodeURIComponent(key);
  //     var encodedValue = encodeURIComponent(dataToSend[key]);
  //     formBody.push(encodedKey + '=' + encodedValue);
  //   }
  //   formBody = formBody.join('&');

  //   fetch('http://localhost:3000/api/user/register', {
  //     method: 'POST',
  //     body: formBody,
  //     headers: {
  //       //Header Defination
  //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       //Hide Loader
  //       setLoading(false);
  //       console.log(responseJson);
  //       // If server response message same as Data Matched
  //       if (responseJson.status === 'success') {
  //         setIsRegistraionSuccess(true);
  //         console.log('Registration Successful. Please Login to proceed');
  //       } else {
  //         setErrortext(responseJson.msg);
  //       }
  //     })
  //     .catch(error => {
  //       //Hide Loader
  //       setLoading(false);
  //       console.error(error);
  //     });
  // };
  // if (isRegistraionSuccess) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: '#307ecc',
  //         justifyContent: 'center',
  //       }}>
  //       {/* <Image
  //         source={require('../Image/success.png')}
  //         style={{
  //           height: 150,
  //           resizeMode: 'contain',
  //           alignSelf: 'center',
  //         }}
  //       /> */}
  //       <Text style={styles.successTextStyle}>Registration Successful</Text>
  //       <TouchableOpacity
  //         style={styles.buttonStyle}
  //         activeOpacity={0.5}
  //         onPress={() => props.navigation.navigate('LoginScreen')}>
  //         <Text style={styles.buttonTextStyle}>Login Now</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

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
  // async function createData() {
  //   // const newKey = push(child(ref(database), 'users')).key;

  //   // push(ref(db, 'roles/students/' + userName + '/')),
  //   await set(ref(db, 'roles/students/' + userName + '/'), {
  //     userName: userName,
  //     userEmail: userEmail,
  //     userPassword: userPassword,
  //     contactNo: contactNo,
  //     course: course,
  //     dateOfBirth: dateOfBirth,
  //     city: city,
  //   })
  //     .then(() => {
  //       // Data saved successfully!
  //       alert('Signed In!');
  //     })
  //     .catch(error => {
  //       // The write failed...
  //       alert(error);
  //     });
  // }

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
              maxLength={11}
            />
          </View>
          <View style={styles.SectionStyle}>
            <FontAwesome name="book" style={styles.icon} size={15} />
            <TextInput
              value={batch}
              style={styles.inputStyle}
              onChangeText={batch => setbatch(batch)}
              placeholder="Batch"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.SectionStyle}>
            <FontAwesome name="calendar" style={styles.icon} size={15} />
            <TextInput
              style={styles.inputStyle}
              value={dateOfBirth}
              onChangeText={dateOfBirth => setdateOfBirth(dateOfBirth)}
              placeholder="Enter Date of Birth"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
            />
          </View>
          {/* <View style={styles.SectionStyle}>
            <FontAwesome name="map-marker" style={styles.icon} size={15} />
            <TextInput
              style={styles.inputStyle}
              onChangeText={city => setCity(city)}
              placeholder="Enter City"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
            />
          </View> */}
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
