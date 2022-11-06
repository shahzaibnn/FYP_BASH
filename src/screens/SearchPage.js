import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {profile, jobs, posts} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SliderBox} from 'react-native-image-slider-box';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchPage = () => {
  return (
    <ScrollView>
      <View
        style={{flexDirection: 'row', marginTop: '3%', marginHorizontal: '5%'}}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginLeft: '3%',
            marginTop: '3%',
            // marginRight: '5%',
            justifyContent: 'space-between',

            height: 60,
            backgroundColor: '#ffffff',
            flex: 1,
            borderRadius: 16,
            flexDirection: 'row',
          }}>
          <Text style={{marginLeft: '5%'}}>Search here...</Text>
          <View
            style={{padding: 10, backgroundColor: '#5BA199', borderRadius: 16}}>
            <Ionicons
              name="options-outline"
              size={40}
              color="#ffffff"
              style={{}}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Another view for options */}
      <View style={styles.ExpBoxView}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="post"
            size={50}
            color="#000000"
            style={{marginLeft: Dimensions.get('window').width * 0.05}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome
            name="blog"
            size={50}
            color="#000000"
            style={{marginLeft: Dimensions.get('window').width * 0.05}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome
            name="user"
            size={50}
            color="#000000"
            style={{marginLeft: Dimensions.get('window').width * 0.05}}
          />
        </TouchableOpacity>
      </View>

      {/* Flatlist for selected option */}
      {/* <View style={{marginHorizontal: '6%', marginVertical: '2%'}}>

    //   {/* <FlatList
    //     //   horizontal={true}
    //     //   showsHorizontalScrollIndicator={false}
    //     data={jobs}
    //     renderItem={({item}) => (
    //       <View
    //         style={{
    //           backgroundColor: '#BBC6C8',
    //           // padding: '3%',
    //           borderRadius: 16,
    //           marginBottom: Dimensions.get('window').height * 0.03,

    //           // marginHorizontal: Dimensions.get('window').width * 0.01,
    //           // elevation: 5,
    //         }}>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             marginTop: Dimensions.get('window').height * 0.02,
    //             marginHorizontal: Dimensions.get('window').width * 0.05,
    //           }}>
    //           <Image
    //             style={{
    //               height: 60,
    //               width: 60,
    //               borderRadius: 16,
    //               // marginLeft: Dimensions.get('window').width * 0.1,
    //             }}
    //             source={{
    //               uri: item.postedByPic,
    //             }}
    //           />

    //           <View style={{marginLeft: Dimensions.get('window').width * 0.03}}>
    //             <Text style={{fontSize: 12}}>
    //               {item.postedBy} posted a new job
    //             </Text>
    //             <Text
    //               style={{
    //                 fontSize: 18,
    //                 fontWeight: 'bold',
    //                 marginVertical: Dimensions.get('window').height * 0.005,
    //                 color: '#000000',
    //               }}>
    //               {item.title}
    //             </Text>
    //             <Text>{item.company}</Text>
    //           </View>

    //           <TouchableOpacity>
    //             <MaterialCommunityIcons
    //               name="dots-vertical"
    //               size={25}
    //               color="#000000"
    //               style={{marginLeft: Dimensions.get('window').width * 0.05}}
    //             />
    //           </TouchableOpacity>
    //         </View>

    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             justifyContent: 'space-between',
    //             alignItems: 'center',
    //             marginHorizontal: Dimensions.get('window').width * 0.05,
    //             marginVertical: Dimensions.get('window').height * 0.02,
    //           }}>
    //           <TouchableOpacity
    //             style={{
    //               backgroundColor: '#5BA199',
    //               paddingHorizontal: Dimensions.get('window').width * 0.15,
    //               paddingVertical: Dimensions.get('window').height * 0.01,
    //               borderRadius: 16,
    //             }}>
    //             <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
    //               Apply
    //             </Text>
    //           </TouchableOpacity>

    //           <Text style={{color: '#469597', fontSize: 16}}>
    //             {item.city},{item.country}
    //           </Text>
    //         </View>
    //       </View>
    //     )}
    //     keyExtractor={item => item.id}
    //   /> */}
      {/* </View> */}
    </ScrollView>
  );
};

export default SearchPage;
const styles = StyleSheet.create({
  ExpBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
