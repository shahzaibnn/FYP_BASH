import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import React from 'react';

import LoginScreen from '../screens/LoginScreen';
import StartScreen from '../screens/StartScreen';
import ForgotPassword from '../screens/ForgotPassword';

import SplashScreen from '../screens/SplashScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistrationTabs from './RegistrationTabs';

import BottomTabs from '../navigations/BottomTabs';
import CustomDrawer from './CustomDrawer';
import SettingsScreen from '../screens/SettingsScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import DrawerNav from './DrawerNav';
import ProfileScreen from '../screens/ProfileScreen';
import JobPostingScreen from '../screens/JobPostingScreen';
import ExplorePage from '../screens/ExplorePage';
import EditProfileScreen from '../screens/EditProfileScreen';
import ApplyToJob from '../screens/ApplyToJob';
import ViewProfileScreen from '../screens/ViewProfileScreen';
import PdfViewScreen from '../screens/PDFViewScreen';
import AdminRequestManagement from '../screens/AdminRequestManagement';
import AdminUserManagement from '../screens/AdminUserManagement';

export default function AdminStack() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  return (
    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="AdminUserManagement"
        component={AdminUserManagement}
      />
      <Stack.Screen
        name="AdminRequestManagement"
        component={AdminRequestManagement}
      />

      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
