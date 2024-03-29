import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RegistrationScreenAlumni from '../screens/RegistrationScreenAlumni';
import RegistrationScreenFaculty from '../screens/RegistrationScreenFaculty';
import RegistrationScreenStudent from '../screens/RegistrationScreenStudent';
import MyTabBar from '../screens/tabBarChecking';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import Toast from 'react-native-toast-message';

const Tab = createMaterialTopTabNavigator();

export default function RegistrationTabs({navigation}) {
  return (
    // <View>
    <>
      <View style={styles.Header}>
        <TouchableOpacity
          style={{position: 'absolute', left: '5%'}}
          onPress={() => navigation.navigate('Login')}>
          <AntDesign name="leftcircle" size={32} color="#777777" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Register Here</Text>
      </View>

      <Tab.Navigator
        style={styles.nav}
        initialRouteName="Student"
        screenOptions={{
          tabBarIndicatorStyle: {backgroundColor: '#000000'},
          tabBarActiveTintColor: 'white',
          tabBarInActiveTintColor: '#E5E3E4',
          tabBarBounces: true,
          tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
          tabBarStyle: {
            backgroundColor: '#469597',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
            borderBottomLeftRadius: 24,
            marginRight: '2%',
            marginLeft: '2%',
            overflow: 'hidden',
          },
        }}
        // tabBar={props => <MyTabBar {...props} />}
      >
        <Tab.Screen name="Student" component={RegistrationScreenStudent} />
        <Tab.Screen name="Faculty" component={RegistrationScreenFaculty} />
        <Tab.Screen name="Alumni" component={RegistrationScreenAlumni} />
      </Tab.Navigator>

      <Toast topOffset={30} />

      {/* </View> */}
    </>
  );
}
const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#E5E3E4',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 15,
    marginLeft: 25,
    marginRight: 25,
    margin: 10,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '3%',
    backgroundColor: '#E5E3E4',
  },
  titleText: {
    fontSize: 30,
    // fontSize: 32,
    fontWeight: 'bold',
    // fontStyle: 'italic',
    // textAlign: 'center',
    marginTop: '2%',
    marginLeft: '4%',
    marginBottom: '4%',
    color: '#5BA199',
  },
});
