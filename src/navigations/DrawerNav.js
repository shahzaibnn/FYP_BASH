import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTabs from '../navigations/BottomTabs';
import SettingsScreen from '../screens/SettingsScreen';
import {View} from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import JobDashboardScreen from '../screens/JobDashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
// import TabNavigator from './TabNavigator';
// import BottomTabs from '../navigations/BottomTabs';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#5BA199',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabs}
        // options={{
        //   drawerIcon: ({color}) => (
        //     <Ionicons name="home-outline" size={22} color={color} />
        //   ),
        // }}
      />
      {/* <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        // options={{
        //   drawerIcon: ({color}) => (
        //     <Ionicons name="settings-outline" size={22} color={color} />
        //   ),
        // }}
      /> */}
      {/* <Drawer.Screen
        name="Login"
        component={LoginScreen}
        // options={{
        //   drawerIcon: ({color}) => (
        //     <Ionicons name="settings-outline" size={22} color={color} />
        //   ),
        // }}
      /> */}
      {/* <Drawer.Screen
        name="JobDashboard"
        component={JobDashboardScreen}
        // options={{
        //   drawerIcon: ({color}) => (
        //     <Ionicons name="settings-outline" size={22} color={color} />
        //   ),
        // }}
      /> */}
      {/* <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        // options={{
        //   drawerIcon: ({color}) => (
        //     // <Ionicons name="settings-outline" size={22} color={color} />
        //   ),
        // }}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNav;
