import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Tabs from './BottomTabs';
import {windowHeight} from '../utils/Dimensions';
import DrawerIcons from '../components/DrawerComponents/DrawerIcons';
import BottomTabs from '../navigations/BottomTabs';
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {CommonActions} from '@react-navigation/native';
import {Grid} from 'react-native-animated-spinkit';

Drawer = createDrawerNavigator();

export default function CustomDrawer({props, navigation}) {
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [pointerEvent, setPointerEvent] = useState('auto');
  const [opacity, setOpacity] = useState(1);

  function logoutPressed() {
    return new Promise(function (resolve, reject) {
      setSpinnerLoader(true);
      setPointerEvent('none');
      setOpacity(0.8);
      setTimeout(function () {
        setSpinnerLoader(false);
        setPointerEvent('auto');
        setOpacity(1);
        navigation.navigate('Login');
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Login'}],
          }),
        );
      }, 3000);
    });
  }
  return (
    <View pointerEvents={pointerEvent} style={{opacity: opacity}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#E5E3E4',
          marginBottom: '10%',
          // borderRadius: 120,
        }}>
        <Image
          resizeMode="contain"
          // style={{width: '80%', height: windowHeight / 5, marginLeft: '10%'}}
          style={{
            width: '90%',
            height: windowHeight / 7,
            marginTop: '10%',
            marginHorizontal: '5%',
            marginVertical: '5%',
            borderRadius: 10,
            marginBottom: '15%',
          }}
          source={require('../assets/images/bash_icon.png')}
        />
      </View>
      <Text style={styles.usernameStyle}>Bash Username</Text>
      <View style={{marginBottom: '5%'}}>
        {/* <View style={{flexDirection: 'row', marginLeft: '-10%'}}> */}
        {/* <AntDesign name={iconName} size={25} /> */}

        <TouchableOpacity
          style={{marginTop: '5%'}}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <View style={styles.drawerAlignStyle}>
            {/* <FontAwesome5 name={iconName} size={25} /> */}
            {/* <Ionicons name={iconName} size={25} /> */}
            <Text style={styles.mainDrawer}>My Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginTop: '5%'}}
          onPress={() => {
            navigation.navigate('JobPosting');
          }}>
          <View style={styles.drawerAlignStyle}>
            {/* <FontAwesome5 name={iconName} size={25} /> */}
            {/* <Ionicons name={iconName} size={25} /> */}
            <Text style={styles.mainDrawer}>Job Posting</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginTop: '5%'}}
          onPress={() => {
            navigation.navigate('Settings');
          }}>
          <View style={styles.drawerAlignStyle}>
            {/* <FontAwesome5 name={iconName} size={25} /> */}
            {/* <Ionicons name={iconName} size={25} /> */}
            <Text style={styles.mainDrawer}>Settings</Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            marginTop: '75%',
            backgroundColor: '#E5E3E4',
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 24,
            flexDirection: 'column',
          }}>
          <TouchableOpacity style={{marginTop: '5%'}}>
            {/* <FontAwesome5 name={iconName} size={25} /> */}
            {/* <Ionicons name={iconName} size={25} /> */}
            <Text
              style={styles.drawerTextBottom}
              onPress={() => {
                navigation.navigate('Settings');
              }}>
              Need help? Contact Us
            </Text>
          </TouchableOpacity>
        </View>

        {/* logout */}

        <View
          style={{
            marginTop: '5%',
            backgroundColor: '#E5E3E4',
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 24,
            flexDirection: 'column',
          }}>
          <TouchableOpacity style={{marginTop: '5%'}} onPress={logoutPressed}>
            {/* <FontAwesome5 name={iconName} size={25} /> */}
            {/* <Ionicons name={iconName} size={25} /> */}
            <Text style={styles.drawerTextBottom}>Logout</Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </View>

      {spinnerLoader ? (
        <Grid
          style={styles.gridStyle}
          size={Dimensions.get('window').width * 0.2}
          color="#5BA199"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  usernameStyle: {
    color: '#5BA199',
    marginHorizontal: '5%',
    fontSize: 22,
    // fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: '5%',
    marginLeft: '6%',
  },
  mainDrawer: {
    fontSize: 18,
    // fontStyle: 'italic',
    // marginRight: '-10%',
    // color: 'black',
    // fontWeight: 'bold',
  },
  drawerTextBottom: {
    fontSize: 15,
    // fontStyle: 'italic',
    // marginRight: '-10%',
    // color: 'black',
    alignSelf: 'center',
    marginBottom: 15,
    // fontWeight: 'bold',
  },
  drawerAlignStyle: {
    marginLeft: '7%',
    marginTop: '2%',
  },
  gridStyle: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.5,
    left: Dimensions.get('window').width * 0.4,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
