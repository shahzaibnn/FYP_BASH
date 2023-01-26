import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
// import {CONSTANTS} from '../../assets/strings/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome5Icon from 'react-native-vector-icons/fontawesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createDrawerNavigator} from '@react-navigation/drawer';

export default function DrawerIcons({
  imagePath,
  name,
  iconName,
  path,
  navigation,
}) {
  return (
    <View style={{flexDirection: 'row', marginBottom: '5%'}}>
      <Image
        resizeMode="contain"
        style={{width: 22, height: 22, marginLeft: '10%'}}
        source={imagePath}
      />
      {/* <View style={{flexDirection: 'row', marginLeft: '-10%'}}> */}
      {/* <AntDesign name={iconName} size={25} /> */}

      <TouchableOpacity style={{marginLeft: '-10%', marginTop: '5%'}}>
        <View style={{flexDirection: 'row', marginLeft: '-10%'}}>
          {/* <FontAwesome5 name={iconName} size={25} /> */}
          {/* <Ionicons name={iconName} size={25} /> */}
          <Text
            style={{
              fontSize: 16,
              // fontStyle: 'italic',
              marginLeft: '10%',
              color: 'black',
              // fontWeight: 'bold',
            }}
            onPress={() => {
              navigation.navigate({path});
            }}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
      {/* </View> */}
    </View>
  );
}
