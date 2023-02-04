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
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {profile, jobs, posts, experience, user} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SliderBox} from 'react-native-image-slider-box';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {db, dbFirestore} from '../Firebase/Config';

const ExplorePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [postsSelected, setpostsSelected] = useState(false);
  const [peopleSelected, setpeopleSelected] = useState(false);
  const [jobsSelected, setjobsSelected] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchSelected, setSearchSelected] = useState(false);
  const profileName = 'Tony';
  const search = () => {
    setSearchSelected(true);
    setpostsSelected(false);
    setjobsSelected(false);
    setpeopleSelected(false);

    if (peopleSelected) {
      const query = dbFirestore().collection('Users');
      query.get().then(querySnapshot => {
        const results = [];
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          const allFields = Object.values(data).join(' ');
          if (allFields.toLowerCase().includes(searchValue.toLowerCase())) {
            results.push(data);
          }
        });
        setSearchResults(results);
      });
    }
    if (postsSelected) {
      const query = dbFirestore().collection('Posts');
      query.get().then(querySnapshot => {
        const results = [];
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          const allFields = Object.values(data).join(' ');
          if (allFields.toLowerCase().includes(searchValue.toLowerCase())) {
            results.push(data);
          }
        });
        setSearchResults(results);
      });
    }
    if (jobsSelected) {
      const query = dbFirestore().collection('Jobs');
      query.get().then(querySnapshot => {
        const results = [];
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          const allFields = Object.values(data).join(' ');
          if (allFields.toLowerCase().includes(searchValue.toLowerCase())) {
            results.push(data);
          }
        });
        setSearchResults(results);
      });
    }
  };

  // useEffect(() => TitleTag);
  const TitleTag = () => {
    if (postsSelected) {
      return <Text style={styles.titleTextStyle}>Posts</Text>;
    } else if (peopleSelected) {
      return <Text style={styles.titleTextStyle}>People</Text>;
    } else if (jobsSelected) {
      return <Text style={styles.titleTextStyle}>Jobs</Text>;
    } else if (searchSelected) {
      return <Text style={styles.titleTextStyle}>Search Results</Text>;
    } else {
      setpeopleSelected(true);
      return <Text style={styles.titleTextStyle}>People</Text>;
      // return
      // (
      //   <Text style={styles.titleTextStyle_italic}>
      //     What do you want to search for?
      //   </Text>
      // );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity
          style={{position: 'absolute', marginTop: '6%', marginLeft: '5%'}}>
          <Ionicons name="chevron-back" size={35} color="#777777" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 28,
            color: '#4CA6A8',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '5%',
            // marginHorizontal: Dimensions.get('window').width / 5,
            // marginEnd: '30%',

            // marginHorizontal: '25%',
          }}>
          Explore
        </Text>
      </View>
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
          <TextInput
            placeholder="Search here..."
            style={{marginLeft: '5%'}}
            value={searchValue}
            onSubmitEditing={search}
            onChangeText={searchValue => setSearchValue(searchValue)}
          />

          {/* {searchResults.map(result => (
            <Text key={result.id}>{result.firstName}</Text>
          ))} */}
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
      <View style={styles.iconBoxView}>
        {/* user profile icon */}
        <View>
          {peopleSelected ? (
            <View style={styles.iconSelected}>
              <TouchableOpacity
                onPress={() => {
                  setpostsSelected(false);
                  setjobsSelected(false);
                  setpeopleSelected(true);
                  console.log(postsSelected);
                }}>
                <MaterialCommunityIcons
                  name="abacus"
                  size={50}
                  color="white"
                  // backgroundColor="green"
                  // style={styles.iconStyle}
                  style={styles.icon}
                  backgroundColor="blue"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.iconStyle}>
              <TouchableOpacity
                onPress={() => {
                  setpostsSelected(false);
                  setjobsSelected(false);
                  setpeopleSelected(true);
                  console.log(postsSelected);
                }}>
                <MaterialCommunityIcons
                  name="abacus"
                  size={50}
                  color="#4CA6A8"
                  // backgroundColor="green"
                  // style={styles.iconStyle}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.iconText}>People</Text>
        </View>
        {/* posts icon */}
        <View>
          {postsSelected ? (
            <View style={styles.iconSelected}>
              <TouchableOpacity
                onPress={() => {
                  setpostsSelected(true);
                  setjobsSelected(false);
                  setpeopleSelected(false);
                  console.log(postsSelected);
                }}>
                <MaterialCommunityIcons
                  name="abacus"
                  size={50}
                  color="white"
                  // backgroundColor="green"
                  // style={styles.iconStyle}
                  style={styles.icon}
                  backgroundColor="blue"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.iconStyle}>
              <TouchableOpacity
                onPress={() => {
                  setpostsSelected(true);
                  setjobsSelected(false);
                  setpeopleSelected(false);
                  console.log(postsSelected);
                }}>
                <MaterialCommunityIcons
                  name="abacus"
                  size={50}
                  color="#4CA6A8"
                  // backgroundColor="green"
                  // style={styles.iconStyle}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.iconText}>Posts</Text>
        </View>
        {/* job icon */}

        <View>
          {jobsSelected ? (
            <View style={styles.iconSelected}>
              <TouchableOpacity
                onPress={() => {
                  setpostsSelected(false);
                  setjobsSelected(true);
                  setpeopleSelected(false);
                  console.log(setjobsSelected);
                }}>
                <MaterialCommunityIcons
                  name="abacus"
                  size={50}
                  color="white"
                  // backgroundColor="green"
                  // style={styles.iconStyle}
                  style={styles.icon}
                  backgroundColor="blue"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.iconStyle}>
              <TouchableOpacity
                onPress={() => {
                  setpostsSelected(false);
                  setjobsSelected(true);
                  setpeopleSelected(false);
                  console.log(setjobsSelected);
                }}>
                <MaterialCommunityIcons
                  name="abacus"
                  size={50}
                  color="#4CA6A8"
                  // backgroundColor="green"
                  // style={styles.iconStyle}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.iconText}>Jobs</Text>
        </View>
      </View>
      <View style={styles.titleStyle}>
        <Text>{TitleTag()}</Text>
      </View>
      {/* Flatlists */}
      {/* Users Flatlist */}
      <View>
        <View style={{marginHorizontal: '3%', marginVertical: '4%'}}>
          {peopleSelected ? (
            <FlatList
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              data={user}
              ListFooterComponent={<View style={{height: 60}}></View>}
              renderItem={({item}) => (
                <View
                  style={{
                    backgroundColor: 'rgba(187, 198, 200, 0.5)',
                    borderRadius: 16,
                    marginLeft: Dimensions.get('window').width * 0.02,
                    marginTop: Dimensions.get('window').width * 0.05,
                    height: Dimensions.get('window').height * 0.15,
                    width: Dimensions.get('window').width * 0.9,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{
                        marginLeft: Dimensions.get('window').width * 0.02,
                        marginTop: Dimensions.get('window').width * 0.05,
                        height: Dimensions.get('window').height * 0.1,
                        width: Dimensions.get('window').width * 0.2,
                        borderRadius: 16,
                      }}
                      source={{
                        uri: item.pic,
                      }}
                    />

                    <View
                      style={{
                        marginLeft: Dimensions.get('window').width * 0.03,
                      }}>
                      <Text style={styles.designationStyle}>People</Text>
                      <Text>{item.username}</Text>
                      <View style={styles.ExpBoxView}>
                        <Text>{item.designation}</Text>
                        <Text> </Text>
                        <Text style={styles.ExpLocation}>{item.company}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            // <Text>other</Text>
            <></>
          )}
        </View>
      </View>
      {/* Posts Flatlist */}
      <View>
        <View
          style={{
            marginHorizontal: '1%',
            marginVertical: Dimensions.get('window').height * 0.0009,
          }}>
          {postsSelected ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={posts}
              keyExtractor={item => item.id}
              ListFooterComponent={<View style={{height: 60}}></View>}
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
                        style={{
                          marginLeft: Dimensions.get('window').width * 0.05,
                        }}>
                        <Text
                          style={{
                            color: '#5BA199',
                            fontWeight: 'bold',
                            marginBottom:
                              Dimensions.get('window').height * 0.005,
                            fontSize: 16,
                          }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color: '#5BA199',
                            marginBottom:
                              Dimensions.get('window').height * 0.005,
                            fontSize: 12,
                          }}>
                          {item.title}
                        </Text>
                        <Text style={{color: '#777777', fontSize: 12}}>
                          {item.datePosted}
                        </Text>
                      </View>
                      {/* looks fine here */}
                      <TouchableOpacity>
                        <MaterialCommunityIcons
                          name="dots-vertical"
                          size={30}
                          color="#000000"
                          style={{
                            marginLeft: Dimensions.get('window').width * 0.09,
                            marginTop: Dimensions.get('window').height * 0.005,
                          }}
                        />
                      </TouchableOpacity>
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
                          <FontAwesome
                            name="comment"
                            size={25}
                            color="#ffffff"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
      {/* Jobs Flatlist*/}
      <View>
        <View
          style={{
            marginHorizontal: '3%',
            marginVertical: Dimensions.get('window').height * 0.00009,
            // marginVertical: '%'
          }}>
          {jobsSelected ? (
            <FlatList
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              data={jobs}
              ListFooterComponent={<View style={{height: 60}}></View>}
              renderItem={({item}) => (
                <View
                  style={{
                    backgroundColor: '#BBC6C8',
                    // padding: '3%',
                    borderRadius: 16,

                    marginVertical: Dimensions.get('window').width * 0.01,
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
                      style={{
                        marginLeft: Dimensions.get('window').width * 0.03,
                      }}>
                      <Text style={{fontSize: 12}}>
                        {item.postedBy} posted a new job
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          marginVertical:
                            Dimensions.get('window').height * 0.005,
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
                        style={{
                          marginLeft: Dimensions.get('window').width * 0.05,
                        }}
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
                        paddingHorizontal:
                          Dimensions.get('window').width * 0.15,
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
          ) : (
            <></>
          )}
        </View>
      </View>

      {/* Search Flatlist */}
      <View>
        <View
          style={{
            marginHorizontal: '3%',
            marginVertical: Dimensions.get('window').height * 0.00009,
            // marginVertical: '%'
          }}>
          {searchSelected ? (
            <FlatList
              data={searchResults}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View
                  style={{
                    backgroundColor: '#BBC6C8',
                    // padding: '3%',
                    borderRadius: 16,

                    marginVertical: Dimensions.get('window').width * 0.01,
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
                        uri: item.profilePic || item.image || item.pic,
                      }}
                    />
                    <View
                      style={{
                        marginLeft: Dimensions.get('window').width * 0.03,
                      }}>
                      <Text style={{fontSize: 12}}>
                        {item.jobCity}
                        {item.jobLocation}
                        {item.role}
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          marginVertical:
                            Dimensions.get('window').height * 0.005,
                          color: '#000000',
                        }}>
                        {item.jobTitle}
                        {item.firstName}
                        {item.lastName}
                        {item.name}
                      </Text>
                      <Text>{item.jobCompany}</Text>
                      <Text
                        style={{
                          color: '#469597',
                          fontSize: 15,
                          marginTop: '5%',
                          marginBottom: '5%',
                        }}>
                        {item.jobMode}
                      </Text>
                      {/* <Text style={{color: '#469597', fontSize: 15}}>
                        {item.experience}
                      </Text> */}
                    </View>
                  </View>
                  {/* 
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginHorizontal: Dimensions.get('window').width * 0.05,
                      marginVertical: Dimensions.get('window').height * 0.02,
                    }}>
                    <Text style={{color: '#469597', fontSize: 16}}>
                      {item.jobCompany}
                    </Text>
                  </View> */}
                </View>
              )}
            />
          ) : (
            // <View>
            //   <Text>No results found</Text>
            // </View>
            <></>
          )}
        </View>
      </View>
      {/* end */}

      {/* end */}
    </ScrollView>
  );
};

export default ExplorePage;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E3E4',
  },
  ExpBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Dimensions.get('window').height * 0.02,
    marginBottom: Dimensions.get('window').height * 0.0009,
    marginLeft: Dimensions.get('window').height * 0.02,
    marginRight: Dimensions.get('window').height * 0.04,
  },
  titleStyle: {
    // marginVertical: Dimensions.get('window').height * 0.07,
    color: '#000000',
    marginTop: Dimensions.get('window').height * 0.05,
    marginBottom: Dimensions.get('window').height * 0.0009,
    marginLeft: Dimensions.get('window').height * 0.04,
  },
  titleTextStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginVertical: Dimensions.get('window').height * 0.006,
    color: '#000000',
    // marginTop: Dimensions.get('window').height * 0.02,
  },
  titleTextStyle_italic: {
    fontSize: 24,
    fontWeight: 'bold',
    // fontStyle: 'italic',
    // marginVertical: Dimensions.get('window').height * 0.006,
    // color: '#E5E3E4',
    // marginTop: Dimensions.get('window').height * 0.02,
  },
  designationStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: Dimensions.get('window').height * 0.006,
    color: '#000000',
    marginTop: Dimensions.get('window').height * 0.02,
  },
  ExpLocation: {
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  iconStyle: {
    marginLeft: Dimensions.get('window').width * 0.04,
    marginTop: Dimensions.get('window').width * 0.04,
    backgroundColor: 'white',
    borderRadius: 100,
    // borderWidth: 1,
    height: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').width * 0.2,
  },
  iconSelected: {
    marginLeft: Dimensions.get('window').width * 0.04,
    marginTop: Dimensions.get('window').width * 0.04,
    backgroundColor: '#4CA6A8',
    borderRadius: 100,
    // borderWidth: 1,
    height: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').width * 0.2,
  },
  icon: {
    marginLeft: Dimensions.get('window').width * 0.03,
    marginTop: Dimensions.get('window').width * 0.03,
    marginRight: Dimensions.get('window').width * 0.04,
    marginBottom: Dimensions.get('window').width * 0.03,
  },
  iconText: {
    color: '#6A6A6A',
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'space-between',
    alignSelf: 'center',
    // marginLeft: 5,
    // marginTop: 20,
  },
});
