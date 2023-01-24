import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExplorePage';
import CreatePostScreen from '../screens/CreatePostScreen';
import JobDashboardScreen from '../screens/JobDashboardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

export default function Tabs({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerBackgroundContainerStyle: {backgroundColor: '#E5E3E4'},
        headerStyle: {backgroundColor: '#E5E3E4'},

        headerShadowVisible: false,
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: 'black',
        // tabBarInactiveTintColor: 'gray',
        // tabBarActiveBackgroundColor: 'green',
      }}>
      <Tab.Screen
        options={{
          // tabBarActiveTintColor: '#d9d9d9',
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={[
                  styles.container,
                  {
                    // backgroundColor: focused ? 'white' : '',
                    shadowColor: focused ? '#5BA199' : '',

                    // shadowColor: focused ? '#000000' : '',
                    shadowOpacity: focused ? 0.5 : 0,
                    shadowRadius: focused ? 6 : 0,
                    elevation: focused ? 8 : 0,
                    // elevation: 0,
                  },
                ]}>
                <FontAwesome name="home" size={25} color="#5BA199" />

                {/* <Image
                  style={styles.image}
                  source={require('../assets/images/bash_icon.png')}
                /> */}
                <Text style={styles.tabBarText}>Home</Text>
              </View>
            );
          },
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={[
                  styles.container,
                  {
                    // backgroundColor: focused ? 'white' : '',
                    shadowColor: focused ? '#5BA199' : '',

                    // shadowColor: focused ? '#000000' : '',
                    shadowOpacity: focused ? 0.5 : 0,
                    shadowRadius: focused ? 6 : 0,
                    elevation: focused ? 8 : 0,
                  },
                ]}>
                <Ionicons name="search-circle" size={25} color="#5BA199" />

                {/* <Image
                  style={styles.image}
                  source={require('../assets/images/bash_icon.png')}
                />
                */}
                <Text style={styles.tabBarText}>Explore</Text>
              </View>
            );
          },
        }}
        name="Explore"
        component={ExploreScreen}
      />
      <Tab.Screen
        options={{
          // tabBaractiveTintColor: '#9BAB92',

          tabBarIcon: ({focused}) => {
            return (
              <View
                style={[
                  styles.plusContainer,
                  {
                    // backgroundColor: focused ? 'white' : '',

                    // shadowColor: focused ? '#000000' : '',
                    shadowColor: focused ? '#5BA199' : '',
                    shadowOpacity: focused ? 0.5 : 0,
                    shadowRadius: focused ? 6 : 0,
                    elevation: focused ? 8 : 0,
                    marginTop: -60,
                    borderRadius: 64,
                    borderWidth: 8,
                    borderColor: '#5BA199',
                    backgroundColor: 'black',
                  },
                ]}>
                <Feather
                  name="plus"
                  size={30}
                  color="#5BA199"
                  // style={styles.plusIcon}
                />

                {/* <Image
                  style={styles.image}
                  source={require('../assets/images/bash_icon.png')}
                /> */}

                {/* <Text>FAQs</Text> */}
              </View>
            );
          },
        }}
        name="CreatePost"
        component={CreatePostScreen}
      />
      <Tab.Screen
        options={{
          // tabBarLabel: 'Homwwe',
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={[
                  styles.container,
                  {
                    // backgroundColor: focused ? 'white' : '',
                    shadowColor: focused ? '#5BA199' : '',

                    // shadowColor: focused ? '#000000' : '',
                    shadowOpacity: focused ? 0.5 : 0,
                    shadowRadius: focused ? 6 : 0,
                    elevation: focused ? 8 : 0,
                  },
                ]}>
                <FontAwesome name="briefcase" size={25} color="#5BA199" />
                {/* <Image
                  style={styles.image}
                  source={require('../assets/images/bash_icon.png')}
                />
                */}
                <Text style={styles.tabBarText}>Jobs</Text>
              </View>
            );
          },
        }}
        name="JobDashboard"
        component={JobDashboardScreen}
      />
      <Tab.Screen
        options={{
          // tabBarLabel: 'Homwwe',
          tabBarIcon: ({focused}) => {
            console.log(focused);
            return (
              <View
                // onPress={() => navigation.openDrawer()}
                style={[
                  styles.container,
                  {
                    // backgroundColor: focused ? 'white' : '',
                    shadowColor: focused ? '#5BA199' : '',

                    // shadowColor: focused ? '#000000' : '',
                    shadowOpacity: focused ? 0.5 : 0,
                    shadowRadius: focused ? 6 : 0,
                    elevation: focused ? 8 : 0,
                  },
                ]}>
                <Ionicons name="settings" size={25} color="#5BA199" />

                {/* <Image
                  style={styles.image}
                  source={require('../assets/images/bash_icon.png')}
                /> */}
                <Text style={styles.tabBarText}>Settings</Text>
              </View>
            );
          },
        }}
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarText: {
    fontSize: 13,
    color: '#5BA199',
  },
  tabBar: {
    height: 60,
    elevation: 0,
    // borderTopWidth: 0,
    // borderWidth: 10,
    // backgroundColor: '#5BA199',
    // backgroundColor: 'rgba(0,0,0, 1)',
    backgroundColor: 'black',
    borderColor: '#5BA199',
    borderRadius: 16,
    // borderWidth: 8,
    position: 'absolute',
    // width: Dimensions.get('window').width,
  },
  plusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 50,
    shadowColor: '#5BA199',

    // borderRadius: 16,
    // borderWidth: 16,
    // backgroundColor: '#F4F8EE',
    marginLeft: '10%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 25,
    shadowColor: '#5BA199',

    // borderRadius: 16,
    // borderWidth: 16,
    // backgroundColor: '#F4F8EE',
    marginLeft: '10%',
    // marginBottom: '5%',
  },

  image: {width: 30, height: 30},
});
