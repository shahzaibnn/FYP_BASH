import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
// import RegistrationScreenStudent from './src/screens/RegistrationScreenStudent';
import RegistrationScreenFaculty from './RegistrationScreenFaculty';

import FastImage from 'react-native-fast-image';
import {profile, jobs, posts, experience, user} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SliderBox} from 'react-native-image-slider-box';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TestReg = () => {
  const [postsSelected, setpostsSelected] = useState(false);
  const [peopleSelected, setpeopleSelected] = useState(false);
  const [jobsSelected, setjobsSelected] = useState(false);
  const profileName = 'Tony';
  const TitleTag = () => {
    if (true) {
      console.log('hi');
      return <RegistrationScreenFaculty />;
    } else if (peopleSelected) {
      return <Text style={styles.titleTextStyle}>People</Text>;
    }
  };

  return (
    <View>
      <TouchableOpacity>
        <Text>{TitleTag()}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestReg;
