import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, createRef} from 'react';
import {db, dbFirestore} from '../Firebase/Config';
import FastImage from 'react-native-fast-image';
import {profile, jobs, posts} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SliderBox} from 'react-native-image-slider-box';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function JobDashboardScreen({navigation}) {
  const [fetchedJobs, setFetchedJobs] = useState([]);

  const searchJobs = async () => {
    await dbFirestore()
      .collection('Jobs')
      // Filter results
      // .where('userEmail', '==', 'habibafaisal8@gmail.com')
      // .where('firstName', '==', 'Habiba')
      .get()
      .then(querySnapshot => {
        console.log('Total posts: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          let v = documentSnapshot.data();
          v.id = documentSnapshot.id;
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
            setFetchedJobs(fetchedJobs => [...fetchedJobs, v]),
            //To grab a particular field use
            //documentSnapshot.data().userEmail,
          );
        });
      });
  };
  useEffect(() => {
    searchJobs();
  }, []);
  return (
    <ScrollView style={{backgroundColor: '#E5E3E4'}}>
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
          onPress={() => navigation.jumpTo('Explore')}
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
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: '5%',
          marginVertical: '5%',
          justifyContent: 'center',
        }}>
        {/* <TouchableOpacity style={{position: 'absolute', left: 0}}>
          <Ionicons
            name="chevron-back-circle-sharp"
            size={35}
            color="#777777"
          />
        </TouchableOpacity> */}

        <Text
          style={{
            fontSize: 35,
            color: '#000000',
            fontWeight: 'bold',
            textAlign: 'center',
            // marginLeft: '3%',
            // marginHorizontal: Dimensions.get('window').width / 5,
            // marginEnd: '30%',

            // marginHorizontal: '25%',
          }}>
          Job Dashboard
        </Text>
      </View>

      {/* -------------- */}
      {/* Code for Recommended Jobs */}
      {/* -------------- */}

      {/* <View
        style={{
          marginHorizontal: '5%',
          //   marginTop: '5%',
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
      </View> */}

      <View style={{marginHorizontal: '6%', marginVertical: '2%'}}>
        {/* <FlatList
          //   horizontal={true}
          //   showsHorizontalScrollIndicator={false}
          data={jobs}
          ListFooterComponent={<View style={{height: 60}}></View>}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: '#BBC6C8',
                // padding: '3%',
                borderRadius: 16,
                marginBottom: Dimensions.get('window').height * 0.03,

                // marginHorizontal: Dimensions.get('window').width * 0.01,
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
        /> */}

        {/* updated flatlist for fetching from Firestore */}

        <FlatList
          // nestedScrollEnabled
          // horizontal={true}
          // showsHorizontalScrollIndicator={false}
          data={fetchedJobs}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: '#BBC6C8',
                // padding: '3%',
                borderRadius: 16,

                marginHorizontal: Dimensions.get('window').width * 0.01,
                marginBottom: Dimensions.get('window').height * 0.02,
                // elevation: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: Dimensions.get('window').height * 0.02,
                  // marginBottom: Dimensions.get('window').height * 0.02,
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
                    uri: item.image,
                  }}
                />
                <View
                  style={{marginLeft: Dimensions.get('window').width * 0.03}}>
                  <Text style={{fontSize: 12}}>
                    {item.jobPostedBy} posted a new job
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginVertical: Dimensions.get('window').height * 0.005,
                      color: '#000000',
                    }}>
                    {item.jobTitle}
                  </Text>
                  <Text>{item.jobCompany}</Text>
                </View>

                <TouchableOpacity onPress={() => show(item)}>
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
                  {item.jobCity},{item.jobLocation}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
  );
}
