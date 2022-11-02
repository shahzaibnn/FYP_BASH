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
const ApplyToJob = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [contactNo, setcontactNo] = useState('');
  const [course, setcourse] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('09-10-2020');
  const [city, setCity] = useState('');
  return (
    <View style={styles.SectionStyle}>
      <View style={styles.ExpBoxView}>
        <Text style={styles.text}>First Name</Text>
        <Text style={styles.ExpLocation}>Last Name</Text>
      </View>
      <View style={styles.ExpBoxView}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={UserName => setUserName(UserName)}
          placeholder="First Name"
          placeholderTextColor="#6A6A6A"
          blurOnSubmit={false}
        />
        <View style={{flex: 0.1}}></View>
        <TextInput
          style={styles.inputStyle}
          onChangeText={UserName => setUserName(UserName)}
          placeholder="Last Name"
          placeholderTextColor="#6A6A6A"
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.ExpBoxView}>
        <Text style={styles.text}>Email</Text>
      </View>
      <View style={styles.ExpBoxView}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={UserName => setUserName(UserName)}
          placeholder="Email"
          placeholderTextColor="#6A6A6A"
          blurOnSubmit={false}
        />
      </View>
      {/* <View>
        <TextInput placeholder="Asim" style={styles.inputStyle}></TextInput>
        <TextInput placeholder="Ali"></TextInput>
      </View> */}
    </View>
  );
};

export default ApplyToJob;

const styles = StyleSheet.create({
  ExpBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  Row: {
    flexDirection: 'row',
  },
  SectionStyle: {
    // flexDirection: 'row',
    height: 50,
    // backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 15,
    marginLeft: 25,
    marginRight: 25,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    backgroundColor: 'white',
    color: '#6A6A6A',
    paddingLeft: 10,
    paddingRight: 20,
    borderRadius: 12,
  },
  inputStyle2: {
    flex: 1,
    backgroundColor: 'white',
    color: '#6A6A6A',
    paddingLeft: 30,
    paddingRight: 20,
    borderRadius: 12,
  },
  editExpView: {
    // alignItems: 'center',
    flex: 1,
  },
  text: {fontSize: 20, fontWeight: 'bold', color: '#6A6A6A'},

  ExpLocation: {
    textAlign: 'right',
    fontSize: 20,
    color: '#6A6A6A',
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
