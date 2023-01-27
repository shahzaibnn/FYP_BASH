import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
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

Drawer = createDrawerNavigator();

export default function CustomDrawer({props, navigation}) {
  return (
    <View>
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
          <TouchableOpacity
            style={{marginTop: '5%'}}
            onPress={() => {
              navigation.navigate('Login');
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'Login'}],
                }),
              );
            }}>
            {/* <FontAwesome5 name={iconName} size={25} /> */}
            {/* <Ionicons name={iconName} size={25} /> */}
            <Text style={styles.drawerTextBottom}>Logout</Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </View>
    </View>
  );
  {
    /* // another above */
  }

  {
    /* // return ( */
  }
  //   // <Drawer.Navigator
  //   //   drawerContent={props => (
  //   //     <View>
  //   //       <View
  //   //         style={{
  //   //           flexDirection: 'row',
  //   //           backgroundColor: '#E5E3E4',
  //   //           marginBottom: '10%',
  //   //           // borderRadius: 120,
  //   //         }}>
  //   //         <Image
  //   //           resizeMode="contain"
  //   //           // style={{width: '80%', height: windowHeight / 5, marginLeft: '10%'}}
  //   //           style={{
  //   //             width: '90%',
  //   //             height: windowHeight / 7,
  //   //             marginTop: '10%',
  //   //             marginHorizontal: '5%',
  //   //             marginVertical: '5%',
  //   //             borderRadius: 10,
  //   //             marginBottom: '15%',
  //   //           }}
  //   //           source={require('../assets/images/bash_icon.png')}
  //   //         />
  //   //       </View>
  //   //       <Text
  //   //         style={{
  //   //           color: '#5BA199',
  //   //           marginHorizontal: '5%',
  //   //           fontSize: 25,
  //   //           // fontStyle: 'italic',
  //   //           fontWeight: 'bold',
  //   //           marginBottom: '5%',
  //   //           marginLeft: '6%',
  //   //         }}>
  //   //         Bash Username
  //   //       </Text>
  //   //       {/* <DrawerIcons
  //   //         // imagePath={require('../assets/images/start_image.png')}
  //   //         name={'Home'}
  //   //         iconName="home"
  //   //       /> */}
  //   //       <DrawerIcons
  //   //         // imagePath={require('../assets/images/icons/services.png')}
  //   //         name={'My Profile'}
  //   //         iconName={'user-circle'}
  //   //       />
  //   //       <DrawerIcons name={'Applied Jobs'} iconName={'newspaper'} />
  //   //       <DrawerIcons
  //   //         // imagePath={require('../assets/images/icons/services.png')}
  //   //         name={'Settings'}
  //   //         // onPress={() => navigation.navigate('Settings')}
  //   //         // iconName={'settings'}
  //   //       />

  //   //       <View
  //   //         style={{
  //   //           marginTop: '75%',
  //   //           backgroundColor: '#E5E3E4',
  //   //           marginLeft: 10,
  //   //           marginRight: 10,
  //   //           borderRadius: 24,
  //   //           flexDirection: 'column',
  //   //         }}>
  //   //         <DrawerIcons
  //   //           // imagePath={require('../assets/images/icons/services.png')}
  //   //           name={'Need help? Contact Us'}
  //   //           // onPress={() => navigation.navigate('Settings')}
  //   //         />
  //   //       </View>

  //   //       <View
  //   //         style={{
  //   //           marginTop: '5%',
  //   //           backgroundColor: '#E5E3E4',
  //   //           marginLeft: 10,
  //   //           marginRight: 10,
  //   //           borderRadius: 24,
  //   //           flexDirection: 'column',
  //   //           // width: '95%',
  //   //           // height: '7%',
  //   //         }}>
  //   //         <DrawerIcons
  //   //           // imagePath={require('../assets/images/icons/services.png')}
  //   //           name={'Log out'}
  //   //           // onPress={() => navigation.navigate('Settings')}
  //   //         />
  //   //       </View>
  //   //       {/*
  //   //       <DrawerIcons
  //   //         imagePath={require('../assets/images/icons/privacy.png')}
  //   //         name={'Privacy Policy'}
  //   //       />
  //   //       <DrawerIcons
  //   //         imagePath={require('../assets/images/icons/rules.png')}
  //   //         name={'Property Rules'}
  //   //       />
  //   //       <DrawerIcons
  //   //         imagePath={require('../assets/images/icons/cancellation.png')}
  //   //         name={'Refund & Cancellation'}
  //   //       />
  //   //       <DrawerIcons
  //   //         imagePath={require('../assets/images/icons/policy.png')}
  //   //         name={'Legal Policy'}
  //   //       />
  //   //       <DrawerIcons
  //   //         imagePath={require('../assets/images/icons/reservation.png')}
  //   //         name={'Reservation TNC'}
  //   //       />
  //   //       <DrawerIcons
  //   //         imagePath={require('../assets/images/icons/notification.png')}
  //   //         name={'Notifications'}
  //   //       />
  //   //       <DrawerIcons
  //   //         imagePath={require('../assets/images/icons/faqs.png')}
  //   //         name={'FAQs'}
  //   //       /> */}
  //   //     </View>
  //   //   )}
  //   //   detachInactiveScreens={false}
  //   //   screenOptions={{headerShown: false}}>
  //   //   <Drawer.Screen name="BottomTabs" component={BottomTabs} />
  //   //   {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
  //   // </Drawer.Navigator>

  //   <DrawerContentScrollView {...props}>
  //     <View>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           backgroundColor: '#E5E3E4',
  //           marginBottom: '10%',
  //           // borderRadius: 120,
  //         }}>
  //         <Image
  //           resizeMode="contain"
  //           // style={{width: '80%', height: windowHeight / 5, marginLeft: '10%'}}
  //           style={{
  //             width: '90%',
  //             height: windowHeight / 7,
  //             marginTop: '10%',
  //             marginHorizontal: '5%',
  //             marginVertical: '5%',
  //             borderRadius: 10,
  //             marginBottom: '15%',
  //           }}
  //           source={require('../assets/images/bash_icon.png')}
  //         />
  //       </View>
  //       <Text
  //         style={{
  //           color: '#5BA199',
  //           marginHorizontal: '5%',
  //           fontSize: 25,
  //           // fontStyle: 'italic',
  //           fontWeight: 'bold',
  //           marginBottom: '5%',
  //           marginLeft: '6%',
  //         }}>
  //         Bash Username
  //       </Text>
  //       {/* <DrawerIcons
  //           // imagePath={require('../assets/images/start_image.png')}
  //           name={'Home'}
  //           iconName="home"
  //         /> */}
  //       <DrawerIcons
  //         // imagePath={require('../assets/images/icons/services.png')}
  //         name={'My Profile'}
  //         iconName={'user-circle'}
  //       />
  //       <DrawerIcons name={'Applied Jobs'} iconName={'newspaper'} />
  //       <DrawerIcons
  //         // imagePath={require('../assets/images/icons/services.png')}
  //         name={'Settings'}
  //         path="Settings"
  //         // onPress={() => {
  //         //   navigation.navigate('Settings');
  //         // }}
  //         // onPress={() => navigation.navigate('Settings')}
  //         // iconName={'settings'}
  //       />

  //       <View
  //         style={{
  //           marginTop: '75%',
  //           backgroundColor: '#E5E3E4',
  //           marginLeft: 10,
  //           marginRight: 10,
  //           borderRadius: 24,
  //           flexDirection: 'column',
  //         }}>
  //         <DrawerIcons
  //           // imagePath={require('../assets/images/icons/services.png')}
  //           name={'Need help? Contact Us'}
  //           // onPress={() => navigation.navigate('Settings')}
  //         />
  //       </View>

  //       <View
  //         style={{
  //           marginTop: '5%',
  //           backgroundColor: '#E5E3E4',
  //           marginLeft: 10,
  //           marginRight: 10,
  //           borderRadius: 24,
  //           flexDirection: 'column',
  //           // width: '95%',
  //           // height: '7%',
  //         }}>
  //         <DrawerIcons
  //           // imagePath={require('../assets/images/icons/services.png')}
  //           name={'Log out'}
  //           // onPress={() => navigation.navigate('Settings')}
  //         />
  //       </View>
  //       {/*
  //         <DrawerIcons
  //           imagePath={require('../assets/images/icons/privacy.png')}
  //           name={'Privacy Policy'}
  //         />
  //         <DrawerIcons
  //           imagePath={require('../assets/images/icons/rules.png')}
  //           name={'Property Rules'}
  //         />
  //         <DrawerIcons
  //           imagePath={require('../assets/images/icons/cancellation.png')}
  //           name={'Refund & Cancellation'}
  //         />
  //         <DrawerIcons
  //           imagePath={require('../assets/images/icons/policy.png')}
  //           name={'Legal Policy'}
  //         />
  //         <DrawerIcons
  //           imagePath={require('../assets/images/icons/reservation.png')}
  //           name={'Reservation TNC'}
  //         />
  //         <DrawerIcons
  //           imagePath={require('../assets/images/icons/notification.png')}
  //           name={'Notifications'}
  //         />
  //         <DrawerIcons
  //           imagePath={require('../assets/images/icons/faqs.png')}
  //           name={'FAQs'}
  //         /> */}
  //     </View>
  //   </DrawerContentScrollView>
  // );
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
});
