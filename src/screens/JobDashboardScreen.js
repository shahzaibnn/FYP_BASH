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
import {db, dbFirestore} from '../Firebase/Config';
import FastImage from 'react-native-fast-image';
import {profile, jobs, posts} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionSheet from 'react-native-actions-sheet';
import {SliderBox} from 'react-native-image-slider-box';
import {
  addition,
  setInititialLogin,
  subtraction,
  setJobs,
} from '../store/action';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import JobSkeleton from '../components/JobSkeleton';

export default function JobDashboardScreen({navigation, route}) {
  const [fetchedJobs, setFetchedJobs] = useState([]);
  const [userData, setUserData] = useState(Object);
  const [jobLoading, setJobLoading] = useState(false);
  const [jobLoader, setJobLoader] = useState(true);
  const [lastVisibleJobs, setLastVisibleJobs] = useState(null);
  const [actionParameters, setActionParameters] = useState([]);
  const [
    onEndReachedCalledDuringMomentumJob,
    setOnEndReachedCalledDuringMomentumJob,
  ] = useState(true);
  const [lastJob, setLastJob] = useState(false);

  let actionSheet = createRef();

  const dispatch = useDispatch();

  const storeData = useSelector(state => state);
  const emailAddressOfCurrentUser = storeData.userEmail;
  const renderLoaderJobs = () => {
    return jobLoading && !lastJob ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };
  const show = item => {
    // console.log(item);
    setActionParameters(item);
    console.log('acrtions is, ', actionParameters);
    actionSheet.current.show();
  };
  const handleApply = job => {
    // Pass the job information as props to the Apply to Job screen
    console.log('checking jobs: ', job);
    // console.log('checking again: ', {job});

    navigation.navigate('ApplyToJob', {job: job});
  };

  // const searchData = loggedInUser => {
  //   console.log('LOGGED IN USER IS: ', loggedInUser);

  //   dbFirestore()
  //     .collection('Users')
  //     // .doc('roles')
  //     // .collection(value.toLowerCase())
  //     .where('userEmail', '==', loggedInUser.toLowerCase())
  //     .get()
  //     .then(querySnapshot => {
  //       console.log('Total Found users: ', querySnapshot.size);

  //       if (querySnapshot.size == 0) {
  //         console.log('CANNOT RETRIEVE DATA');
  //       } else {
  //         querySnapshot.forEach(documentSnapshot => {
  //           console.log(documentSnapshot.data());
  //           setUserData(documentSnapshot.data());
  //           dispatch(setInititialLogin(documentSnapshot.data()));
  //           searchJobs(documentSnapshot.data().skills);
  //         });
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    // searchData(emailAddressOfCurrentUser);
    searchJobs();
  }, []);
  const searchJobs = () => {
    // console.log('search jobs here', skillsParams);
    setJobLoading(true);

    dbFirestore()
      .collection('Jobs')

      .limit(10)
      .get()

      .then(querySnapshot => {
        const jobs = [];
        querySnapshot.forEach(doc => {
          jobs.push({id: doc.id, ...doc.data()});
        });
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

            setFetchedJobs(fetchedJobs => [...fetchedJobs, v]);

            count++;
            if (count == total) {
              setJobLoader(false);
              console.log(':runing');
            }
          });
        }

        setLastVisibleJobs(querySnapshot.docs[querySnapshot.docs.length - 1]);
        querySnapshot.size < 10 ? setLastJob(true) : setLastJob(false);
      });
  };

  const searchMoreJobs = async () => {
    setJobLoading(true);

    dbFirestore()
      .collection('Jobs')

      .startAfter(lastVisibleJobs)
      .limit(10)
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

            setFetchedJobs(fetchedJobs => [...fetchedJobs, v]);
            // dispatch(setJobs(documentSnapshot.data()));

            count++;
            if (count == total) {
              setJobLoading(false);
              console.log(':runing');
            }
          });
        }
        setLastVisibleJobs(querySnapshot.docs[querySnapshot.docs.length - 1]);
        querySnapshot.size < 10 ? setLastJob(true) : setLastJob(false);
      });
  };
  const handleEndReachedJobs = () => {
    setJobLoading(true);
    console.log('end reached!!');
    // console.log(lastVisibleJobs);

    searchMoreJobs();
  };

  return (
    // <ScrollView style={{}}>
    <View>
      <FlatList
        ListEmptyComponent={
          <View
            style={{marginHorizontal: Dimensions.get('screen').width * 0.1}}>
            <JobSkeleton />
            <JobSkeleton />
            <JobSkeleton />
            <JobSkeleton />
          </View>
        }
        style={{
          backgroundColor: '#E5E3E4',
          width: '100%',
        }}
        ListHeaderComponent={
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '3%',
                marginHorizontal: '5%',
              }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image
                  style={{height: 60, width: 60, borderRadius: 64}}
                  source={{
                    uri: storeData.pic,
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
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: '5%',
                marginVertical: '5%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 35,
                  color: '#000000',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Job Dashboard
              </Text>
            </View>

            <View
              style={{
                marginHorizontal: Dimensions.get('screen').width * 0.01,
                flexDirection: 'row',
                marginBottom: '5%',
                // alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderWidth: 3,
                  borderRadius: 12,
                  marginHorizontal: Dimensions.get('screen').width * 0.05,
                  paddingVertical: Dimensions.get('screen').height * 0.005,
                  borderColor: '#5BA199',
                  backgroundColor: '#5BA199',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  Jobs
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AppliedJobs');
                }}
                style={{
                  flex: 1,
                  borderWidth: 3,
                  borderRadius: 12,
                  marginHorizontal: Dimensions.get('screen').width * 0.05,
                  paddingVertical: Dimensions.get('screen').height * 0.005,
                  borderColor: '#5BA199',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  Applied Jobs
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AppliedJobs');
                }}
                style={{
                  flex: 1,
                  borderWidth: 3,
                  borderRadius: 12,
                  marginHorizontal: Dimensions.get('screen').width * 0.05,
                  paddingVertical: Dimensions.get('screen').height * 0.005,
                  borderColor: '#5BA199',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  Posted Jobs
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        data={fetchedJobs}
        // onEndReachedThreshold={0.1}
        scrollEventThrottle={150}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => {
          setOnEndReachedCalledDuringMomentumJob(false);
        }}
        ListFooterComponent={
          !lastJob ? (
            renderLoaderJobs
          ) : (
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 20,
                color: '#000000',
                marginBottom: 90,
                textAlign: 'center',
              }}>
              You Are Up To Date / All Jobs Fetched And Displayed
            </Text>
          )
        }
        // horizontal={false}
        onEndReached={() => {
          console.log('ahsvshgadvhgsdvhgsdvhgsvfs');
          console.log('check last job value', lastJob);
          console.log(
            'check end moment job value',
            onEndReachedCalledDuringMomentumJob,
          );
          if (!onEndReachedCalledDuringMomentumJob && !lastJob) {
            console.log(
              'reaching towards end----------------------------------------',
            );
            handleEndReachedJobs(); // LOAD MORE DATA
            setOnEndReachedCalledDuringMomentumJob(true);
          }
        }}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: '#BBC6C8',
              // padding: '3%',
              borderRadius: 16,

              marginHorizontal: Dimensions.get('window').width * 0.08,
              marginBottom: Dimensions.get('window').height * 0.02,
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
                  // flex: 2,
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
                  flex: 4,
                  marginLeft: Dimensions.get('window').width * 0.03,
                }}>
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

              <TouchableOpacity style={{flex: 1}} onPress={() => show(item)}>
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
                disabled={storeData.role === 'Faculty' ? true : false}
                style={{
                  backgroundColor: '#5BA199',
                  paddingHorizontal: Dimensions.get('window').width * 0.15,
                  paddingVertical: Dimensions.get('window').height * 0.01,
                  borderRadius: 16,
                }}
                // onPress={() => handleApply({item})}
                // onPress={() => handleApply(item)}
                onPress={() => handleApply(item)}

                // onPress={navigation.navigate('ApplyToJob')}
              >
                <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
                  Apply
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  color: '#469597',
                  fontSize: 16,
                  flex: 1,
                  marginLeft: '15%',
                  // justifyContent: 'flex-end',
                }}>
                {item.jobCity},{item.jobLocation}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />

      <ActionSheet
        // id={sheetId}
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
              <TouchableOpacity
                style={styles.buttonStyleDesc}
                // activeOpacity={0.5}
                // onPress={handleSubmitButton}
              >
                <Text style={styles.buttonTextStyle}>Description</Text>
              </TouchableOpacity>
            </View>

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
              <TouchableOpacity
                disabled={storeData.role === 'Faculty' ? true : false}
                style={styles.buttonStyle}
                onPress={() => handleApply(actionParameters)}>
                <Text
                  style={styles.buttonTextStyle}
                  // onPress={navigation.navigate('ApplyToJob')}
                >
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ActionSheet>
    </View>
  );
}

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
  likeView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.75,
    alignSelf: 'center',
    marginTop: '5%',
    marginBottom: '15%',
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
