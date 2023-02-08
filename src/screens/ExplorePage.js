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
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, createRef} from 'react';
import FastImage from 'react-native-fast-image';
import {profile, jobs, posts, experience, user} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionSheet from 'react-native-actions-sheet';
import {SliderBox} from 'react-native-image-slider-box';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {db, dbFirestore} from '../Firebase/Config';

const ExplorePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [postsSelected, setpostsSelected] = useState(false);
  const [peopleSelected, setpeopleSelected] = useState(true);
  const [jobsSelected, setjobsSelected] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchSelected, setSearchSelected] = useState(false);
  const [fetchedJobs, setFetchedJobs] = useState([]);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const emailAddressOfCurrentUser = 'shahzaibnn@gmail.com';
  const [actionParameters, setActionParameters] = useState([]);
  const [extraData, setExtraData] = React.useState(new Date());
  const [searchPeople, setSearchPeople] = useState(true);
  const [searchPosts, setSearchPosts] = useState(false);
  const [searchJobs, setSearchJobs] = useState(false);

  let actionSheet = createRef();
  const show = item => {
    setActionParameters(item);
    console.log('acrtions is, ', actionParameters);
    actionSheet.current.show();
  };
  useEffect(() => {
    const subscriber = dbFirestore()
      .collection('Users')

      .onSnapshot(querySnapshot => {
        const updatedData = [];
        querySnapshot.forEach(doc => {
          updatedData.push({id: doc.id, ...doc.data()});
        });
        setFetchedUsers(updatedData);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  useEffect(() => {
    const subscriber = dbFirestore()
      .collection('Posts')
      .onSnapshot(querySnapshot => {
        const updatedData = [];
        querySnapshot.forEach(doc => {
          updatedData.push({id: doc.id, ...doc.data()});
        });
        setFetchedPosts(updatedData);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  useEffect(() => {
    const subscriber = dbFirestore()
      .collection('Jobs')
      .onSnapshot(querySnapshot => {
        const updatedData = [];
        querySnapshot.forEach(doc => {
          updatedData.push({id: doc.id, ...doc.data()});
        });
        setFetchedJobs(updatedData);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  const TitleTag = () => {
    if (postsSelected) {
      return <Text style={styles.titleTextStyle}>Posts</Text>;
    } else if (peopleSelected) {
      return <Text style={styles.titleTextStyle}>People</Text>;
    } else if (jobsSelected) {
      return <Text style={styles.titleTextStyle}>Jobs</Text>;
    } else if (searchSelected == true && searchPeople == true) {
      return (
        <Text style={styles.titleTextStyle}>Search Results For People</Text>
      );
    } else if (searchSelected == true && searchJobs == true) {
      return <Text style={styles.titleTextStyle}>Search Results For Jobs</Text>;
    } else if (searchSelected == true && searchPosts == true) {
      return (
        <Text style={styles.titleTextStyle}>Search Results For Posts</Text>
      );
    } else if (
      searchSelected == true &&
      searchPosts == false &&
      searchPeople == false &&
      searchJobs == false
    ) {
      setpeopleSelected(true);
      return <Text style={styles.titleTextStyle}>Search Results test</Text>;
    } else {
      setpeopleSelected(true);
      return <Text style={styles.titleTextStyle}>People</Text>;
    }
  };

  // useEffect(() => {
  //   // your search logic here, using the current value of searchValue
  //   setSearchSelected(true);
  //   if (peopleSelected) {
  //     const query = dbFirestore().collection('Users');
  //     query.get().then(querySnapshot => {
  //       const results = [];
  //       querySnapshot.forEach(documentSnapshot => {
  //         const data = documentSnapshot.data();
  //         const allFields = Object.values(data).join(' ');
  //         if (allFields.toLowerCase().includes(searchValue.toLowerCase())) {
  //           results.push(data);
  //         }
  //       });
  //       setSearchPeople(true);
  //       setSearchPosts(false);
  //       setSearchJobs(false);

  //       setSearchResults(results);
  //       setpostsSelected(false);
  //       setjobsSelected(false);
  //       setpeopleSelected(false);
  //     });
  //   } else {
  //     setSearchResults([]);
  //   }

  //   if (postsSelected) {
  //     const query = dbFirestore().collection('Posts');
  //     query.get().then(querySnapshot => {
  //       const results = [];
  //       querySnapshot.forEach(documentSnapshot => {
  //         const data = documentSnapshot.data();
  //         const allFields = Object.values(data).join(' ');
  //         if (allFields.toLowerCase().includes(searchValue.toLowerCase())) {
  //           results.push(data);
  //         }
  //       });
  //       setSearchPeople(false);
  //       setSearchPosts(true);
  //       setSearchJobs(false);
  //       setSearchResults(results);
  //       setpostsSelected(false);
  //       setjobsSelected(false);
  //       setpeopleSelected(false);
  //     });
  //   } else {
  //     setSearchResults([]);
  //   }

  //   if (jobsSelected) {
  //     const query = dbFirestore().collection('Jobs');
  //     query.get().then(querySnapshot => {
  //       const results = [];
  //       querySnapshot.forEach(documentSnapshot => {
  //         const data = documentSnapshot.data();
  //         const allFields = Object.values(data).join(' ');
  //         if (allFields.toLowerCase().includes(searchValue.toLowerCase())) {
  //           results.push(data);
  //         }
  //       });
  //       // setSearchJobs(true);
  //       setSearchPeople(false);
  //       setSearchPosts(false);
  //       setSearchJobs(true);
  //       setSearchResults(results);
  //       setpostsSelected(false);
  //       setjobsSelected(false);
  //       setpeopleSelected(false);
  //     });
  //   } else {
  //     // setSearchResults([]);
  //   }
  //   console.log(searchValue);
  // }, [searchValue]);
  const search = () => {
    setSearchSelected(true);

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
        setSearchPeople(true);
        setSearchPosts(false);
        setSearchJobs(false);

        setSearchResults(results);
        setpostsSelected(false);
        setjobsSelected(false);
        setpeopleSelected(false);
      });
    } else {
      setSearchResults([]);
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
        setSearchPeople(false);
        setSearchPosts(true);
        setSearchJobs(false);
        setSearchResults(results);
        setpostsSelected(false);
        setjobsSelected(false);
        setpeopleSelected(false);
      });
    } else {
      setSearchResults([]);
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
        // setSearchJobs(true);
        setSearchPeople(false);
        setSearchPosts(false);
        setSearchJobs(true);
        setSearchResults(results);
        setpostsSelected(false);
        setjobsSelected(false);
        setpeopleSelected(false);
      });
    } else {
      setSearchResults([]);
    }
  };

  const UpdatedSearch = () => {
    setSearchSelected(true);

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
        setSearchPeople(true);
        setSearchPosts(false);
        setSearchJobs(false);

        setSearchResults(results);
        setpostsSelected(false);
        setjobsSelected(false);
        setpeopleSelected(false);
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
        setSearchPeople(false);
        setSearchPosts(true);
        setSearchJobs(false);
        setSearchResults(results);
        setpostsSelected(false);
        setjobsSelected(false);
        setpeopleSelected(false);
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
        setSearchPeople(false);
        setSearchPosts(false);
        setSearchJobs(true);
        setSearchResults(results);
        setpostsSelected(false);
        setjobsSelected(false);
        setpeopleSelected(false);
      });
    }

    if (!peopleSelected && !postsSelected && !jobsSelected) {
      setSearchResults([]);
      // by default people
      setpeopleSelected(true);
    }
    // for clearing the field
    setSearchValue('');
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
            // onChangeText={setSearchValue}
            onChangeText={searchValue => setSearchValue(searchValue)}
          />

          {/* {searchResults.map(result => (
              <Text key={result.id}>{result.firstName}</Text>
            ))} */}
          <View
            style={{padding: 10, backgroundColor: '#5BA199', borderRadius: 16}}>
            {/* <TouchableOpacity onPress={search}> */}
            <TouchableOpacity onPress={UpdatedSearch}>
              {/* <TouchableOpacity onPress={() => setSearchValue(searchValue)}> */}
              <Ionicons
                name="options-outline"
                size={40}
                color="#ffffff"
                style={{}}
              />
            </TouchableOpacity>
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
                  setSearchSelected(false);
                  console.log('testing', peopleSelected);
                }}>
                <MaterialCommunityIcons
                  name="abacus"
                  size={50}
                  color="white"
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
                  setSearchSelected(false);
                  console.log('posts', postsSelected);
                }}>
                <MaterialCommunityIcons
                  name="abacus"
                  size={50}
                  color="#4CA6A8"
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
                  setSearchSelected(false);
                  console.log('posts', postsSelected);
                }}>
                <MaterialCommunityIcons
                  name="abacus"
                  size={50}
                  color="white"
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
                  setSearchSelected(false);
                  console.log('posts  ', postsSelected);
                }}>
                <MaterialCommunityIcons
                  name="abacus"
                  size={50}
                  color="#4CA6A8"
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
                  setSearchSelected(false);
                  console.log(setjobsSelected);
                }}>
                <MaterialCommunityIcons
                  name="abacus"
                  size={50}
                  color="white"
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
                  setSearchSelected(false);
                  console.log(setjobsSelected);
                }}>
                <MaterialCommunityIcons
                  name="abacus"
                  size={50}
                  color="#4CA6A8"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.iconText}>Jobs</Text>
        </View>
      </View>
      <View style={styles.titleStyle}>
        {/* <Text>{TitleTag}</Text> */}
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
              data={fetchedUsers}
              ListFooterComponent={<View style={{height: 60}}></View>}
              renderItem={({item}) => (
                <View
                  style={{
                    backgroundColor: 'rgba(187, 198, 200, 0.5)',
                    // borderRadius: 16,
                    // marginLeft: Dimensions.get('window').width * 0.02,
                    // marginTop: Dimensions.get('window').width * 0.05,
                    // height: Dimensions.get('window').height * 0.18,
                    // width: Dimensions.get('window').width * 0.9,
                    // backgroundColor: '#BBC6C8',
                    borderRadius: 16,
                    marginVertical: Dimensions.get('window').width * 0.01,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      // marginTop: Dimensions.get('window').height * 0.02,
                      // marginHorizontal: Dimensions.get('window').width * 0.05,
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
                      <Text>{item.firstName + ' ' + item.lastName}</Text>
                      <View style={styles.ExpBoxView}>
                        {/* <Text>{item.designation}</Text> */}
                        <Text style={styles.ExpLocation}>{item.userEmail}</Text>
                        <Text
                          style={{
                            color: '#469597',
                            fontSize: 15,
                            marginTop: '2%',
                            marginBottom: '2%',
                            marginHorizontal: '6%',
                            marginLeft: '-1%',
                            marginRight: '-5%',
                          }}>
                          {item.skills.join(', ')}
                        </Text>
                      </View>
                    </View>
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
              data={fetchedPosts}
              extraData={extraData}
              onEndReachedThreshold={0.1}
              scrollEventThrottle={150}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                console.log('Id is : ', item);
                let likeColor = '';

                if (item.likedBy.includes(emailAddressOfCurrentUser)) {
                  likeColor = '#000000';
                } else {
                  likeColor = '#ffffff';
                }

                return (
                  <View
                    style={{
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
                        source={{uri: item.profilePic}}
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
                          {item.date}
                        </Text>
                      </View>
                    </View>

                    <SliderBox
                      parentWidth={Dimensions.get('window').width * 0.9}
                      ImageComponentStyle={{borderRadius: 16}}
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
                      {item.description}
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
                          onPress={() => {
                            console.log('hdshjdsfvhddhfbhj');
                            if (
                              item.likedBy.includes(emailAddressOfCurrentUser)
                            ) {
                              dbFirestore()
                                .doc('Posts/' + item.id)
                                .update({
                                  likedBy: dbFirestore.FieldValue.arrayRemove(
                                    emailAddressOfCurrentUser,
                                  ),
                                })
                                .then(() => {
                                  console.log('Like Removed!');
                                });

                              fetchedPosts.find(
                                obj => obj.id == item.id,
                              ).likedBy = item.likedBy.filter(
                                e => e !== emailAddressOfCurrentUser,
                              );
                              setExtraData(new Date());
                            } else {
                              console.log('ye work');
                              dbFirestore()
                                .doc('Posts/' + item.id)
                                .update({
                                  likedBy: dbFirestore.FieldValue.arrayUnion(
                                    emailAddressOfCurrentUser,
                                  ),
                                })
                                .then(() => {
                                  console.log('Like Placed!');
                                });
                              let arr = item.likedBy;
                              arr.push(emailAddressOfCurrentUser);
                              fetchedPosts.find(
                                obj => obj.id == item.id,
                              ).likedBy = arr;

                              setExtraData(new Date());
                            }
                          }}
                          style={{
                            paddingHorizontal: '8%',
                            paddingVertical: '8%',
                            backgroundColor: '#5BA199',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 8,
                          }}>
                          <AntDesign name="like1" size={25} color={likeColor} />
                        </TouchableOpacity>
                      </View>

                      {/* <View>
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
                              
                            }}>
                            <FontAwesome name="comment" size={25} color="#ffffff" />
                          </TouchableOpacity>
                        </View> */}
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
          }}>
          {jobsSelected ? (
            <FlatList
              data={fetchedJobs}
              renderItem={({item}) => (
                <View
                  style={{
                    backgroundColor: '#BBC6C8',

                    borderRadius: 16,

                    marginHorizontal: Dimensions.get('window').width * 0.01,
                    marginBottom: Dimensions.get('window').height * 0.02,
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
                      }}
                      source={{
                        uri: item.image,
                      }}
                    />
                    <View
                      style={{
                        marginLeft: Dimensions.get('window').width * 0.03,
                      }}>
                      <Text style={{fontSize: 12}}>
                        {item.jobPostedBy} posted a new job
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
                      </Text>
                      <Text>{item.jobCompany}</Text>
                    </View>

                    <TouchableOpacity onPress={() => show(item)}>
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
                      {item.jobCity},{item.jobLocation}
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
          }}>
          {/* user search flatlist */}
          {searchSelected && searchPeople ? (
            <FlatList
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              data={searchResults}
              ListFooterComponent={<View style={{height: 60}}></View>}
              renderItem={({item}) => (
                <View
                  style={{
                    backgroundColor: 'rgba(187, 198, 200, 0.5)',
                    // borderRadius: 16,
                    // marginLeft: Dimensions.get('window').width * 0.02,
                    // marginTop: Dimensions.get('window').width * 0.05,
                    // height: Dimensions.get('window').height * 0.18,
                    // width: Dimensions.get('window').width * 0.9,
                    // backgroundColor: '#BBC6C8',
                    borderRadius: 16,
                    marginVertical: Dimensions.get('window').width * 0.01,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      // marginTop: Dimensions.get('window').height * 0.02,
                      // marginHorizontal: Dimensions.get('window').width * 0.05,
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
                      <Text>{item.firstName + ' ' + item.lastName}</Text>
                      <View style={styles.ExpBoxView}>
                        {/* <Text>{item.designation}</Text> */}
                        <Text style={styles.ExpLocation}>{item.userEmail}</Text>
                        <Text
                          style={{
                            color: '#469597',
                            fontSize: 15,
                            marginTop: '2%',
                            marginBottom: '2%',
                            marginHorizontal: '6%',
                            marginLeft: '-1%',
                            marginRight: '-5%',
                          }}>
                          {item.skills.join(', ')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            <></>
          )}

          {/* if search along with posts */}

          {searchSelected && searchPosts ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={searchResults}
              extraData={extraData}
              onEndReachedThreshold={0.1}
              scrollEventThrottle={150}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                console.log('Id is : ', item);
                let likeColor = '';

                if (item.likedBy.includes(emailAddressOfCurrentUser)) {
                  likeColor = '#000000';
                } else {
                  likeColor = '#ffffff';
                }

                return (
                  <View
                    style={{
                      marginHorizontal: Dimensions.get('window').width * 0.03,
                      marginVertical: Dimensions.get('window').height * 0.01,
                      borderRadius: 16,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: Dimensions.get('window').height * 0.01,
                      }}>
                      <Image
                        source={{uri: item.profilePic}}
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
                          {item.date}
                        </Text>
                      </View>
                    </View>

                    <SliderBox
                      parentWidth={Dimensions.get('window').width * 0.9}
                      ImageComponentStyle={{borderRadius: 16}}
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
                      {item.description}
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
                          onPress={() => {
                            console.log('hdshjdsfvhddhfbhj');
                            if (
                              item.likedBy.includes(emailAddressOfCurrentUser)
                            ) {
                              dbFirestore()
                                .doc('Posts/' + item.id)
                                .update({
                                  likedBy: dbFirestore.FieldValue.arrayRemove(
                                    emailAddressOfCurrentUser,
                                  ),
                                })
                                .then(() => {
                                  console.log('Like Removed!');
                                });

                              searchResults.find(
                                obj => obj.id == item.id,
                              ).likedBy = item.likedBy.filter(
                                e => e !== emailAddressOfCurrentUser,
                              );
                              setExtraData(new Date());
                            } else {
                              console.log('ye work');
                              dbFirestore()
                                .doc('Posts/' + item.id)
                                .update({
                                  likedBy: dbFirestore.FieldValue.arrayUnion(
                                    emailAddressOfCurrentUser,
                                  ),
                                })
                                .then(() => {
                                  console.log('Like Placed!');
                                });
                              let arr = item.likedBy;
                              arr.push(emailAddressOfCurrentUser);
                              searchResults.find(
                                obj => obj.id == item.id,
                              ).likedBy = arr;

                              setExtraData(new Date());
                            }
                          }}
                          style={{
                            paddingHorizontal: '8%',
                            paddingVertical: '8%',
                            backgroundColor: '#5BA199',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 8,
                          }}>
                          <AntDesign name="like1" size={25} color={likeColor} />
                        </TouchableOpacity>
                      </View>

                      {/* <View>
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
                           
                         }}>
                         <FontAwesome name="comment" size={25} color="#ffffff" />
                       </TouchableOpacity>
                     </View> */}
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <></>
            // setSearchPosts(false)
          )}

          {/* if search along with jobs */}
          {searchSelected && searchJobs ? (
            <FlatList
              data={searchResults}
              renderItem={({item}) => (
                <View
                  style={{
                    backgroundColor: '#BBC6C8',

                    borderRadius: 16,
                    // borderColor: 'black',
                    marginHorizontal: Dimensions.get('window').width * 0.01,
                    marginBottom: Dimensions.get('window').height * 0.02,
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
                      }}
                      source={{
                        uri: item.image,
                      }}
                    />
                    <View
                      style={{
                        marginLeft: Dimensions.get('window').width * 0.03,
                      }}>
                      <Text style={{fontSize: 12}}>
                        {item.jobPostedBy} posted a new job
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
                      </Text>
                      <Text>{item.jobCompany}</Text>
                    </View>

                    <TouchableOpacity onPress={() => show(item)}>
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
                      {item.jobCity},{item.jobLocation}
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
      {/* end */}
      <ActionSheet
        data={fetchedJobs}
        ref={actionSheet}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: '#E5E3E4',
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}>
        <View>
          {/* action sheet */}
          <ScrollView style={styles.SectionStyle}>
            {/* Company Logo */}
            <View>
              <Image
                style={styles.header}
                source={{
                  uri: actionParameters.image,
                }}
              />
            </View>
            {/* Post */}
            <View>
              <Text style={styles.name}>{actionParameters.jobTitle}</Text>
            </View>
            {/* Company Name with location */}
            <View style={styles.expView1}>
              <Text style={styles.compTxt}>{actionParameters.jobCompany} </Text>
              <Text style={styles.compTxt}>
                {actionParameters.jobCity},{actionParameters.jobLocation}
              </Text>
            </View>
            {/* Icons with text */}
            <View style={styles.expView1}>
              <MaterialCommunityIcons
                name="clock"
                size={25}
                color="#000000"
                style={{
                  marginLeft: Dimensions.get('window').width * -0.05,
                  marginTop: Dimensions.get('window').height * 0.003,
                }}
              />
              <Text style={styles.compTxt}>{actionParameters.jobMode}</Text>
              {/* <Text style={styles.compTxt}> - </Text> */}
              <Text style={styles.compTxt}>
                {actionParameters.jobSalary}/Month
              </Text>
            </View>
            {/* Description title */}
            <View>
              <TouchableOpacity style={styles.buttonStyleDesc}>
                <Text style={styles.buttonTextStyle}>Description</Text>
              </TouchableOpacity>
            </View>

            {/* Qualification Text */}
            {/* <View>
              <Text style={styles.qualText}>Qualification</Text>
            </View> */}

            {/* Job desc */}
            <View style={styles.messageBodyStyle}>
              <ScrollView>
                <Text style={styles.messageStyle}>
                  {actionParameters.jobDescription}
                </Text>
              </ScrollView>
            </View>

            {/* apply now */}
            <View>
              <TouchableOpacity style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>Apply</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ActionSheet>
      {/* <Toast topOffset={30} /> */}
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
    // flexDirection: 'column',
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
    color: '#000000',
    marginTop: Dimensions.get('window').height * 0.05,
    marginBottom: Dimensions.get('window').height * 0.0009,
    marginLeft: Dimensions.get('window').height * 0.04,
  },
  titleTextStyle: {
    fontSize: 24,
    fontWeight: 'bold',

    color: '#000000',
  },
  titleTextStyle_italic: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  designationStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: Dimensions.get('window').height * 0.006,
    // marginHorizontal: Dimensions.get('window').width * 0.06,
    color: '#000000',
    marginTop: Dimensions.get('window').height * 0.02,
  },
  // ExpLocation: {
  //   textAlign: 'right',
  //   justifyContent: 'flex-end',
  //   alignSelf: 'flex-end',
  //   alignItems: 'flex-end',
  // },
  iconStyle: {
    marginLeft: Dimensions.get('window').width * 0.04,
    marginTop: Dimensions.get('window').width * 0.04,
    backgroundColor: 'white',
    borderRadius: 100,

    height: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').width * 0.2,
  },
  iconSelected: {
    marginLeft: Dimensions.get('window').width * 0.04,
    marginTop: Dimensions.get('window').width * 0.04,
    backgroundColor: '#4CA6A8',
    borderRadius: 100,

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
  },
  SectionStyle: {
    backgroundColor: '#E5E3E4',
  },
  UploadCV: {
    alignSelf: 'center',
  },
  name: {
    fontSize: 28,
    color: 'black',
    fontWeight: '600',
    marginTop: 5,
    alignSelf: 'center',
  },
  qualText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',

    marginLeft: Dimensions.get('window').width * 0.12,
    alignSelf: 'flex-start',
  },
  compTxt: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 10,
    marginLeft: 15,
    color: '#5BA199',
  },
  messageBodyStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    height: 150,
    justifyContent: 'center',
  },
  messageStyle: {
    flex: 1,
    multiline: true,
    paddingLeft: 40,
    paddingRight: 20,
    borderRadius: 12,
    fontSize: 15,
    alignContent: 'center',
  },
  Row: {
    flexDirection: 'row',
  },
  bg: {
    backgroundColor: '#E5E3E4',
    height: 1000,
    borderRadius: 12,
    marginTop: 15,
    marginLeft: 25,
    marginRight: 25,
    margin: 10,
  },
  SectionStyle: {
    backgroundColor: '#E5E3E4',
  },
  inputStyle: {
    flex: 1,
    backgroundColor: 'white',
    color: '#6A6A6A',
    paddingLeft: 10,
    paddingRight: 20,
    borderRadius: 12,
  },
  inputStyle2: {
    flex: 1,
    backgroundColor: 'white',
    color: '#6A6A6A',
    paddingLeft: 30,
    paddingRight: 20,
    borderRadius: 12,
  },
  detStyle_1: {
    fontSize: 14,
    color: 'black',
    justifyContent: 'space-between',
  },
  ExpLocation: {
    textAlign: 'left',
    // fontStyle: 'italic',
    // justifyContent: 'flex-end',
    // alignSelf: 'flex-end',
    // alignItems: 'flex-end',
  },
  expView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
  },
  expView1: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
  },
  editExpView: {
    flex: 1,
  },
  resumeText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {fontSize: 20, fontWeight: 'bold', color: '#6A6A6A', paddingTop: 15},

  lastNameStyle: {
    textAlign: 'right',
    marginRight: 70,

    fontSize: 15,
    color: '#6A6A6A',
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  header: {
    backgroundColor: '#E5E3E4',
    height: 100,
    width: 100,
    borderRadius: 64,
    borderWidth: 10,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: '#6A6A6A',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
    marginTop: 20,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    margin: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  menuContent: {
    color: '#000',
    padding: 2,
    fontSize: 15,
  },
  buttonStyleDesc: {
    backgroundColor: '#4CA6A8',
    color: '#FFFFFF',
    height: Dimensions.get('window').height * 0.06,
    width: Dimensions.get('window').width * 0.4,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: '#4CA6A8',
    color: '#FFFFFF',
    height: Dimensions.get('window').height * 0.06,
    width: Dimensions.get('window').width * 0.7,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loaderStyle: {
    marginVertical: 16,
    marginBottom: 90,
    alignItems: 'center',
  },
});
