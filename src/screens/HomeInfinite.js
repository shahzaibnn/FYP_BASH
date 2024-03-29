import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, createRef} from 'react';
import FastImage from 'react-native-fast-image';
import {profile, jobs, posts} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionSheet from 'react-native-actions-sheet';

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
import {Circle, Fold, Grid} from 'react-native-animated-spinkit';

import JobSkeleton from '../components/JobSkeleton';
import PostSkeleton from '../components/PostSkeleton';
import HomeHeaderSkeleton from '../components/HomeHeaderSkeleton';

// import {db, dbFirestore} from './Config';

export default function HomeInfinite() {
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [
    onEndReachedCalledDuringMomentumJob,
    setOnEndReachedCalledDuringMomentumJob,
  ] = useState(true);
  let actionSheet = createRef();
  const profileName = 'Tony';
  const emailAddressOfCurrentUser = 'shahzaibnn@gmail.com';
  const [tempLike, setTempLike] = useState([]);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [fetchedJobs, setFetchedJobs] = useState([]);

  const [lastPost, setLastPost] = useState(false);
  const [lastJob, setLastJob] = useState(false);

  const [actionParameters, setActionParameters] = useState([]);

  const [extraData, setExtraData] = React.useState(new Date());

  const [jobLoader, setJobLoader] = useState(true);
  const [postLoader, setPostLoader] = useState(true);
  const [postData, setPostData] = useState([]);

  const [data, setData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [lastVisibleJobs, setLastVisibleJobs] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobLoading, setJobLoading] = useState(false);
  const [query, setQuery] = useState(
    dbFirestore().collection('Posts').orderBy('createdAt', 'desc').limit(2),
  );

  const [jobQuery, setJobQuery] = useState(
    dbFirestore().collection('Jobs').orderBy('createdAt', 'desc').limit(1),
  );

  useEffect(() => {
    searchJobs();
  }, []);

  useEffect(() => {
    searchPosts();
  }, []);
  // useEffect(() => {
  //   if (!lastVisible) {
  //     setQuery(query);
  //   } else {
  //     setQuery(query.startAfter(lastVisible));
  //   }
  //   searchPosts();
  // }, [lastVisible]);

  // useEffect(() => {
  //   if (!lastVisibleJobs) {
  //     setJobQuery(jobQuery);
  //   } else {
  //     setJobQuery(jobQuery.startAfter(lastVisibleJobs));
  //   }
  //   searchJobs();
  // }, [lastVisibleJobs]);
  const show = item => {
    // console.log(item);
    setActionParameters(item);
    console.log('acrtions is, ', actionParameters);
    actionSheet.current.show();
  };

  const searchPosts = async () => {
    setLoading(true);
    // const snapshot = await query.get();
    // setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    // const newData = snapshot.docs.map(doc => doc.data());
    // setData(data.concat(newData));
    // console.log('data is, ', data);
    // setLoading(false);

    dbFirestore()
      .collection('Posts')
      // .orderBy('id', 'desc')
      .limit(2)
      .get()
      .then(querySnapshot => {
        console.log('Total posts: ', querySnapshot.size);

        var total = querySnapshot.size;
        let count = 0;

        if (total == 0) {
          setPostLoader(false);
        } else {
          querySnapshot.forEach(documentSnapshot => {
            let v = documentSnapshot.data();
            v.id = documentSnapshot.id;
            // console.log(
            //   'User ID: ',
            //   documentSnapshot.id,
            //   documentSnapshot.data(),
            //   //To grab a particular field use
            //   //documentSnapshot.data().userEmail,
            // );
            setFetchedPosts(fetchedPosts => [...fetchedPosts, v]);

            count++;
            if (count == total) {
              setPostLoader(false);
              console.log(':runing');
            }
          });
        }

        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      });
  };

  const searchMorePosts = async () => {
    setLoading(true);
    // const snapshot = await query.get();
    // setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    // const newData = snapshot.docs.map(doc => doc.data());
    // setData(data.concat(newData));
    // console.log('data is, ', data);
    // setLoading(false);

    dbFirestore()
      .collection('Posts')
      // .orderBy('id', 'desc')
      .startAfter(lastVisible)
      .limit(2)
      .get()
      .then(querySnapshot => {
        console.log('Total posts: ', querySnapshot.size);

        var total = querySnapshot.size;
        let count = 0;

        if (total == 0) {
          console.log('yahan pe aye!!');
          setLoading(false);
        } else {
          querySnapshot.forEach(documentSnapshot => {
            let v = documentSnapshot.data();
            v.id = documentSnapshot.id;
            // console.log(
            //   'User ID: ',
            //   documentSnapshot.id,
            //   documentSnapshot.data(),
            //   //To grab a particular field use
            //   //documentSnapshot.data().userEmail,
            // );
            setFetchedPosts(fetchedPosts => [...fetchedPosts, v]);

            count++;
            if (count == total) {
              setLoading(false);
              console.log(':runing');
            }
          });
        }

        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        querySnapshot.size == 0 ? setLastPost(true) : setLastPost(false);
      });
  };

  const searchJobs = async () => {
    setJobLoading(true);
    // const snapshot = await jobQuery.get();
    // setLastVisibleJobs(snapshot.docs[snapshot.docs.length - 1]);
    // const newJobData = snapshot.docs.map(doc => doc.data());
    // setJobData(jobData.concat(newJobData));
    // console.log('job data is, ', jobData);

    dbFirestore()
      .collection('Jobs')
      .orderBy('createdAt', 'desc')
      .limit(2)
      .get()
      .then(querySnapshot => {
        console.log('Total Jobs: ', querySnapshot.size);

        var total = querySnapshot.size;
        let count = 0;
        if (total == 0) {
          setJobLoader(false);
        } else {
          querySnapshot.forEach(documentSnapshot => {
            console.log('hgccgcfgcgfc');

            let v = documentSnapshot.data();
            v.id = documentSnapshot.id;
            // console.log(
            //   'User ID: ',
            //   documentSnapshot.id,
            //   documentSnapshot.data(),
            //   //To grab a particular field use
            //   //documentSnapshot.data().userEmail,
            // );
            setFetchedJobs(fetchedJobs => [...fetchedJobs, v]);

            count++;
            if (count == total) {
              setJobLoader(false);
              console.log(':runing');
            }
          });
        }
        setLastVisibleJobs(querySnapshot.docs[querySnapshot.docs.length - 1]);
      });
    // setJobLoading(false);
  };

  const searchMoreJobs = async () => {
    setJobLoading(true);

    dbFirestore()
      .collection('Jobs')
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisibleJobs)
      .limit(1)
      .get()
      .then(querySnapshot => {
        console.log('Total Jobs: ', querySnapshot.size);

        var total = querySnapshot.size;
        let count = 0;
        if (total == 0) {
          setJobLoading(false);
        } else {
          querySnapshot.forEach(documentSnapshot => {
            console.log('hgccgcfgcgfc');

            let v = documentSnapshot.data();
            v.id = documentSnapshot.id;
            // console.log(
            //   'User ID: ',
            //   documentSnapshot.id,
            //   documentSnapshot.data(),
            //   //To grab a particular field use
            //   //documentSnapshot.data().userEmail,
            // );
            setFetchedJobs(fetchedJobs => [...fetchedJobs, v]);

            count++;
            if (count == total) {
              setJobLoading(false);
              console.log(':runing');
            }
          });
        }
        setLastVisibleJobs(querySnapshot.docs[querySnapshot.docs.length - 1]);
        querySnapshot.size == 0 ? setLastJob(true) : setLastJob(false);
      });
  };
  const handleEndReached = () => {
    // alert('reached!!');
    setLoading(true);
    console.log('end posts reached!!');
    // console.log(lastVisible);

    searchMorePosts();
    // setOnEndReachedCalledDuringMomentum(true);
  };

  const handleEndReachedJobs = () => {
    setJobLoading(true);
    console.log('end reached!!');
    // console.log(lastVisibleJobs);

    searchMoreJobs();
  };
  const renderLoaderJobs = () => {
    return jobLoading && !lastJob ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };
  const renderLoaderPosts = () => {
    return loading && !lastPost ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };
  return (
    <View>
      {/* {postLoader ? <HomeHeaderSkeleton /> : null}
      {postLoader ? <JobSkeleton /> : null} */}
      {/* // // // <Circle */}
      {/* // // //   style={{ */}
      {/* // //{' '} */}
      {/* //     // position: 'relative',
        //     //     // top: Dimensions.get('window').height * 0.5,
        //     //     // left: Dimensions.get('window').width * 0.4,
        //     //     alignSelf: 'center',
        //     //     alignItems: 'center',
        //     //     justifyContent: 'center',
        //     //   }}
        //     //   size={Dimensions.get('window').width * 0.2}
        //     //   color="#5BA199"
        // />
        // <View>
{postLoader ? (
        // <PostSkeleton />
      // ) : (
        // {/* </View> */}
      {/* // <View style={{flex: 1, height: Dimensions.get('window').height}}> */}
      <FlatList
        // refreshing={loading}
        ListEmptyComponent={<PostSkeleton />}
        style={{
          backgroundColor: '#E5E3E4',
          width: '100%',
          // height: '100%',
          // marginBottom: '30%',
        }}
        // scrollEnabled={false}
        ListHeaderComponent={
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '3%',
                marginHorizontal: '5%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  console.log(tempLike);
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
                  justifyContent: 'space-between',
                  height: 60,
                  backgroundColor: '#ffffff',
                  flex: 1,
                  borderRadius: 16,
                  flexDirection: 'row',
                }}>
                <Text style={{marginLeft: '5%'}}>Search here...</Text>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: '#5BA199',
                    borderRadius: 16,
                  }}>
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
                alignItems: 'baseline',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#000000',
                  fontWeight: 'bold',
                }}>
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

            {/* {jobLoader ? (
              <JobSkeleton />
            ) : ( */}
            <View style={{marginHorizontal: '3%', marginVertical: '4%'}}>
              <FlatList
                // nestedScrollEnabled
                ListEmptyComponent={<JobSkeleton />}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={renderLoaderJobs}
                data={fetchedJobs}
                keyExtractor={item => item.id}
                onEndReachedThreshold={0.1}
                scrollEventThrottle={150}
                onMomentumScrollBegin={() => {
                  setOnEndReachedCalledDuringMomentumJob(false);
                }}
                onEndReached={() => {
                  console.log('ahsvshgadvhgsdvhgsdvhgsvfs');
                  if (!onEndReachedCalledDuringMomentumJob && !lastJob) {
                    console.log(
                      '0000000000000000000000000000000000000000000----------------------------------------',
                    );
                    handleEndReachedJobs(); // LOAD MORE DATA
                    setOnEndReachedCalledDuringMomentumJob(true);
                  }
                }}
                renderItem={({item}) => (
                  <View
                    style={{
                      backgroundColor: '#BBC6C8',
                      borderRadius: 16,
                      marginHorizontal: Dimensions.get('window').width * 0.01,
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
                          paddingVertical:
                            Dimensions.get('window').height * 0.01,
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
              />
            </View>
            {/* )} */}

            <Text
              style={{
                color: '#000000',
                marginHorizontal: '5%',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              News Feed
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        data={fetchedPosts}
        extraData={extraData}
        // initialNumToRender={2}
        onEndReachedThreshold={0.1}
        scrollEventThrottle={150}
        onMomentumScrollBegin={() => {
          setOnEndReachedCalledDuringMomentum(false);
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum && !lastPost) {
            console.log(
              '0000000000000000000000000000000000000000000----------------------------------------',
            );
            handleEndReached(); // LOAD MORE DATA
            setOnEndReachedCalledDuringMomentum(true);
          }
        }}
        // onEndReached={info => {
        //   console.log(
        //     '0000000000000000000000000000000000000000000----------------------------------------',
        //   );
        //   // if (!loading) {
        //   console.log(
        //     '0000000000000000000000000000000000000000000----------------------------------------',
        //   );
        //   handleEndReached();
        //   console.log(
        //     '------------------------------------------------------------@@@@@@@@@@@@@@@@@@@@@@@@',
        //   );
        // }
        // }}
        // scrollEventThrottle={150}
        ListFooterComponent={
          !lastPost ? (
            renderLoaderPosts
          ) : (
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 20,
                color: '#000000',
                marginBottom: 90,
              }}>
              You Are Up To Date / All Posts Fetched And Displayed
            </Text>
          )
        }
        // key={item => item.id}
        // keyExtractor={item => item.id}
        // ListFooterComponent={<View style={{height: 60}}></View>}
        renderItem={({item}) => {
          console.log('Id is : ', item);
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
                  style={{
                    marginLeft: Dimensions.get('window').width * 0.05,
                  }}>
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
      {/* )} */}
    </View>
  );
}

// <ActionSheet
//   // id={sheetId}
//   data={fetchedJobs}
//   ref={actionSheet}
//   containerStyle={{
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     backgroundColor: '#E5E3E4',
//   }}
//   indicatorStyle={{
//     width: 100,
//   }}
//   gestureEnabled={true}>
//   <View>
//     {/* action sheet */}
//     <ScrollView style={styles.SectionStyle}>
//       {/* Company Logo */}
//       <View>
//         <Image
//           style={styles.header}
//           source={{
//             uri: actionParameters.image,
//           }}
//         />
//       </View>
//       {/* Post */}
//       <View>
//         <Text style={styles.name}>{actionParameters.jobTitle}</Text>
//       </View>
//       {/* Company Name with location */}
//       <View style={styles.expView1}>
//         <Text style={styles.compTxt}>{actionParameters.jobCompany} </Text>
//         <Text style={styles.compTxt}>
//           {actionParameters.jobCity},{actionParameters.jobLocation}
//         </Text>
//       </View>
//       {/* Icons with text */}
//       <View style={styles.expView1}>
//         <MaterialCommunityIcons
//           name="clock"
//           size={25}
//           color="#000000"
//           style={{
//             marginLeft: Dimensions.get('window').width * -0.05,
//             marginTop: Dimensions.get('window').height * 0.003,
//           }}
//         />
//         <Text style={styles.compTxt}>{actionParameters.jobMode}</Text>
//         {/* <Text style={styles.compTxt}> - </Text> */}
//         <Text style={styles.compTxt}>
//           {actionParameters.jobSalary}/Month
//         </Text>
//       </View>
//       {/* Description title */}
//       <View>
//         <TouchableOpacity
//           style={styles.buttonStyleDesc}
//           // activeOpacity={0.5}
//           // onPress={handleSubmitButton}
//         >
//           <Text style={styles.buttonTextStyle}>Description</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Qualification Text */}
//       {/* <View>
//             <Text style={styles.qualText}>Qualification</Text>
//           </View> */}

//       {/* Job desc */}
//       <View style={styles.messageBodyStyle}>
//         <ScrollView>
//           <Text style={styles.messageStyle}>
//             {actionParameters.jobDescription}
//           </Text>
//         </ScrollView>
//       </View>

//       {/* apply now */}
//       <View>
//         <TouchableOpacity style={styles.buttonStyle}>
//           <Text style={styles.buttonTextStyle}>Apply</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   </View>
// </ActionSheet>
// </View>
// );
// }

const styles = StyleSheet.create({
  SectionStyle: {
    // flexDirection: 'row',
    backgroundColor: '#E5E3E4',
    // height: 500,

    // backgroundColor: 'white',
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
    // marginTop: 5,
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
  ExpBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  //   Header: {
  //     flexDirection: 'row',
  //     justifyContent: 'flex-start',
  //     alignItems: 'center',
  //     // height: 500,
  //   },
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
    // alignSelf: 'center',
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
    // flexDirection: 'row',
    backgroundColor: '#E5E3E4',
    // height: 500,

    // backgroundColor: 'white',
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
    // justifyContent: 'flex-end',
    // alignSelf: 'flex-end',
    // alignItems: 'flex-end',
    fontSize: 14,
    color: 'black',
    justifyContent: 'space-between',
    // alignSelf: 'center',
  },
  ExpLocation: {
    textAlign: 'right',
    fontStyle: 'italic',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  expView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
    /* Not doing anything. */
    // flex: 1,
  },
  expView1: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
    // alignItems: 'flex-end',
    /* Not doing anything. */
    // flex: 1,
  },
  editExpView: {
    // alignItems: 'center',
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
    // paddingLeft: 15,
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
    // marginTop: -20,
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
    // borderRadius: 15,
    // borderWidth: 5,
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
    // marginLeft: 25,
    // marginRight: 25,
    // marginTop: 20,
    // marginBottom: 20,
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
