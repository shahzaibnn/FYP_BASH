import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {profile, jobs, posts} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  ref,
  set,
  update,
  onValue,
  remove,
  orderByChild,
  query,
  limitToLast,
  equalTo,
  limitToFirst,
  orderByValue,
} from 'firebase/database';
import {db, dbFirestore} from '../Firebase/Config';
import {SliderBox} from 'react-native-image-slider-box';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import {db, dbFirestore} from './Config';

export default function HomeScreen() {
  const profileName = 'Tony';
  const emailAddressOfCurrentUser = 'shahzaibnn@gmail.com';
  const [tempLike, setTempLike] = useState([]);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [fetchedJobs, setFetchedJobs] = useState([]);

  const [extraData, setExtraData] = React.useState(new Date());

  // const updateLike = async id => {
  //   console.log('yahan tak coming ', id);
  //   dbFirestore()
  //     .collection('Posts')
  //     .doc(id)
  //     .get()
  //     .then(documentSnapshot => {
  //       console.log('User exists: ', documentSnapshot.exists);

  //       if (documentSnapshot.exists) {
  //         console.log('User data: ', documentSnapshot.data().likedBy);
  //       }
  //     });
  // };

  const writePost = async () => {
    await dbFirestore()
      .collection('Posts')
      .add({
        commentedBy: ['shahzaibnn@gmail.com', 'habibafaisal8@gmail.com'],
        date: '25th October 2022',
        description:
          "Architectural styles in Dubai have changed significantly in recent years. While architecture was initially traditional, Dubai's current modernist architecture features innovative exposed-glass walls, stepped ascending spirals and designs that offer subtle nods to traditional Arabic motifs.",
        images: [
          'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZHViYWl8ZW58MHx8MHx8&w=1000&q=80',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrvShnjnecDWQkvqXazKndlV-5ydcpJgnkVJmcuVedoadu8Ryhj_Z3Z1nho9mapLazuo0&usqp=CAU',
        ],
        likedBy: ['shahzaibnn@gmail.com'],
        name: 'Benedict',
        profilePic:
          'https://www.seekpng.com/png/detail/1008-10080082_27-2011-photoshop-pernalonga-baby-looney-tunes.png',
        title: 'BSCS Student',
      })
      .then(() => {
        console.log('Post Added!');
      });
  };

  const searchPosts = async () => {
    await dbFirestore()
      .collection('Posts')
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
            setFetchedPosts(fetchedPosts => [...fetchedPosts, v]),
            //To grab a particular field use
            //documentSnapshot.data().userEmail,
          );
        });
      });
  };

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

  // const readData = () => {
  //   const topUserPostsRef = query(
  //     ref(db, 'roles/students'),
  //     orderByChild('userEmail'),
  //     equalTo(emailAddressOfCurrentUser),
  //   );

  //   onValue(topUserPostsRef, snapshot => {
  //     // const data = snapshot.val().postsId;
  //     // console.log(data);
  //     console.log('Posts Ids Are: ');
  //     // console.log(snapshot.toJSON());
  //     snapshot.forEach(function (data) {
  //       console.log(data.val().postsId);
  //       console.log(data);

  //       setCurrentUserPostsId(...currentUserPostsId, data.val().postsId);
  //     });
  //   });
  // };

  // const readDataOfPosts = () => {
  //   const topUserPostsRef = query(ref(db, 'Posts'));

  //   onValue(topUserPostsRef, snapshot => {
  //     // const data = snapshot.val().postsId;
  //     // console.log(data);
  //     snapshot.forEach(function (data) {
  //       if (!currentUserPostsId.includes(data.key)) {
  //         console.log('Posts Id is: ', data.key);

  //         console.log(data);
  //       }
  //     });
  //   });
  // };

  useEffect(() => {
    searchPosts();
  }, []);

  useEffect(() => {
    searchJobs();
  }, []);

  return (
    <ScrollView style={{backgroundColor: '#E5E3E4', width: '100%'}}>
      <View
        style={{flexDirection: 'row', marginTop: '3%', marginHorizontal: '5%'}}>
        <TouchableOpacity
          onPress={() => {
            console.log(tempLike);
            // console.log(fetchedPosts.find());
            // let arr = ['shahzaibnn@gmail.com'];
            // fetchedPosts.find(obj => obj.id == '7tWu8bWtheIhNUH3Xf3w').likedBy =
            //   arr;
            // console.log(
            //   fetchedPosts.find(obj => obj.id == '7tWu8bWtheIhNUH3Xf3w')
            //     .likedBy,
            // );
          }}>
          <Image
            style={{height: 60, width: 60, borderRadius: 64}}
            source={{
              uri: profile[0].pic,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log(currentUserPostsId)}
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
          // nestedScrollEnabled
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={fetchedJobs}
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
                    uri: item.image,
                  }}
                />
                <View
                  style={{marginLeft: Dimensions.get('window').width * 0.03}}>
                  <Text style={{fontSize: 12}}>
                    {item.jobCompany} posted a new job
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

                <TouchableOpacity onPress={actionSheet}>
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
                  {/* {item.city}, */}
                  {item.jobLocation}
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
          // scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={fetchedPosts}
          extraData={extraData}
          // key={item => item.id}
          // keyExtractor={item => item.id}
          ListFooterComponent={<View style={{height: 60}}></View>}
          renderItem={({item}) => {
            console.log('Id is : ', item.id);
            let likeColor = '';

            console.log(item.likedBy);

            if (item.likedBy.includes(emailAddressOfCurrentUser)) {
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
                    source={{uri: item.profilePic}}
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
                      {item.date}
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
                        if (item.likedBy.includes(emailAddressOfCurrentUser)) {
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

                          fetchedPosts.find(obj => obj.id == item.id).likedBy =
                            item.likedBy.filter(
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
                          fetchedPosts.find(obj => obj.id == item.id).likedBy =
                            arr;

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
