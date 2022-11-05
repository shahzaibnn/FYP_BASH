import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {profile, jobs, posts} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SliderBox} from 'react-native-image-slider-box';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
  const profileName = 'Tony';
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#E5E3E4'}}>
      <View
        style={{flexDirection: 'row', marginTop: '3%', marginHorizontal: '5%'}}>
        <TouchableOpacity>
          <Image
            style={{height: 60, width: 60, borderRadius: 64}}
            source={{
              uri: profile[0].pic,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginLeft: '3%',
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

      <View
        style={{
          marginHorizontal: '5%',
          marginTop: '5%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          // backgroundColor: 'orange',
          alignItems: 'baseline',
        }}>
        <Text style={{fontSize: 20, color: '#000000', fontWeight: 'bold'}}>
          Recommended For You
        </Text>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            // backgroundColor: 'black',
          }}>
          <Text style={{fontSize: 12, color: '#777777'}}>Show all</Text>
          <Ionicons name="chevron-forward" size={12} color="#777777" />
        </TouchableOpacity>
      </View>

      <View style={{marginHorizontal: '3%', marginVertical: '4%'}}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={jobs}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: '#BBC6C8',
                // padding: '3%',
                borderRadius: 16,

                marginHorizontal: Dimensions.get('window').width * 0.01,
                // elevation: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: Dimensions.get('window').height * 0.02,
                  marginHorizontal: Dimensions.get('window').width * 0.05,
                }}>
                <Image
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 16,
                    // marginLeft: Dimensions.get('window').width * 0.1,
                  }}
                  source={{
                    uri: item.postedByPic,
                  }}
                />
                <View
                  style={{marginLeft: Dimensions.get('window').width * 0.03}}>
                  <Text style={{fontSize: 12}}>
                    {item.postedBy} posted a new job
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginVertical: Dimensions.get('window').height * 0.005,
                      color: '#000000',
                    }}>
                    {item.title}
                  </Text>
                  <Text>{item.company}</Text>
                </View>

                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={25}
                    color="#000000"
                    style={{marginLeft: Dimensions.get('window').width * 0.05}}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: Dimensions.get('window').width * 0.05,
                  marginVertical: Dimensions.get('window').height * 0.02,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#5BA199',
                    paddingHorizontal: Dimensions.get('window').width * 0.15,
                    paddingVertical: Dimensions.get('window').height * 0.01,
                    borderRadius: 16,
                  }}>
                  <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
                    Apply
                  </Text>
                </TouchableOpacity>

                <Text style={{color: '#469597', fontSize: 16}}>
                  {item.city},{item.country}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      <Text
        style={{
          color: '#000000',
          marginHorizontal: '5%',
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        News Feed
      </Text>

      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            let likeColor = '';

            console.log(item.likedBy);

            if (item.likedBy.includes(profileName)) {
              likeColor = '#000000';
              console.log('running');
            } else {
              likeColor = '#ffffff';
            }

            return (
              <View
                style={{
                  // elevation: 1000,
                  // backgroundColor: '#ffffff',
                  marginHorizontal: Dimensions.get('window').width * 0.05,
                  marginVertical: Dimensions.get('window').height * 0.01,
                  borderRadius: 16,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: Dimensions.get('window').height * 0.01,
                  }}>
                  <Image
                    source={{uri: item.imageUrl}}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 64,
                      marginLeft: Dimensions.get('window').width * 0.02,
                    }}
                  />
                  <View
                    style={{marginLeft: Dimensions.get('window').width * 0.05}}>
                    <Text
                      style={{
                        color: '#5BA199',
                        fontWeight: 'bold',
                        marginBottom: Dimensions.get('window').height * 0.005,
                        fontSize: 16,
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: '#5BA199',
                        marginBottom: Dimensions.get('window').height * 0.005,
                        fontSize: 12,
                      }}>
                      {item.title}
                    </Text>
                    <Text style={{color: '#777777', fontSize: 12}}>
                      {item.datePosted}
                    </Text>
                  </View>
                </View>

                <SliderBox
                  // onCurrentImagePressed={index => ImagePressed()}
                  parentWidth={Dimensions.get('window').width * 0.9}
                  ImageComponentStyle={{borderRadius: 16}}
                  // paginationBoxStyle={styles.sliderBoxPageStyle}
                  // ImageComponentStyle={styles.sliderBoxImageStyle}
                  // dotStyle={{
                  //   width: 10,
                  //   height: 10,
                  //   borderRadius: 5,
                  //   marginBottom: 20,
                  //   marginHorizontal: 0,
                  //   padding: 0,
                  //   margin: 0,
                  // }}
                  images={item.images}
                  sliderBoxHeight={Dimensions.get('window').height * 0.3}
                />

                <Text
                  style={{
                    color: '#000000',
                    width: '95%',
                    marginHorizontal: '2.5%',
                    marginVertical: '2%',
                  }}>
                  {item.descriptionText}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginBottom: '5%',
                  }}>
                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#469597',
                        fontWeight: 'bold',
                      }}>
                      {item.likedBy.length} Likes
                    </Text>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: '8%',
                        paddingVertical: '8%',
                        backgroundColor: '#5BA199',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        // width: Dimensions.get('window').width * 0.2,
                      }}>
                      <AntDesign name="like1" size={25} color={likeColor} />
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#469597',
                        fontWeight: 'bold',
                      }}>
                      {item.commentedBy.length} Comments
                    </Text>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: '8%',
                        paddingVertical: '8%',
                        backgroundColor: '#5BA199',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        // width: Dimensions.get('window').width * 0.2,
                      }}>
                      <FontAwesome name="comment" size={25} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}
