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
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={[
                  styles.container,
                  {
                    // backgroundColor: focused ? 'white' : '',

                    shadowColor: focused ? '#000000' : '',
                    shadowOpacity: focused ? 0.5 : 0,
                    shadowRadius: focused ? 6 : 0,
                    elevation: focused ? 8 : 0,
                  },
                ]}>
                <FontAwesome name="home" size={30} color="#000000" />

                {/* <Image
                  style={styles.image}
                  source={require('../assets/images/bash_icon.png')}
                /> */}
                <Text>Home</Text>
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

                    shadowColor: focused ? '#000000' : '',
                    shadowOpacity: focused ? 0.5 : 0,
                    shadowRadius: focused ? 6 : 0,
                    elevation: focused ? 8 : 0,
                  },
                ]}>
                <Ionicons name="search-circle" size={30} color="#000000" />

                {/* <Image
                  style={styles.image}
                  source={require('../assets/images/bash_icon.png')}
                />
                */}
                <Text>Explore</Text>
              </View>
            );
          },
        }}
        name="Explore"
        component={ExploreScreen}
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

                    shadowColor: focused ? '#000000' : '',
                    shadowOpacity: focused ? 0.5 : 0,
                    shadowRadius: focused ? 6 : 0,
                    elevation: focused ? 8 : 0,
                    marginTop: -60,
                    borderRadius: 64,
                    borderWidth: 2,
                  },
                ]}>
                <Feather name="plus" size={30} color="#000000" />

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

                    shadowColor: focused ? '#000000' : '',
                    shadowOpacity: focused ? 0.5 : 0,
                    shadowRadius: focused ? 6 : 0,
                    elevation: focused ? 8 : 0,
                  },
                ]}>
                <FontAwesome name="briefcase" size={30} color="#000000" />
                {/* <Image
                  style={styles.image}
                  source={require('../assets/images/bash_icon.png')}
                />
                */}
                <Text>Jobs</Text>
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

                    shadowColor: focused ? '#000000' : '',
                    shadowOpacity: focused ? 0.5 : 0,
                    shadowRadius: focused ? 6 : 0,
                    elevation: focused ? 8 : 0,
                  },
                ]}>
                <Ionicons name="settings" size={30} color="#000000" />

                {/* <Image
                  style={styles.image}
                  source={require('../assets/images/bash_icon.png')}
                /> */}
                <Text>Settings</Text>
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
  tabBar: {
    height: 60,
    elevation: 0,
    borderTopWidth: 0,
    backgroundColor: '#5BA199',
    borderRadius: 24,
    position: 'absolute',
    // width: Dimensions.get('window').width,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 16,

    backgroundColor: '#5BA199',
    marginLeft: '10%',
  },
  image: {width: 30, height: 30},
});
