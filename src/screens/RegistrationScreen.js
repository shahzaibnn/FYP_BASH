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
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const RegisterScreen = props => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [contactNo, setcontactNo] = useState('');
  const [course, setcourse] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('09-10-2020');
  const [city, setCity] = useState('');

  // const [userAge, setUserAge] = useState('');
  // const [userAddress, setUserAddress] = useState('');
  // const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [visible, setVisibility] = React.useState(false);

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
        <View style={styles.Header}>
          <TouchableOpacity>
            <FontAwesome
              name="chevron-left"
              style={styles.back}
              size={20}
              color="blacks"
            />
          </TouchableOpacity>

          <Text style={styles.titleText}>Teacher Sign Up</Text>
        </View>
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
              onChangeText={UserName => setUserName(UserName)}
              placeholder="Enter Name"
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
              onChangeText={userPassword => setUserPassword(userPassword)}
              placeholder="Enter Password"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
              secureTextEntry={!visible}
            />
            <FontAwesome
              name="eye-slash"
              style={styles.icon}
              size={15}
              onPress={() => setVisibility(!visible)}
            />
          </View>
          <View style={styles.SectionStyle}>
            <FontAwesome name="phone" style={styles.icon} size={15} />
            <TextInput
              style={styles.inputStyle}
              onChangeText={contactNo => setcontactNo(contactNo)}
              placeholder="Enter Contact Number"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <FontAwesome name="book" style={styles.icon} size={15} />
            <TextInput
              style={styles.inputStyle}
              onChangeText={course => setcourse(course)}
              placeholder="Enter Course Name"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <FontAwesome name="calendar" style={styles.icon} size={15} />
            <TextInput
              style={styles.inputStyle}
              onChangeText={dateOfBirth => setdateOfBirth(dateOfBirth)}
              placeholder="Enter Date of Birth"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <FontAwesome name="map-marker" style={styles.icon} size={15} />
            <TextInput
              style={styles.inputStyle}
              onChangeText={city => setCity(city)}
              placeholder="Enter City"
              placeholderTextColor="#6A6A6A"
              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            // onPress={handleSubmitButton}
          >
            <Text style={styles.buttonTextStyle}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.RegisteredUser}>
            <Text style={styles.registered_1}>Already have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.registered_2}>Login Here</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  RegisteredUser: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 25,
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
