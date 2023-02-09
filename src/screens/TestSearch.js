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
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default TestSearch = () => {
  const [selectedCategory, setSelectedCategory] = useState('People');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [postsSelected, setpostsSelected] = useState(false);
  const [peopleSelected, setpeopleSelected] = useState(false);
  const [jobsSelected, setjobsSelected] = useState(false);
  const handleCategorySelection = category => {
    setSelectedCategory(category);
    setSearchInput('');
    setSearchResults([]);
    console.log('SelectedCategory', category);
  };

  const handleSearch = async () => {
    // // const db = firebase.firestore();
    // const results = await dbFirestore
    //   .collection(selectedCategory)
    //   .where('title', '==', searchInput)
    //   .get();

    {
      const query = dbFirestore().collection(selectedCategory);
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
        console.log('result', results);
        console.log('resultsss', results.docs);

        //   setpostsSelected(false);
        //   setjobsSelected(false);
        //   setpeopleSelected(false);
      });
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
            // onChangeText={searchValue => setSearchValue(searchValue)}
            // onSubmitEditing={handleSearch}
            // onSubmitEditing={handleSearch}
            value={searchValue}
            // onSubmitEditing={search}
            onChangeText={searchValue => setSearchValue(searchValue)}
          />

          {/* {searchResults.map(result => (
            <Text key={result.id}>{result.firstName}</Text>
          ))} */}
          <View
            style={{padding: 10, backgroundColor: '#5BA199', borderRadius: 16}}>
            <TouchableOpacity onPress={handleSearch}>
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
                  console.log('testing', peopleSelected);
                  handleCategorySelection('Users');
                }}
                // onPress={() => handleCategorySelection('Users')}
              >
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
                  // console.log('posts', postsSelected);
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
                  // setSearchSelected(false);
                  console.log('posts', postsSelected);
                  handleCategorySelection('Posts');
                }}
                // onPress={() => handleCategorySelection('Posts')}
              >
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
                  // setSearchSelected(false);
                  console.log('posts  ', postsSelected);
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
                  // setSearchSelected(false);
                  console.log(setjobsSelected);
                  handleCategorySelection('Jobs');
                }}
                // onPress={() => handleCategorySelection('Jobs')}
              >
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
        {/* <Text>{TitleTag}</Text> */}
        {/* <Text>{TitleTag()}</Text> */}
      </View>

      {/* Search Flatlist */}
      <View>
        {searchResults.map(item => (
          // <View style={styles.resultContainer} key={result.id}>
          //   {/* <Text style={styles.resultTitle}>{result.data().jobCompany}</Text>
          //   <Text style={styles.resultTitle}>{result.data().jobCompany}</Text>
          //   <Text>{result.data().jobDescription}</Text>
          //   <Text>{result.data().jobDescription}</Text> */}
          //   <Text>{result.jobDescription}</Text>
          //   <Text>{result.description}</Text>
          // </View>
          <View
            style={{
              marginHorizontal: '3%',
              marginVertical: Dimensions.get('window').height * 0.00009,
              // marginVertical: '%'
              // key={result.id}
            }}>
            <FlatList
              data={searchResults}
              // keyExtractor={item => item.id}
              key={item.id}
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
          </View>
        ))}
      </View>
      {/* end */}

      {/* end */}
    </ScrollView>

    // below is ok
    // <View>
    //   <View>
    //     <TouchableOpacity onPress={() => handleCategorySelection('Posts')}>
    //       <Text
    //         style={
    //           selectedCategory === 'Posts' ? (
    //             <MaterialCommunityIcons
    //               name="abacus"
    //               size={50}
    //               color="white"
    //               // backgroundColor="green"
    //               // style={styles.iconStyle}
    //               style={styles.icon}
    //               backgroundColor="blue"
    //             />
    //           ) : (
    //             <MaterialCommunityIcons
    //               name="abacus"
    //               size={50}
    //               color="#4CA6A8"
    //               // backgroundColor="green"
    //               // style={styles.iconStyle}
    //               style={styles.icon}
    //             />
    //           )
    //         }>
    //         Posts
    //       </Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={() => handleCategorySelection('Jobs')}>
    //       <Text
    //         style={
    //           selectedCategory === 'Jobs' ? styles.selectedIcon : styles.icon
    //         }>
    //         Jobs
    //       </Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity onPress={() => handleCategorySelection('Users')}>
    //       <Text
    //         style={
    //           selectedCategory === 'Users' ? styles.selectedIcon : styles.icon
    //         }>
    //         People
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    //   <TextInput
    //     style={styles.searchInput}
    //     placeholder="Search"
    //     onChangeText={searchValue => setSearchValue(searchValue)}
    //     onSubmitEditing={handleSearch}
    //     value={searchValue}
    //     // onSubmitEditing={search}
    //   />
    //   {searchResults.map(item => (
    //     // <View style={styles.resultContainer} key={result.id}>
    //     //   {/* <Text style={styles.resultTitle}>{result.data().jobCompany}</Text>
    //     //   <Text style={styles.resultTitle}>{result.data().jobCompany}</Text>
    //     //   <Text>{result.data().jobDescription}</Text>
    //     //   <Text>{result.data().jobDescription}</Text> */}
    //     //   <Text>{result.jobDescription}</Text>
    //     //   <Text>{result.description}</Text>
    //     // </View>
    //     <View
    //       style={{
    //         marginHorizontal: '3%',
    //         marginVertical: Dimensions.get('window').height * 0.00009,
    //         // marginVertical: '%'
    //         // key={result.id}
    //       }}>
    //       <FlatList
    //         data={searchResults}
    //         // keyExtractor={item => item.id}
    //         key={item.id}
    //         renderItem={({item}) => (
    //           <View
    //             style={{
    //               backgroundColor: '#BBC6C8',
    //               // padding: '3%',
    //               borderRadius: 16,

    //               marginVertical: Dimensions.get('window').width * 0.01,
    //               // elevation: 5,
    //             }}>
    //             <View
    //               style={{
    //                 flexDirection: 'row',
    //                 marginTop: Dimensions.get('window').height * 0.02,
    //                 marginHorizontal: Dimensions.get('window').width * 0.05,
    //               }}>
    //               <Image
    //                 style={{
    //                   height: 60,
    //                   width: 60,
    //                   borderRadius: 16,
    //                   // marginLeft: Dimensions.get('window').width * 0.1,
    //                 }}
    //                 source={{
    //                   uri: item.profilePic || item.image || item.pic,
    //                 }}
    //               />
    //               <View
    //                 style={{
    //                   marginLeft: Dimensions.get('window').width * 0.03,
    //                 }}>
    //                 <Text style={{fontSize: 12}}>
    //                   {item.jobCity}
    //                   {item.jobLocation}
    //                   {item.role}
    //                   {item.title}
    //                 </Text>
    //                 <Text
    //                   style={{
    //                     fontSize: 18,
    //                     fontWeight: 'bold',
    //                     marginVertical: Dimensions.get('window').height * 0.005,
    //                     color: '#000000',
    //                   }}>
    //                   {item.jobTitle}
    //                   {item.firstName}
    //                   {item.lastName}
    //                   {item.name}
    //                 </Text>
    //                 <Text>{item.jobCompany}</Text>
    //                 <Text
    //                   style={{
    //                     color: '#469597',
    //                     fontSize: 15,
    //                     marginTop: '5%',
    //                     marginBottom: '5%',
    //                   }}>
    //                   {item.jobMode}
    //                 </Text>
    //                 {/* <Text style={{color: '#469597', fontSize: 15}}>
    //                       {item.experience}
    //                     </Text> */}
    //               </View>
    //             </View>
    //             {/*
    //                 <View
    //                   style={{
    //                     flexDirection: 'row',
    //                     justifyContent: 'space-between',
    //                     alignItems: 'center',
    //                     marginHorizontal: Dimensions.get('window').width * 0.05,
    //                     marginVertical: Dimensions.get('window').height * 0.02,
    //                   }}>
    //                   <Text style={{color: '#469597', fontSize: 16}}>
    //                     {item.jobCompany}
    //                   </Text>
    //                 </View> */}
    //           </View>
    //         )}
    //       />
    //     </View>
    //   ))}
    // </View>
  );
};

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
