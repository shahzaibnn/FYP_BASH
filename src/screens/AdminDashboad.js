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
import {profile, jobs, posts, experience, user} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionSheet from 'react-native-actions-sheet';
import {SliderBox} from 'react-native-image-slider-box';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {db, dbFirestore} from '../Firebase/Config';
// import {useSelector, useDispatch} from 'react-redux';
import {setInititialLogin} from '../store/action';

const AdminDashboard = ({navigation}) => {
  const [peopleSelected, setpeopleSelected] = useState(true);
  const [postsSelected, setpostsSelected] = useState(false);
  const [logoutSelected, setLogoutselected] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          // resizeMode="center"
          // resizeMode="stretch"
          source={require('../assets/images/bash_icon.png')}
          style={{
            // backgroundColor: 'red',
            height: Dimensions.get('window').height * 0.1,
            width: Dimensions.get('window').width * 0.3,
            marginTop: '10%',
            aspectRatio: 2,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            marginTop: '4%',
            // aspectRatio: 6,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 32,
              color: '#4CA6A8',
              fontWeight: 'bold',
              textAlign: 'center',
              // marginTop: '5%',
            }}>
            Admin Dashboard
          </Text>
        </View>
        {/* admin info view */}

        <View>
          <View
            style={{
              //   backgroundColor: 'red',
              height: Dimensions.get('window').height * 0.16,
              width: Dimensions.get('window').width * 0.85,
              marginTop: '15%',
              // aspectRatio: 6,
              alignSelf: 'center',
              borderColor: 'black',
              borderRadius: 15,
              borderWidth: 0.5,
            }}>
            {/* for row */}
            <View style={{flexDirection: 'row'}}>
              <Image
                // resizeMode="center"
                // resizeMode="stretch"
                source={require('../assets/images/bash_icon.png')}
                style={{
                  // backgroundColor: 'red',
                  height: Dimensions.get('window').height * 0.1,
                  width: Dimensions.get('window').width * 0.3,
                  marginTop: '10%',
                  aspectRatio: 2,
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  marginTop: '8%',
                  marginLeft: '12%',
                  aspectRatio: 5,
                  paddingTop: '4%',
                  fontSize: 20,
                  fontStyle: 'bold',
                }}>
                Admin
              </Text>
            </View>
            <Text
              style={{
                // paddingBottom: '5%',
                marginLeft: '47%',
                marginBottom: '30%',
                // aspectRatio: 5,
                // paddingTop: '4%',
                fontSize: 18,
              }}>
              BASH Application
            </Text>
          </View>
        </View>

        {/* for options */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: Dimensions.get('screen').height * 0.08,
          }}>
          {/* user profile icon */}
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                // marginLeft: Dimensions.get('window').width * 0.04,
                // marginTop: Dimensions.get('window').width * 0.04,
                backgroundColor: peopleSelected ? '#4CA6A8' : '#ffffff',
                borderRadius: 100,

                height: Dimensions.get('window').height * 0.1,
                width: Dimensions.get('window').width * 0.2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setpeopleSelected(true);
                  setpostsSelected(false);
                  setLogoutselected(false);
                  navigation.navigate('AdminRequestManagement');

                  // setSearchSelected(false);
                  console.log('posts', postsSelected);
                }}>
                <Ionicons
                  name="people"
                  size={35}
                  color={peopleSelected ? '#ffffff' : '#4CA6A8'}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.iconText}>Request Management</Text>
          </View>
          {/* posts icon */}
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                // marginLeft: Dimensions.get('window').width * 0.04,
                // marginTop: Dimensions.get('window').width * 0.04,
                backgroundColor: postsSelected ? '#4CA6A8' : '#ffffff',
                borderRadius: 100,

                height: Dimensions.get('window').height * 0.1,
                width: Dimensions.get('window').width * 0.2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setpostsSelected(true);
                  setpeopleSelected(false);
                  // setSearchSelected(false);
                  setLogoutselected(false);
                  navigation.navigate('AdminUserManagement');

                  console.log('posts  ', postsSelected);
                }}>
                <MaterialIcons
                  name="post-add"
                  size={35}
                  color={postsSelected ? '#ffffff' : '#4CA6A8'}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.iconText}>User Management</Text>
          </View>
        </View>

        {/* for logout */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: Dimensions.get('screen').height * 0.08,
          }}>
          {/* user profile icon */}
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                // marginLeft: Dimensions.get('window').width * 0.04,
                // marginTop: Dimensions.get('window').width * 0.04,
                backgroundColor: logoutSelected ? '#4CA6A8' : '#ffffff',
                borderRadius: 100,

                height: Dimensions.get('window').height * 0.1,
                width: Dimensions.get('window').width * 0.2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setpeopleSelected(false);
                  setpostsSelected(false);
                  setLogoutselected(true);
                  navigation.navigate('AdminLogin');
                }}>
                <Ionicons
                  name="people"
                  size={35}
                  color={logoutSelected ? '#ffffff' : '#4CA6A8'}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.iconText}>Logout</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminDashboard;
const styles = StyleSheet.create({
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
    marginLeft: Dimensions.get('window').height * 0.04,
  },
  titleTextStyle: {
    fontSize: 24,
    fontWeight: 'bold',

    color: '#000000',
  },
  titleTextStyle_italic: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  designationStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: Dimensions.get('window').height * 0.006,
    // marginHorizontal: Dimensions.get('window').width * 0.06,
    color: '#000000',
    marginTop: Dimensions.get('window').height * 0.02,
  },
  // ExpLocation: {
  //   textAlign: 'right',
  //   justifyContent: 'flex-end',
  //   alignSelf: 'flex-end',
  //   alignItems: 'flex-end',
  // },
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
  },
  expView1: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
  },
  editExpView: {
    flex: 1,
  },
  resumeText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {fontSize: 20, fontWeight: 'bold', color: '#6A6A6A', paddingTop: 15},

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
  dropdownContainer: {
    backgroundColor: 'white',
    margin: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  menuContent: {
    color: '#000',
    padding: 2,
    fontSize: 15,
  },
  buttonStyleDesc: {
    backgroundColor: '#4CA6A8',
    color: '#FFFFFF',
    height: Dimensions.get('window').height * 0.06,
    width: Dimensions.get('window').width * 0.4,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: '#4CA6A8',
    color: '#FFFFFF',
    height: Dimensions.get('window').height * 0.06,
    width: Dimensions.get('window').width * 0.7,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loaderStyle: {
    marginVertical: 16,
    marginBottom: 90,
    alignItems: 'center',
  },
});
