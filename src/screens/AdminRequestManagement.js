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

import {useSelector, useDispatch} from 'react-redux';

const AdminRequestManagement = ({navigation}) => {
  const [peopleSelected, setpeopleSelected] = useState(true);
  const [postsSelected, setpostsSelected] = useState(false);
  const [jobsSelected, setjobsSelected] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dbFirestore()
      .collection('users')
      .where('accountApproved', '==', 'pending')
      .onSnapshot(querySnapshot => {
        const usersList = [];
        querySnapshot.forEach(documentSnapshot => {
          usersList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setUsers(usersList);
      });
  }, []);
  const peopleScreenmethod = () => {
    return (
      <View>
        <View style={styles.expView}>
          <View style={styles.userTabs}>
            <TouchableOpacity>
              {/* <AntDesign name="adduser" size={15} color="#4CA6A8" /> */}
              <Text style={styles.userTabStyles}>New Users</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userTabs}>
            <TouchableOpacity>
              <Text style={styles.userTabStyles}>Updates</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userTabs}>
            <TouchableOpacity>
              <Text style={styles.userTabStyles}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const postsScreenmethod = () => {};
  const jobsScreenmethod = () => {};

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          source={require('../assets/images/bash_icon.png')}
          style={{
            height: Dimensions.get('window').height * 0.04,
            width: Dimensions.get('window').width * 1,
            marginTop: '5%',
            aspectRatio: 6,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontSize: 28,
            color: '#4CA6A8',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '5%',
          }}>
          Request Management
        </Text>
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
                setjobsSelected(false);

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

          <Text style={styles.iconText}>Users</Text>
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
                setjobsSelected(false);
                setpeopleSelected(false);
                // setSearchSelected(false);
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

          <Text style={styles.iconText}>Posts</Text>
        </View>
        {/* job icon */}

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              // marginLeft: Dimensions.get('window').width * 0.04,
              // marginTop: Dimensions.get('window').width * 0.04,
              backgroundColor: jobsSelected ? '#4CA6A8' : '#ffffff',
              borderRadius: 100,

              height: Dimensions.get('window').height * 0.1,
              width: Dimensions.get('window').width * 0.2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={() => {
                setjobsSelected(true);
                setpostsSelected(false);

                setpeopleSelected(false);
                // setSearchSelected(false);
                console.log(setjobsSelected);
              }}>
              <Ionicons
                name="briefcase"
                size={35}
                color={jobsSelected ? '#ffffff' : '#4CA6A8'}
                style={styles.icon}
                backgroundColor="blue"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.iconText}>Jobs</Text>
        </View>
      </View>
      <View style={styles.titleStyle}>
        {/* <Text>{TitleTag}</Text> */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',

            color: '#000000',
          }}>
          {peopleSelected
            ? 'Pending Requests'
            : postsSelected
            ? 'Posts'
            : jobsSelected
            ? 'Jobs'
            : null}
        </Text>
      </View>
      {/* after title screen */}

      {peopleSelected
        ? peopleScreenmethod()
        : postsSelected
        ? postsScreenmethod()
        : jobsSelected
        ? jobsScreenmethod()
        : null}
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
    marginLeft: Dimensions.get('window').height * 0.04,
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
});
