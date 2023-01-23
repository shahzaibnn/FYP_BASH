import React, {useEffect} from 'react';
// import Toast from 'react-native-simple-toast';

import {ToastAndroid, Platform, AlertIOS} from 'react-native';

const NotificationsTest = () => {
  useEffect(() => {
    ToastAndroid.show('Hello World!', ToastAndroid.SHORT);
  }, []);

  return null;
};
export default NotificationsTest;
