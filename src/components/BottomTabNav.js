import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Animated, Easing} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ExplorePage from '../screens/ExplorePage';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const {layout, position, scene} = sceneProps;

      const thisSceneIndex = scene.index;

      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0], // move to the right to enter the screen from left and move to the left to exit the screen towards right  (0 index is the current page)
      });

      return {transform: [{translateX}]}; //returning the required interpolation for the transition animation of Bottom Tab Navigator.
    }, //end of screenInterpolator
  }; //end of return of transitionConfig()  function
}; //end of transitionConfig() function

const BottomTabNavigator = () => (
  //bottom tab navigator component starts here

  <NavigationContainer>
    <Tab.Navigator
      tabBarOptions={{activeTintColor: '#e91e63'}}
      screenOptions={{headerShown: false}}>
      {/* //setting up active tint color for bottom tab navigator */}
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* //adding home screen in  bottom tab navigator with its name and component */}
      <Tab.Screen name="Explore" component={ExplorePage} />
      {/* //adding settings screen in bottom tab navigator with its name and component */}
    </Tab.Navigator>
  </NavigationContainer>

  //closing tag of bottom tab navigator component
); //closing tag of bottom tab navigator component

export default BottomTabNavigator;
