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
import React, {useEffect, useState, createRef} from 'react';
import FastImage from 'react-native-fast-image';
import {profile, jobs, posts} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionSheet, {SheetProps} from 'react-native-actions-sheet';

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

export default function TestScreen() {
  let actionSheet = createRef();
  const profileName = 'Tony';
  const emailAddressOfCurrentUser = 'shahzaibnn@gmail.com';
  const [tempLike, setTempLike] = useState([]);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [fetchedJobs, setFetchedJobs] = useState([]);
  const [jobIDD, setJobIDD] = useState([]);

  const [extraData, setExtraData] = React.useState(new Date());
  const show = () => {
    actionSheet.current.show();
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
          setJobIDD(v.id.jobCompany);
          console.log(jobIDD);
        });
      });
  };
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
                  }}
                  onPress={show}>
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

        <ActionSheet
          //   id={props.sheetId}
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
                    uri: 'https://10pearls.com/wp-content/uploads/2017/12/Untitled-design-19-2.png',
                  }}
                />
              </View>
              {/* Post */}
              <View>
                <Text style={styles.name}>{}</Text>
              </View>
              {/* Company Name with location */}
              <View style={styles.expView1}>
                <Text style={styles.compTxt}>{jobs[0].company} </Text>
                <Text style={styles.compTxt}>{jobs[0].city}</Text>
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
                <Text style={styles.compTxt}>{jobs[0].mode}</Text>
                {/* <Text style={styles.compTxt}> - </Text> */}
                <Text style={styles.compTxt}>{jobs[0].salary}/Month</Text>
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

              {/* Qualification Text */}
              <View>
                <Text style={styles.qualText}>Qualification</Text>
              </View>

              {/* Job desc */}
              <View style={styles.messageBodyStyle}>
                <ScrollView>
                  <Text style={styles.messageStyle}>{jobs[0].description}</Text>
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
      </View>
    </ScrollView>
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
});
