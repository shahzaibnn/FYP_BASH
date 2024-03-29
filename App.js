import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import RegistrationScreenStudent from './src/screens/RegistrationScreenStudent';

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
import EditProfileScreen from './src/screens/EditProfileScreen';

import TestReg from './src/screens/TestReg';
import Test from './src/Firebase/Test';
// import Email from './src/screens/TestEmail';
import Email from './src/screens/Email';
import ImageScreen from './src/screens/Image';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTabs from './src/navigations/RegistrationTabs';
import Alerts_Error from './src/components/AlertBoxStyles/Alerts_Error';
import Alerts_Success from './src/components/AlertBoxStyles/Alerts_Success';
import ModalTester from './src/components/AlertBoxStyles/Modal';
import {Toaster} from './src/components/AlertBoxStyles/Toaster';
import ToastAlert from './src/components/AlertBoxStyles/ToastAlert';
import NotificationsTest from './src/components/AlertBoxStyles/NotificationsTest';
import BottomTabs from './src/navigations/BottomTabs';
import AppStack from './src/navigations/AppStack';
import JobPostingScreen from './src/screens/JobPostingScreen';
import TestScreen from './src/screens/TestScreen';
import TestHome from './src/screens/TestHome';
import ClassFunc from './src/screens/ClassFunc';
import AnotherTest from './src/screens/AnotherTest';
import HomeInfinite from './src/screens/HomeInfinite';
// import Tip from './src/components/AlertBoxStyles/Tip';
import {Provider} from 'react-redux';
// import {Provider} from 'redux';
import {store} from './src/store/store';
import DropDownCheck from './src/screens/DropdownCheck';

// import {db, authorization, auth} from '../Firebase/Config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';

import {CommonActions} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import {getAuth} from 'firebase/auth';
import AuthStack from './src/navigations/AuthStack';

import {MMKV} from 'react-native-mmkv';
import AdminRequestManagement from './src/screens/AdminRequestManagement';
import AdminUserManagement from './src/screens/AdminUserManagement';
import AdminStack from './src/navigations/AdminStack';
import AlertTesting from './src/screens/AlertTesting';
import AdminLogin from './src/screens/AdminLogin';
import AdminDashboard from './src/screens/AdminDashboad';

export const storage = new MMKV();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {storage.getString('authToken') ? (
          <AuthStack email={storage.getString('loggedInUser')} />
        ) : (
          <AppStack />
        )}
      </NavigationContainer>
    </Provider>

    // <AdminLogin />
    // <Provider store={store}>
    //   <JobPostingScreen />
    // </Provider>

    // <AdminDashboard />

    // <Provider store={store}>
    //   <NavigationContainer>
    //     <AdminStack />
    //   </NavigationContainer>
    // </Provider>

    // <SettingsScreen/>

    // <AlertTesting />

    // <AdminUserManagement />

    // <AdminRequestManagement />
  );

  // const Stack = createNativeStackNavigator();

  // const checkIfUserIsLoggedIn = async () => {
  //   const authToken = await AsyncStorage.getItem('authToken');
  //   if (authToken) {
  //     const auth = getAuth();
  //     onAuthStateChanged(auth, user => {
  //       if (user) {
  //         setFlag(true);
  //         const userEmail = user.email.toLowerCase();
  //         navigation.dispatch(
  //           CommonActions.reset({
  //             index: 1,
  //             routes: [
  //               {
  //                 name: 'Drawer',

  //                 params: {
  //                   screen: 'BottomTabs',
  //                   params: {
  //                     screen: 'Home',
  //                     params: {
  //                       userEmail,
  //                     },
  //                   },
  //                 },
  //               },
  //             ],
  //           }),
  //         );
  //       }
  //     });
  //   }
  // };

  // const [loading, setLoading] = useState(true);
  // const [flag, setFlag] = useState(false);

  // const FetchLoggedInData = async () => {
  //   try {
  //     const data = await AsyncStorage.getItem('authToken');
  //     console.log(data);
  //     if (data) {
  //       setFlag(true);
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   FetchLoggedInData();
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  // return (
  //   <>
  //     {loading ? (
  //       <></>
  //     ) : (
  //       <>
  //         <Provider store={store}>
  //           <NavigationContainer>
  //             {flag ? <AuthStack email={'bashfyp@gmail.com'} /> : <AppStack />}
  //           </NavigationContainer>
  //         </Provider>
  //       </>
  //     )}
  //   </>
  // );

  // check().then(res => {
  //   res ? <Text>aaaaaaaaaaaa</Text> : <></>
  // });
  // <DropDownCheck />

  // <EditProfileScreen />
  //  <ExplorePage />
  // <SettingsScreen />

  //  <BottomTabs />
  // <JobPostingScreen />
  // <ViewJob />
  // <JobDashboardScreen />
  // <HomeScreen />
  // <HomeInfinite />

  // <TestScreen />
  // <TestHome />
  // <ClassFunc />
  // <AnotherTest />
  // <NavigationContainer>
  //   <Stack.Navigator
  //     screenOptions={{
  //       headerShown: false,
  //     }}>
  //     <Stack.Screen name="EditProfile" component={EditProfileScreen} />
  //     <Stack.Screen name="Splash" component={SplashScreen} />
  //     <Stack.Screen name="Start" component={StartScreen} />
  //     <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  //     <Stack.Screen name="Registration" component={RegistrationScreen} />
  //     <Stack.Screen name="Login" component={LoginScreen} />
  //     <Stack.Screen name="Home" component={HomeScreen} />
  //   </Stack.Navigator>
  // </NavigationContainer>

  // <NavigationContainer>
  //   <Stack.Navigator
  //     screenOptions={{
  //       headerShown: false,
  //     }}>
  //     {/* <Stack.Screen name="ViewJob" component={ViewJob} /> */}
  //     <Stack.Screen name="test" component={Test} />
  //     <Stack.Screen name="Splash" component={SplashScreen} />
  //     <Stack.Screen name="Start" component={StartScreen} />
  //     <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  //     <Stack.Screen name="Registration" component={MyTabs} />
  //     <Stack.Screen name="Login" component={LoginScreen} />
  //     <Stack.Screen name="Home" component={HomeScreen} />
  //   </Stack.Navigator>
  // </NavigationContainer>

  // <NavigationContainer>
  //   <MyTabs />
  // </NavigationContainer>

  // Testing email
  // <Email />
  // <NotificationsTest />
  // <ForgotPassword />
  // <RegistrationScreenStudent />
  // <Test />
  // <RegistrationScreen />
  // <TestReg></TestReg>
  // <Alerts_Error />
  // <Alerts_Success />
  // <ToastAlert />
  // <Toaster />
  // <ModalTester></ModalTester>
  // <Tip />
  // <HomeScreen />
  // <CreatePostScreen />
  // <SettingsScreen />
  // <JobDashboardScreen />
  // <LoginScreen />
  // <StartScreen />
  // <ProfileScreen />
  // <ApplyToJob />
  // <ViewJob />
  // <ExplorePage />
  // <Test />
  // <PdfViewScreen />

  // <ImageScreen />
  // <JobPostingScreen />

  // <ProfileScreen />
  // <ApplyToJob />
  // <Test />
  // <SplashScreen />
  // <ViewProfileScreen />
}
