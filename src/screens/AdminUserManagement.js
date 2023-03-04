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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {db, dbFirestore} from '../Firebase/Config';
import {useSelector, useDispatch} from 'react-redux';
import {setInititialLogin} from '../store/action';

const AdminUserManagement = ({navigation}) => {
  const storeData = useSelector(state => state);
  const dispatch = useDispatch();

  const emailAddressOfCurrentUser = 'adminfypbash@gmail.com';

  const [searchResults, setSearchResults] = useState([]);

  const [peopleSelected, setpeopleSelected] = useState(true);
  const [postsSelected, setpostsSelected] = useState(false);
  const [jobsSelected, setjobsSelected] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [searchSelected, setSearchSelected] = useState(false);
  const [fetchedJobs, setFetchedJobs] = useState([]);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionParameters, setActionParameters] = useState([]);
  const [extraData, setExtraData] = React.useState(new Date());

  let actionSheet = createRef();
  const show = item => {
    setActionParameters(item);
    console.log('actions is, ', actionParameters);
    actionSheet.current.show();
  };

  const UpdatedSearch = () => {
    if (!searchValue) {
      setSearchSelected(false);
      setFetchedUsers([]);
      setFetchedPosts([]);
      setFetchedJobs([]);

      alert('Enter value to search!!');
    } else {
      // if (peopleSelected) {

      //Users Fetching
      const query = dbFirestore().collection('Users');
      query.get().then(querySnapshot => {
        const results = [];
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          data.id = documentSnapshot.id;
          const allFields = Object.values(data).join(' ');
          if (allFields.toLowerCase().includes(searchValue.toLowerCase())) {
            results.push(data);
            // console.log(results);
            // console.log('search value is: ', searchValue.toLowerCase());
          }
        });

        setSearchResults(results);
        setFetchedUsers(results);
        // setpostsSelected(false);
        // setjobsSelected(false);
        // setpeopleSelected(false);
      });
      // }

      //Posts Fetching
      // if (postsSelected) {
      try {
        const query1 = dbFirestore().collection('Posts');
        query1.get().then(querySnapshot => {
          const results = [];
          querySnapshot.forEach(documentSnapshot => {
            const data = documentSnapshot.data();
            data.id = documentSnapshot.id;
            // console.log(
            //   'User ID: ',
            //   documentSnapshot.id,
            //   documentSnapshot.data(),
            //   //To grab a particular field use
            //   //documentSnapshot.data().userEmail,
            // );
            // setFetchedPosts(fetchedPosts => [...fetchedPosts, data]);
            const allFields = Object.values(data).join(' ');
            if (allFields.toLowerCase().includes(searchValue.toLowerCase())) {
              results.push(data);
            }
          });

          setSearchResults(results);
          setFetchedPosts(results);
          // setpostsSelected(false);
          // setjobsSelected(false);
          // setpeopleSelected(false);
        });
      } catch (error) {
        if (error.code === 'not-found') {
          // Handle the case where the document doesn't exist
          console.log('not found');
        }
      }
      // }

      // if (jobsSelected) {
      // Fetching Jobs
      const query2 = dbFirestore().collection('Jobs');
      query2.get().then(querySnapshot => {
        const results = [];
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          data.id = documentSnapshot.id;
          const allFields = Object.values(data).join(' ');
          if (allFields.toLowerCase().includes(searchValue.toLowerCase())) {
            // console.log(data);
            results.push(data);
          }
        });

        setSearchResults(results);
        setFetchedJobs(results);
        setSearchSelected(true);

        // setpostsSelected(false);
        // setjobsSelected(false);
        // setpeopleSelected(false);
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          // resizeMode="center"
          // resizeMode="stretch"
          source={require('../assets/images/bash_icon.png')}
          style={{
            backgroundColor: 'red',
            height: Dimensions.get('window').height * 0.08,
            width: Dimensions.get('window').width * 0.3,
            marginTop: '5%',
            // aspectRatio: 6,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontSize: 28,
            color: '#4CA6A8',
            fontWeight: 'bold',
            textAlign: 'center',
            // marginTop: '5%',
          }}>
          User / Job Management
        </Text>
      </View>
      <View
        style={{flexDirection: 'row', marginTop: '3%', marginHorizontal: '5%'}}>
        <View
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
              <Ionicons name="search" size={40} color="#ffffff" style={{}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Another view for options */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: Dimensions.get('screen').height * 0.05,
        }}>
        {/* user profile icon */}
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              // marginLeft: Dimensions.get('window').width * 0.04,
              // marginTop: Dimensions.get('window').width * 0.04,
              backgroundColor: peopleSelected ? '#4CA6A8' : '#ffffff',
              borderRadius: 100,

              height: Dimensions.get('window').height * 0.1,
              width: Dimensions.get('window').width * 0.2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setpeopleSelected(true);
                setpostsSelected(false);
                setjobsSelected(false);

                // setSearchSelected(false);
                console.log('posts', postsSelected);
              }}>
              <Ionicons
                name="people"
                size={35}
                color={peopleSelected ? '#ffffff' : '#4CA6A8'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.iconText}>People</Text>
        </View>
        {/* posts icon */}
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              // marginLeft: Dimensions.get('window').width * 0.04,
              // marginTop: Dimensions.get('window').width * 0.04,
              backgroundColor: postsSelected ? '#4CA6A8' : '#ffffff',
              borderRadius: 100,

              height: Dimensions.get('window').height * 0.1,
              width: Dimensions.get('window').width * 0.2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setpostsSelected(true);
                setjobsSelected(false);
                setpeopleSelected(false);
                // setSearchSelected(false);
                console.log('posts  ', postsSelected);
              }}>
              <MaterialIcons
                name="post-add"
                size={35}
                color={postsSelected ? '#ffffff' : '#4CA6A8'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.iconText}>Posts</Text>
        </View>
        {/* job icon */}

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              // marginLeft: Dimensions.get('window').width * 0.04,
              // marginTop: Dimensions.get('window').width * 0.04,
              backgroundColor: jobsSelected ? '#4CA6A8' : '#ffffff',
              borderRadius: 100,

              height: Dimensions.get('window').height * 0.1,
              width: Dimensions.get('window').width * 0.2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={() => {
                setjobsSelected(true);
                setpostsSelected(false);

                setpeopleSelected(false);
                // setSearchSelected(false);
                console.log(setjobsSelected);
              }}>
              <Ionicons
                name="briefcase"
                size={35}
                color={jobsSelected ? '#ffffff' : '#4CA6A8'}
                style={styles.icon}
                backgroundColor="blue"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.iconText}>Jobs</Text>
        </View>
      </View>
      <View style={styles.titleStyle}>
        {/* <Text>{TitleTag}</Text> */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',

            color: '#000000',
          }}>
          {peopleSelected
            ? 'People'
            : postsSelected
            ? 'Posts'
            : jobsSelected
            ? 'Jobs'
            : null}
        </Text>
      </View>

      {/* Search Flatlist */}
      <View>
        <View
          style={{
            marginHorizontal: '3%',
            marginVertical: Dimensions.get('window').height * 0.00009,
          }}>
          {/* user search flatlist */}
          {peopleSelected ? (
            <FlatList
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              data={fetchedUsers}
              ListEmptyComponent={
                searchSelected ? (
                  <View
                    style={{
                      marginHorizontal: Dimensions.get('screen').width * 0.05,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 20}}>No Results found for </Text>
                    <Text style={{fontSize: 20, fontWeight: '900'}}>
                      ({searchValue})
                    </Text>
                  </View>
                ) : (
                  <></>
                )
              }
              contentContainerStyle={{paddingBottom: 60}}
              ListFooterComponent={<View style={{height: 60}}></View>}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    dbFirestore()
                      .collection('Users')
                      // .doc('roles')
                      // .collection(value.toLowerCase())
                      .where('userEmail', '==', item.userEmail)
                      .get()
                      .then(querySnapshot => {
                        console.log('Total Found users: ', querySnapshot.size);

                        if (querySnapshot.size == 0) {
                          console.log('CANNOT RETRIEVE DATA');
                        } else {
                          querySnapshot.forEach(documentSnapshot => {
                            console.log(documentSnapshot.data());
                            // setUserData(documentSnapshot.data());
                            dispatch(
                              setInititialLogin(documentSnapshot.data()),
                            );
                            navigation.navigate('Profile');
                          });
                        }
                      })
                      .catch(error => {
                        // alert(error);

                        // setFlag(true);
                        console.log(error);
                      });
                    // navigation.navigate('Profile');
                  }}
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
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            <></>
          )}

          {/* if search along with posts */}

          {postsSelected ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={fetchedPosts}
              extraData={extraData}
              ListEmptyComponent={
                searchSelected ? (
                  <View
                    style={{
                      marginHorizontal: Dimensions.get('screen').width * 0.05,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 20}}>No Results found for </Text>
                    <Text style={{fontSize: 20, fontWeight: '900'}}>
                      ({searchValue})
                    </Text>
                  </View>
                ) : (
                  <></>
                )
              }
              onEndReachedThreshold={0.1}
              contentContainerStyle={{paddingBottom: 60}}
              scrollEventThrottle={150}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                // console.log('Id is : ', item);
                let likeColor = '';

                // console.log(item.likedBy);

                if (item.likedBy.includes(emailAddressOfCurrentUser)) {
                  likeColor = '#000000';
                  // console.log('running');
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
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row'}}>
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

                      <TouchableOpacity
                        onPress={() => {
                          console.log(item.id);
                          dbFirestore()
                            .collection('Posts')
                            .doc(item.id)
                            .delete()
                            .then(() => {
                              console.log('User deleted!');
                              setFetchedPosts(current =>
                                current.filter(posts => posts.id !== item.id),
                              );
                              setExtraData(new Date());
                            });
                        }}
                        style={{
                          paddingHorizontal: '3%',
                          backgroundColor: '#5BA199',
                          // height: '30%',
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 16,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#ffffff'}}>
                          Delete
                        </Text>
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
                          disabled
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

                              // likeColor = '#ffffff';
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
                            // setFetchedPosts([]);
                            // searchPosts();
                          }}
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
          {jobsSelected ? (
            <FlatList
              data={fetchedJobs}
              contentContainerStyle={{paddingBottom: 60}}
              ListEmptyComponent={
                searchSelected ? (
                  <View
                    style={{
                      marginHorizontal: Dimensions.get('screen').width * 0.05,
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 20}}>No Results found for </Text>
                    <Text style={{fontSize: 20, fontWeight: '900'}}>
                      ({searchValue})
                    </Text>
                  </View>
                ) : (
                  <></>
                )
              }
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

export default AdminUserManagement;
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
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginTop: Dimensions.get('window').height * 0.02,
    // marginBottom: Dimensions.get('window').height * 0.0009,
    // marginLeft: Dimensions.get('window').height * 0.02,
    // marginRight: Dimensions.get('window').height * 0.04,
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
    // marginLeft: Dimensions.get('window').width * 0.03,
    // marginTop: Dimensions.get('window').width * 0.03,
    // marginRight: Dimensions.get('window').width * 0.04,
    // marginBottom: Dimensions.get('window').width * 0.03,
  },
  iconText: {
    color: '#6A6A6A',
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'space-between',
    alignSelf: 'center',
    textAlign: 'center',
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
