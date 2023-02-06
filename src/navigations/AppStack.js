import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import React from 'react';

// import ProfileScreen from './src/screens/ProfileScreen';

// import HomeScreen from './src/screens/HomeScreen';
// import CreatePostScreen from './src/screens/CreatePostScreen';
// import SettingsScreen from './src/screens/SettingsScreen';
// import JobDashboardScreen from './src/screens/JobDashboardScreen';
import LoginScreen from '../screens/LoginScreen';
import StartScreen from '../screens/StartScreen';
import ForgotPassword from '../screens/ForgotPassword';

// import ApplyToJob from './src/screens/ApplyToJob';

// import PdfViewScreen from './src/screens/PDFViewScreen';
// import ViewJob from './src/screens/ViewJob';
// import Test from './src/screens/Test';
// import ExplorePage from './src/screens/ExplorePage';
import SplashScreen from '../screens/SplashScreen';
// import EditProfileScreen from './src/screens/EditProfileScreen';

// import TestReg from './src/screens/TestReg';
// import Test from './src/Firebase/Test';
// import Email from './src/screens/TestEmail';
// import Email from './src/screens/Email';
// import ImageScreen from './src/screens/Image';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistrationTabs from './RegistrationTabs';
// import Alerts_Error from './src/components/AlertBoxStyles/Alerts_Error';
// import Alerts_Success from './src/components/AlertBoxStyles/Alerts_Success';
// import ModalTester from './src/components/AlertBoxStyles/Modal';
// import {Toaster} from './src/components/AlertBoxStyles/Toaster';
// import ToastAlert from './src/components/AlertBoxStyles/ToastAlert';
// import NotificationsTest from './src/components/AlertBoxStyles/NotificationsTest';
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

// import MyTabs from '../screens/tabs';

export default function AppStack() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  return (
    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Registration" component={RegistrationTabs} />
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="Explore" component={ExplorePage} /> */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Drawer" component={DrawerNav} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="JobPosting" component={JobPostingScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
