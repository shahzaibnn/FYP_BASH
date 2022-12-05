import {View, Text} from 'react-native';
import React from 'react';
import RegistrationScreen from './src/screens/RegistrationScreen';

import ProfileScreen from './src/screens/ProfileScreen';

import HomeScreen from './src/screens/HomeScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import JobDashboardScreen from './src/screens/JobDashboardScreen';
import LoginScreen from './src/screens/LoginScreen';
import StartScreen from './src/screens/StartScreen';
import ForgotPassword from './src/screens/ForgotPassword';

import ApplyToJob from './src/screens/ApplyToJob';

import PdfViewScreen from './src/screens/PDFViewScreen';
import ViewJob from './src/screens/ViewJob';
// import Test from './src/screens/Test';
import ExplorePage from './src/screens/ExplorePage';
import SplashScreen from './src/screens/SplashScreen';

import Test from './src/Firebase/Test';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShown: false,
    //     }}>
    //     <Stack.Screen name="Splash" component={SplashScreen} />
    //     <Stack.Screen name="Start" component={StartScreen} />
    //     <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    //     <Stack.Screen name="Registration" component={RegistrationScreen} />
    //     <Stack.Screen name="Login" component={LoginScreen} />
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    // <Test />
    // <RegistrationScreen />

    // <HomeScreen />
    // <CreatePostScreen />
    // <SettingsScreen />
    // <JobDashboardScreen />
    <LoginScreen />
    // <StartScreen />
    // <ProfileScreen />
    // <ApplyToJob />
    // <ViewJob />
    // <ExplorePage />
    // <Test />
    // <PdfViewScreen />

    // <JobPostingScreen />

    // <ProfileScreen />
    // <ApplyToJob />
    // <Test />
    // <SplashScreen />
    // <ViewProfileScreen />
  );
}
