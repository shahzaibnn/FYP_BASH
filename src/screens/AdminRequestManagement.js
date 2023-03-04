import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, createRef} from 'react';
import FastImage from 'react-native-fast-image';
// import {profile, jobs, posts, experience, user} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionSheet from 'react-native-actions-sheet';
import {SliderBox} from 'react-native-image-slider-box';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {db, dbFirestore, auth} from '../Firebase/Config';
import RNSmtpMailer from 'react-native-smtp-mailer';

import {useSelector, useDispatch} from 'react-redux';

// import {db, authorization, auth, dbFirestore} from '../Firebase/Config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

const AdminRequestManagement = ({navigation}) => {
  const [users, setUsers] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const [searchSelected, setSearchSelected] = useState(false);

  useEffect(() => {
    console.log('its called!!');
    dbFirestore()
      .collection('Users')
      .where('accountApproved', '==', 'pending')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          data.id = documentSnapshot.id;

          setUsers(oldArray => [...oldArray, data]);
        });
      });
  }, []);

  const ApproveUser = (userId, userEmail) => {
    console.log('approving user id: ', userId);
    console.log('approving user id: ', userId);
    console.log('users are: ', users);
    dbFirestore()
      .collection('Users')
      .doc(userId)
      .update({
        accountApproved: 'Approved',
      })
      .then(() => {
        RNSmtpMailer.sendMail({
          mailhost: 'smtp.gmail.com',
          port: '465',
          ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
          username: 'bashfyp@gmail.com',
          password: 'ltdapqlallccrgss',
          recipients: userEmail,
          subject: 'BASH Account Confirmed!',
          htmlBody:
            '<h1>Congratulations!!!</h1>' +
            '<h2>Thank you for registering with BASH Application</h2>' +
            '<p>Admin has approved your account, now you can login to BASH application and enjoy!</p>' +
            '<p>Sincerely</p>' +
            '<p>Team BASH</p>',
        });
      })
      .then(() => {
        setUsers(current => current.filter(users => users.id !== userId));
      })

      .catch(error => {
        alert(error);
      });
  };
  const RemoveUser = userId => {};

  const UpdatedSearch = () => {
    if (!searchValue) {
      setSearchSelected(false);
      setUsers([]);
      console.log('its called!!');
      dbFirestore()
        .collection('Users')
        .where('accountApproved', '==', 'pending')
        .get()
        .then(querySnapshot => {
          const usersList = [];
          querySnapshot.forEach(documentSnapshot => {
            usersList.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          console.log(usersList);
          setUsers(usersList);
        });
      // setUsers(initialUsers);

      alert('Enter value to search!!');
    } else {
      // if (peopleSelected) {
      setUsers([]);
      setSearchSelected(true);

      //Users Fetching

      dbFirestore()
        .collection('Users')
        .where('accountApproved', '==', 'pending')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            const data = documentSnapshot.data();
            data.id = documentSnapshot.id;
            const allFields = Object.values(data).join(' ');
            if (allFields.toLowerCase().includes(searchValue.toLowerCase())) {
              // results.push(data);
              setUsers(oldArray => [...oldArray, data]);
            }
          });
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          // resizeMode="center"
          // resizeMode="stretch"
          source={require('../assets/images/bash_icon.png')}
          style={{
            backgroundColor: 'red',
            height: Dimensions.get('window').height * 0.08,
            width: Dimensions.get('window').width * 0.3,
            marginTop: '5%',
            // aspectRatio: 6,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontSize: 28,
            color: '#4CA6A8',
            fontWeight: 'bold',
            textAlign: 'center',
            // marginTop: '5%',
          }}>
          Request Management
        </Text>
      </View>

      {/* Search Bar */}
      <View
        style={{flexDirection: 'row', marginTop: '3%', marginHorizontal: '5%'}}>
        <View
          style={{
            alignItems: 'center',
            marginLeft: '3%',
            marginTop: '3%',

            justifyContent: 'space-between',

            height: 60,
            backgroundColor: '#ffffff',
            flex: 1,
            borderRadius: 16,
            flexDirection: 'row',
          }}>
          <TextInput
            placeholder="Search here..."
            style={{marginLeft: '5%'}}
            value={searchValue}
            // onChangeText={setSearchValue}
            onChangeText={searchValue => setSearchValue(searchValue)}
          />

          <View
            style={{padding: 10, backgroundColor: '#5BA199', borderRadius: 16}}>
            {/* <TouchableOpacity onPress={search}> */}
            <TouchableOpacity onPress={UpdatedSearch}>
              <Ionicons name="search" size={40} color="#ffffff" style={{}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Another view for options */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: Dimensions.get('screen').height * 0.05,
        }}>
        {/* user profile icon */}
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              // marginLeft: Dimensions.get('window').width * 0.04,
              // marginTop: Dimensions.get('window').width * 0.04,
              backgroundColor: '#4CA6A8',
              borderRadius: 100,

              height: Dimensions.get('window').height * 0.1,
              width: Dimensions.get('window').width * 0.2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                console.log(users);
              }}>
              <Ionicons
                name="people"
                size={35}
                color={'#ffffff'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.iconText}>Users</Text>
        </View>
      </View>
      <View style={styles.titleStyle}>
        {/* <Text>{TitleTag}</Text> */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#000000',
          }}>
          Pending Requests
        </Text>
      </View>
      {/* after title screen */}

      <View>
        <View style={styles.expView}>
          <View
            // onPress={() => setNewUsersSelected(true)}
            style={{
              width: Dimensions.get('window').width * 0.25,
              height: Dimensions.get('window').height * 0.03,
              borderRadius: 16,
              marginTop: '15%',
              // borderColor: 'black',
              borderColor: '#4CA6A8',
              backgroundColor: '#4CA6A8',
              // backgroundColor: '#4CA6A8',
              borderWidth: 1,
              marginLeft: '78%',
              // alignSelf: 'center',
            }}>
            <TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  //   color: 'white',
                  // color: '#4CA6A8',
                  color: '#ffffff',
                  padding: '1%',
                  fontWeight: 'bold',
                }}>
                New Users
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <FlatList
            data={users}
            ListEmptyComponent={
              searchSelected ? (
                <View
                  style={{
                    marginHorizontal: Dimensions.get('screen').width * 0.05,
                    flexDirection: 'row',
                  }}>
                  <Text style={{fontSize: 20}}>No Results found for </Text>
                  <Text style={{fontSize: 20, fontWeight: '900'}}>
                    ({searchValue})
                  </Text>
                </View>
              ) : (
                <></>
              )
            }
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: 'rgba(187, 198, 200, 0.5)',
                  borderRadius: 16,
                  marginTop: '5%',
                  // marginVertical: Dimensions.get('window').height * 0.02,
                  marginHorizontal: Dimensions.get('window').width * 0.05,
                  paddingBottom: '4%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      marginLeft: Dimensions.get('window').width * 0.02,
                      marginTop: Dimensions.get('window').width * 0.05,
                      height: Dimensions.get('window').height * 0.1,
                      width: Dimensions.get('window').width * 0.2,
                      borderRadius: 16,
                    }}
                    source={{
                      uri: item.pic,
                    }}
                  />

                  <View
                    style={{
                      marginLeft: Dimensions.get('window').width * 0.03,
                    }}>
                    {/* <Text style={styles.designationStyle}>People</Text> */}
                    <Text style={styles.designationStyle}>{item.role}</Text>
                    {/* <Text>{item.firstName + ' ' + item.lastName}</Text> */}
                    <View style={styles.ExpBoxView}>
                      {/* <Text>{item.designation}</Text> */}
                      <Text style={styles.ExpLocation}>
                        {item.firstName + ' ' + item.lastName}
                      </Text>
                      <Text style={styles.ExpLocation}>
                        Batch: {item.batch}
                      </Text>
                      <Text style={styles.ExpLocation}>
                        Email: {item.userEmail}
                      </Text>
                      <Text style={styles.ExpLocation}>
                        DOB: {item.dateOfBirth}
                      </Text>
                      <Text style={styles.ExpLocation}>
                        Contact No: {item.contactNo}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    marginEnd: '5%',
                    marginTop: '8%',
                  }}>
                  <TouchableOpacity
                    style={{marginRight: '4%'}}
                    onPress={() => ApproveUser(item.id, item.userEmail)}>
                    <FontAwesome name="check-circle" size={40} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={RemoveUser(item.id)}>
                    <FontAwesome name="times-circle" size={40} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminRequestManagement;
const styles = StyleSheet.create({
  userTabs: {
    width: Dimensions.get('window').width * 0.25,
    height: Dimensions.get('window').height * 0.03,
    borderRadius: 16,
    marginTop: '15%',
    // borderColor: 'black',
    borderColor: '#4CA6A8',
    // backgroundColour: newUsersSelected ? '#4CA6A8' : '#ffffff',
    borderWidth: 1,
    marginLeft: '15%',
  },
  userTabStyles: {
    textAlign: 'center',
    //   color: 'white',
    // color: '#4CA6A8',
    color: 'black',
    padding: '1%',
  },
  container: {
    backgroundColor: '#E5E3E4',
  },
  ExpBoxView: {
    // flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconBoxView: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginTop: Dimensions.get('window').height * 0.02,
    // marginBottom: Dimensions.get('window').height * 0.0009,
    // marginLeft: Dimensions.get('window').height * 0.02,
    // marginRight: Dimensions.get('window').height * 0.04,
  },
  titleStyle: {
    color: '#000000',
    marginTop: Dimensions.get('window').height * 0.05,
    marginBottom: Dimensions.get('window').height * 0.0009,
    marginHorizontal: Dimensions.get('window').height * 0.04,
  },
  titleTextStyle: {
    fontSize: 24,
    fontWeight: 'bold',

    color: '#000000',
  },
  iconStyle: {
    marginLeft: Dimensions.get('window').width * 0.04,
    marginTop: Dimensions.get('window').width * 0.04,
    backgroundColor: 'white',
    borderRadius: 100,

    height: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').width * 0.2,
  },
  iconSelected: {
    marginLeft: Dimensions.get('window').width * 0.04,
    marginTop: Dimensions.get('window').width * 0.04,
    backgroundColor: '#4CA6A8',
    borderRadius: 100,

    height: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').width * 0.2,
  },
  icon: {
    // marginLeft: Dimensions.get('window').width * 0.03,
    // marginTop: Dimensions.get('window').width * 0.03,
    // marginRight: Dimensions.get('window').width * 0.04,
    // marginBottom: Dimensions.get('window').width * 0.03,
  },
  iconText: {
    color: '#6A6A6A',
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'space-between',
    alignSelf: 'center',
    textAlign: 'center',
  },
  SectionStyle: {
    backgroundColor: '#E5E3E4',
  },
  UploadCV: {
    alignSelf: 'center',
  },
  name: {
    fontSize: 28,
    color: 'black',
    fontWeight: '600',
    marginTop: 5,
    alignSelf: 'center',
  },
  qualText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',

    marginLeft: Dimensions.get('window').width * 0.12,
    alignSelf: 'flex-start',
  },
  compTxt: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 10,
    marginLeft: 15,
    color: '#5BA199',
  },
  messageBodyStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    height: 150,
    justifyContent: 'center',
  },
  messageStyle: {
    flex: 1,
    multiline: true,
    paddingLeft: 40,
    paddingRight: 20,
    borderRadius: 12,
    fontSize: 15,
    alignContent: 'center',
  },
  Row: {
    flexDirection: 'row',
  },
  bg: {
    backgroundColor: '#E5E3E4',
    height: 1000,
    borderRadius: 12,
    marginTop: 15,
    marginLeft: 25,
    marginRight: 25,
    margin: 10,
  },
  SectionStyle: {
    backgroundColor: '#E5E3E4',
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
  detStyle_1: {
    fontSize: 14,
    color: 'black',
    justifyContent: 'space-between',
  },
  ExpLocation: {
    textAlign: 'left',
    // fontStyle: 'italic',
    // justifyContent: 'flex-end',
    // alignSelf: 'flex-end',
    // alignItems: 'flex-end',
  },
  expView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
    marginRight: '52%',
  },
  text: {fontSize: 20, fontWeight: 'bold', color: '#6A6A6A', paddingTop: 15},

  text: {
    color: '#6A6A6A',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
    marginTop: 20,
  },
  ExpBoxView: {
    // flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ExpLocation: {
    textAlign: 'left',
    // fontStyle: 'italic',
    // justifyContent: 'flex-end',
    // alignSelf: 'flex-end',
    // alignItems: 'flex-end',
  },
  //   expView: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     width: Dimensions.get('window').width * 0.5,
  //     alignSelf: 'center',
  //   },
  expView1: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
  },
  editExpView: {
    flex: 1,
  },
  designationStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: Dimensions.get('window').height * 0.006,
    // marginHorizontal: Dimensions.get('window').width * 0.06,
    color: '#000000',
    marginTop: Dimensions.get('window').height * 0.02,
  },
  lastNameStyle: {
    textAlign: 'right',
    marginRight: 70,

    fontSize: 15,
    color: '#6A6A6A',
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  header: {
    backgroundColor: '#E5E3E4',
    height: 100,
    width: 100,
    borderRadius: 64,
    borderWidth: 10,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: '#6A6A6A',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
    marginTop: 20,
  },
});
