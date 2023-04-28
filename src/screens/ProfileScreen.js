import React, {Component, useState, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import {user, jobs, posts, experience} from '../model/data';
import {profile} from '../model/data';
import {SliderBox} from 'react-native-image-slider-box';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import storage from '@react-native-firebase/storage';
import {Chase} from 'react-native-animated-spinkit';

// import {SliderBox} from 'react-native-image-slider-box';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageModal from 'react-native-image-modal';
import {useSelector, useDispatch} from 'react-redux';
import {db, dbFirestore} from '../Firebase/Config';

import DocumentPicker, {types} from 'react-native-document-picker';
import {useEffect} from 'react';
import Pdf from 'react-native-pdf';
import {
  updateResumeUrl,
  removeResumeUrl,
  updateProfilePicUrl,
  removePicUrl,
} from '../store/action';
// import {dbFirestore} from '../Firebase/Config';
import ActionSheet from 'react-native-actions-sheet';
import AlertBox from '../components/AlertBox';

const ProfileScreen = ({navigation}) => {
  const profileName = 'Tony';

  const [showWarning, setShowWarning] = useState(false);

  const [deleteId, setDeleteId] = useState('');

  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [pointerEvent, setPointerEvent] = useState('auto');
  const [opacity, setOpacity] = useState(1);
  const [indicator, setIndicator] = useState(true);

  const WarningCancelPressed = () => {
    setShowWarning(false);
  };

  const WarningConfirmPressed = () => {
    // console.log(item.id);
    dbFirestore()
      .collection('Posts')
      .doc(deleteId)
      .delete()
      .then(() => {
        console.log('User deleted!');
        setFetchedPosts(current =>
          current.filter(posts => posts.id !== deleteId),
        );
        setExtraData(new Date());
        setShowWarning(false);
      });
  };

  const dispatch = useDispatch();

  const storeData = useSelector(state => state);
  const emailAddressOfCurrentUser = storeData.userEmail;

  const [fetchedPosts, setFetchedPosts] = useState([]);

  const [singleFile, setSingleFile] = useState();
  const [singleFileImage, setSingleFileImage] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [extraData, setExtraData] = React.useState(new Date());
  const [filePath, setfilePath] = useState({});
  const [imagePath, setImagePath] = useState({});
  const [resumeUrl, setResumeUrl] = useState(storeData.resumeUrl);
  const [showPdf, setShowPdf] = useState('');
  const [selected, setSelected] = useState(false);
  const [selectedPic, setSelectedPic] = useState(false);
  const [setPicUrl, picUrl] = useState(storeData.pic);

  const [likedPeople, setLikedPeople] = useState([]);
  const [enabledScroll, setEnabledScroll] = useState(true);

  let actionSheetRef = createRef();
  let actionSheetLike = createRef();
  const likeShow = itemLikes => {
    console.log('liked by here ', itemLikes);
    setLikedPeople(itemLikes);

    // console.log('acrtions is, ', actionParameters);
    actionSheetLike.current.show();
  };

  // useEffect(() => {
  //   console.log('fetching in use effectttt');
  //   const fetchResumeUrl = async () => {
  //     try {
  //       const querySnapshot = await dbFirestore()
  //         .collection('Users')
  //         .where('userEmail', '==', storeData.userEmail)
  //         .get();
  //       console.log('Total Found users: ', querySnapshot.size);

  //       querySnapshot.forEach(documentSnapshot => {
  //         console.log(documentSnapshot.id);
  //         setResumeUrl(documentSnapshot.data().resumeUrl);
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   console.log('fetching in use effectttt', resumeUrl);

  //   fetchResumeUrl();
  // }, []);
  // useEffect(() => {
  //   dbFirestore()
  //     .collection('Users')
  //     .where('userEmail', '==', storeData.userEmail)
  //     .get()
  //     .then(querySnapshot => {
  //       querySnapshot.forEach(documentSnapshot => {
  //         const data = documentSnapshot.data();
  //         setResumeUrl(data.resumeUrl || '');
  //       });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, [storeData.userEmail]);
  // const renderPdfPreview = () => {
  //   if (showPdf && resumeUrl !== '') {
  //     return (
  //       <View>
  //         <Pdf
  //           source={{uri: pdfUrl}}
  //           trustAllCerts={false}
  //           onLoadComplete={(numberOfPages, filePath) => {
  //             console.log(`Number of pages: ${numberOfPages}`);
  //           }}
  //           onError={error => {
  //             console.error(error);
  //           }}
  //           onPressLink={uri => {
  //             console.log(`Link pressed: ${uri}`);
  //           }}
  //           style={{flex: 1, width: '100%', height: 500}}
  //         />
  //         <TouchableOpacity
  //           onPress={handleClose}
  //           style={{alignItems: 'center'}}>
  //           <Ionicons name="ios-close-circle-sharp" size={20} color="red" />
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   }
  // };

  const show = () => {
    // console.log(item);
    // setActionParameters(item);
    // console.log('acrtions is, ', actionParameters);
    actionSheetRef.current.show();
    // actionSheet.current.hide();
  };

  const hide = () => {
    // console.log(item);
    // setActionParameters(item);
    // console.log('acrtions is, ', actionParameters);
    actionSheetRef.current.hide();
    // actionSheetRef.current.alert('check!');
    // actionSheet.current.hide();
  };

  const selectFile = async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.pdf,
        copyTo: 'cachesDirectory',
      });
      setfilePath(results);

      console.log(results.uri);
      console.log(results.type);

      setSingleFile(results.uri);

      setSelected(true);
    } catch (err) {
      console.log('Some Error!!! is : ', err);
    }
  };

  const selectImage = async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.images,
        copyTo: 'cachesDirectory',
      });
      setImagePath(results);

      console.log(results.uri);
      console.log(results.type);

      setSingleFileImage(results.uri);

      setSelectedPic(true);
    } catch (err) {
      console.log('Some Error!!! is : ', err);
    } finally {
      // hide();
    }
  };
  useEffect(() => {
    if (indicator) {
      setSpinnerLoader(false);
      setPointerEvent('auto');
      setOpacity(1);
      setEnabledScroll(true);
    } else {
      setSpinnerLoader(true);
      setPointerEvent('none');
      setOpacity(0.8);
      setEnabledScroll(false);
    }
  }, [indicator]);
  useEffect(() => {
    if (selected) {
      console.log('filepath is /l : ', filePath);
      setIndicator(false);

      const addtoDB = async () => {
        console.log('file copy uri checking: ', filePath);
        const filename = filePath.fileCopyUri.substring(
          filePath.fileCopyUri.lastIndexOf('/') + 1,
        );
        const uploadUri =
          Platform.OS === 'ios'
            ? filePath.fileCopyUri.replace('file://', '')
            : filePath.fileCopyUri;
        // setUploading(true);
        // setTransferred(0);
        const task = await storage().ref(filename).putFile(uploadUri);
        // console.log(task.ref.getDownloadURL);
        // final TaskSnapshot task = await storage().ref(filename).putFile(uploadUri);
        console.log('working');
        const url = await storage().ref(filename).getDownloadURL();
        console.log('url is: ' + url);

        try {
          task;
          // setPdfUrl(url);
          setResumeUrl(url);

          // console.log('done, link for pdf: ', pdfUrl);

          dbFirestore()
            .collection('Users')
            // .doc('roles')
            // .collection(value.toLowerCase())
            .where('userEmail', '==', storeData.userEmail)
            // .where('userEmail', '==', 'bashfyp@gmail.com')
            .get()
            .then(querySnapshot => {
              console.log('Total Found users: ', querySnapshot.size);

              querySnapshot.forEach(documentSnapshot => {
                console.log(documentSnapshot.id);

                dbFirestore()
                  .doc('Users/' + documentSnapshot.id)
                  .update({
                    // resumeUrl: pdfUrl,
                    resumeUrl: url,
                  })
                  .then(() => {
                    console.log('Added in firestore');

                    dispatch(updateResumeUrl(url));
                    setfilePath({});

                    Alert.alert(
                      'Resume Update',
                      'Resume Uploaded Successfully!',
                    );
                    setIndicator(true);
                  })
                  .catch(err => {
                    console.log('not working');
                    setIndicator(true);
                  });
              });
            })
            .catch(error => {
              console.log(error);
              setIndicator(true);

              // setFlag(true);
            });
          //
          // .then(() => {
          //   console.log('CV Added!');
          // });
        } catch (e) {
          console.error(e);
          setIndicator(true);
        }
        // console.log('done, checking again: ', pdfUrl);

        // setUploading(false);
        // Alert.alert('CV uploaded!', 'Good Luck!');
        // setImage(null);
      };

      addtoDB();

      setSelected(false);
    }
  }, [selected]);

  useEffect(() => {
    if (selectedPic) {
      console.log('Profile Pic is /l : ', imagePath);
      setIndicator(false);
      const addtoDB = async () => {
        console.log('Profile Pic uri checking: ', imagePath);
        const filename = imagePath.fileCopyUri.substring(
          imagePath.fileCopyUri.lastIndexOf('/') + 1,
        );
        const uploadUri =
          Platform.OS === 'ios'
            ? imagePath.fileCopyUri.replace('file://', '')
            : imagePath.fileCopyUri;
        // setUploading(true);
        // setTransferred(0);
        const task = await storage().ref(filename).putFile(uploadUri);
        // console.log(task.ref.getDownloadURL);
        // final TaskSnapshot task = await storage().ref(filename).putFile(uploadUri);
        console.log('Profile Pic working');
        const urlPicc = await storage().ref(filename).getDownloadURL();
        console.log('Profile Pic url is: ' + urlPicc);

        try {
          console.log('Profile 1');

          task;

          // setPdfUrl(url);
          console.log('Profile');
          // setPicUrl(urlPicc);
          console.log('Profile Pic url inside: ' + urlPicc);

          // console.log('done, link for pdf: ', pdfUrl);

          dbFirestore()
            .collection('Users')
            // .doc('roles')
            // .collection(value.toLowerCase())
            .where('userEmail', '==', storeData.userEmail)
            // .where('userEmail', '==', 'bashfyp@gmail.com')
            .get()
            .then(querySnapshot => {
              console.log('Total Found users: ', querySnapshot.size);

              querySnapshot.forEach(documentSnapshot => {
                console.log(documentSnapshot.id);

                dbFirestore()
                  .doc('Users/' + documentSnapshot.id)
                  .update({
                    // resumeUrl: pdfUrl,
                    pic: urlPicc,
                  })
                  .then(() => {
                    console.log('Added in firestore PIC');

                    // dispatch(updateResumeUrl(url));
                    dispatch(updateProfilePicUrl(urlPicc));
                    setImagePath({});
                    // hide();

                    // alert('FINALLY THE PIC IS ADDED');
                    // hide();
                    // () => actionSheetRef.current.hide();
                    // actionSheetRef.current.hide();
                    // actionSheetLike.current.show();
                  });
                setIndicator(true).catch(err => {
                  // alert('not');
                  setIndicator(true);
                  console.log('Pic not changed: ' + err.message);
                });
              });
            })
            .catch(error => {
              // alert(error);
              setIndicator(true);

              // setFlag(true);
            });
          //
          // .then(() => {
          //   console.log('CV Added!');
          // });
        } catch (e) {
          alert('hhhhh');
          console.error(e);
          setIndicator(true);
        }
        // console.log('done, checking again: ', pdfUrl);

        // setUploading(false);
        // Alert.alert('CV uploaded!', 'Good Luck!');
        // setImage(null);
      };

      addtoDB();
      hide();

      setSelectedPic(false);
    }
  }, [selectedPic]);

  const removeProfilePic = () => {
    setIndicator(false);
    try {
      dbFirestore()
        .collection('Users')
        .where('userEmail', '==', storeData.userEmail)
        .get()
        .then(querySnapshot => {
          console.log('Total Found users: ', querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.id);
            dbFirestore()
              .doc('Users/' + documentSnapshot.id)
              .update({
                pic: 'https://www.seekpng.com/png/full/18-188802_graduation-icon-png-image-icon-male-student.png',
              })
              .then(() => {
                console.log('Removed in firestore');
                setImagePath({});
                dispatch(
                  updateProfilePicUrl(
                    'https://www.seekpng.com/png/full/18-188802_graduation-icon-png-image-icon-male-student.png',
                  ),
                );
                setPicUrl(
                  'https://www.seekpng.com/png/full/18-188802_graduation-icon-png-image-icon-male-student.png',
                );
                alert('FINALLY PIC IS REMOVED');
              });
            setIndicator(true).catch(err => {
              setIndicator(true);
              console.log('not working');
            });
          });
        })
        .catch(error => {
          // alert(error);
          // setFlag(true);
          setIndicator(true);
        });
    } catch {
      setIndicator(true);
    }

    hide();

    console.log('clicked!!!');
  };

  const removeFile = () => {
    // setSingleFile(null);
    // setUploaded(false);
    setIndicator(false);

    try {
      dbFirestore()
        .collection('Users')
        // .doc('roles')
        // .collection(value.toLowerCase())
        .where('userEmail', '==', storeData.userEmail)
        // .where('userEmail', '==', 'bashfyp@gmail.com')
        .get()
        .then(querySnapshot => {
          console.log('Total Found users: ', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.id);

            dbFirestore()
              .doc('Users/' + documentSnapshot.id)
              .update({
                // resumeUrl: pdfUrl,
                resumeUrl: '',
              })
              .then(() => {
                console.log('Added in firestore');

                setfilePath({});

                dispatch(removeResumeUrl());
                setResumeUrl('');

                Alert.alert('Resume Update', 'Resume Removed Successfully!');

                setIndicator(true);
              })

              .catch(err => {
                console.log('not working');
                setIndicator(true);
              });
          });
        })
        .catch(error => {
          alert(error);
          setIndicator(true);

          // setFlag(true);
        });
    } catch {
      console.log('not working here');
      setIndicator(true);
    } finally {
      // actionSheet.current.hide();
      // hide();

      console.log('work done here');
    }
    console.log('clicked!!!');
  };

  const findPosts = () => {
    dbFirestore()
      .collection('Posts')
      .where('postedBy', '==', storeData.userEmail)
      // .limit(2)
      .get()
      .then(querySnapshot => {
        console.log('User logged in is: ', storeData.userEmail);
        console.log('YE ASAL CHECKING KE LIYE HEY!!!!');
        console.log('Total posts: ', querySnapshot.size);

        var total = querySnapshot.size;
        let count = 0;

        if (total == 0) {
          // setPostLoader(false);
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
              // setPostLoader(false);
              console.log(':runing');
            }
          });
        }

        // setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      });
  };

  // IMPORTANT

  useEffect(() => {
    findPosts();
  }, []);

  // test start
  // const handlePreview = () => {
  //   // code to display PDF preview

  //   console.log('Preview');
  //   if (pdfUrl !== '') {
  //     setShowPdf(true);
  //   }
  // };

  const handlePreview = () => {
    if (resumeUrl !== '') {
      setShowPdf(true);
    }
  };
  const handleClose = () => {
    // code to close PDF preview
    setShowPdf(false);
  };
  // test end
  return (
    <ScrollView>
      {/* back button with 3 dots button */}
      <ImageModal
        resizeMode="stretch"
        modalImageResizeMode="contain"
        style={{
          minHeight: Dimensions.get('window').height * 0.5,
          minWidth: Dimensions.get('window').width,
          // width: Dimensions.get('window').width,
          // height: Dimensions.get('window').height * 0.4,
          // borderRadius: 64,
        }}
        modalImageStyle={{
          minHeight: Dimensions.get('window').height,
          minWidth: Dimensions.get('window').width,
        }}
        source={{
          uri: storeData.pic,
        }}>
        <TouchableOpacity
          style={{position: 'absolute', left: '5%', top: '5%'}}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={50} color="#777777" />
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => console.log(fetchedPosts)}
          onPress={() => show()}
          style={{position: 'absolute', right: '5%', top: '5%'}}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={40}
            color="#000000"
          />
        </TouchableOpacity>
      </ImageModal>

      <View style={styles.container}>
        <View style={styles.bodyContent}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.name}>
              {storeData.firstName} {storeData.lastName}
            </Text>

            <TouchableOpacity
              style={styles.skillsBox}
              onPress={() => navigation.navigate('EditProfile')}>
              <Text
                style={[styles.skillsText, {color: '#ffffff', fontSize: 18}]}>
                Edit Profile
              </Text>
              <Ionicons name="chevron-forward" size={22} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.info}>{storeData.title}</Text>
          </View>

          <View
            style={{
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              // alignItems: 'center',
              // backgroundColor: 'orange',
              marginTop: '3%',
            }}>
            <Text
              style={{
                // marginTop: '5%',
                fontSize: 22,
                fontWeight: 'bold',
                color: '#000000',
              }}>
              Skills
            </Text>
            {/* <TouchableOpacity style={styles.skillsBox}>
              <Text style={[styles.skillsText, {color: '#ffffff'}]}>
                Add Skills
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#ffffff" />
            </TouchableOpacity> */}
          </View>

          {/* Skills here */}
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={storeData.skills}
            renderItem={({item}) => (
              <View style={{}}>
                <View style={styles.skillsListBox}>
                  <Text style={styles.skillsText}>{item}</Text>
                </View>

                {/* profile description */}
              </View>
            )}
            keyExtractor={item => item.id}
          />
          <View style={{}}>
            <View
              style={{
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'center',
                // backgroundColor: 'orange',
                marginTop: '3%',
              }}>
              <Text
                style={{
                  // marginTop: '5%',
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: '#000000',
                }}>
                Description
              </Text>
              {/* <TouchableOpacity
                style={styles.skillsBox}
                onPress={() => navigation.navigate('EditProfile')}>
                <Text style={[styles.skillsText, {color: '#ffffff'}]}>
                  Edit Description
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#ffffff" />
              </TouchableOpacity> */}
            </View>

            <Text style={{fontSize: 18, marginTop: '5%', fontStyle: 'italic'}}>
              {storeData.description}
            </Text>

            <View
              style={{
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'center',
                // backgroundColor: 'orange',
                marginTop: '3%',
              }}>
              <Text
                style={{
                  // marginTop: '5%',
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: '#000000',
                }}>
                Resume
              </Text>
            </View>
            {/* add cv button here */}
            <View style={styles.UploadCV}>
              {resumeUrl ? (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('PDFView', {
                        pdfUrl: storeData.resumeUrl,
                      })
                    }>
                    <MaterialCommunityIcons
                      name="file-pdf-box"
                      size={60}
                      color="red"
                      style={{
                        // alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                    />

                    <Text style={styles.resumeText}>Resume.pdf</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => removeFile()}
                    style={{alignSelf: 'center', marginTop: '2%'}}>
                    <Entypo
                      name="circle-with-cross"
                      color={'#777777'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}

              <TouchableOpacity
                style={styles.UploadBtn}
                onPress={() => selectFile()}>
                <Text style={styles.UploadText}>Upload CV</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.UploadBtn}
                onPress={() => addtoDB()}>
                <Text style={styles.UploadText}>Upload CV</Text>
              </TouchableOpacity> */}
            </View>

            {/* testing code */}
            {/* <View>
              {/* <TouchableOpacity onPress={() => handlePreview}> 
              <TouchableOpacity onPress={handlePreview}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '5%',
                    marginBottom: '5%',
                  }}>
                   <Image source={require('./pdf-icon.png')} style={{ width: 24, height: 24 }} /> 
                  <Fontisto name="preview" size={20} color="#469597" />
                  <Text style={{marginLeft: 8}}>Preview Resume</Text>
                </View>
              </TouchableOpacity>
              {renderPdfPreview()}
            </View> */}
            {/* testing end */}
            {/* cv file display */}

            {/* experience - edit experience */}
            {/* <View> */}
            <View
              style={{
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'center',
                // backgroundColor: 'orange',
                marginTop: '3%',
              }}>
              <Text
                style={{
                  // marginTop: '5%',
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: '#000000',
                }}>
                Experience
              </Text>
              {/* <TouchableOpacity
                style={styles.skillsBox}
                onPress={() => navigation.navigate('EditProfile')}>
                <Text style={[styles.skillsText, {color: '#ffffff'}]}>
                  Edit Experience
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#ffffff" />
              </TouchableOpacity> */}
            </View>

            {/* commented the following view to bring posts under the same container */}
          </View>

          {/* posts */}
          {/* </View> */}
        </View>
        <View style={styles.ExpbodyContent}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={storeData.experience}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: 'rgba(187, 198, 200, 0.5)',
                  borderRadius: 16,
                  marginHorizontal: Dimensions.get('window').width * 0.02,

                  // height: Dimensions.get('window').height * 0.12,
                  // width: Dimensions.get('window').width * 0.9,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: Dimensions.get('window').height * 0.015,
                    marginHorizontal: Dimensions.get('window').width * 0.03,
                  }}>
                  <Image
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 16,
                      // marginTop: 15,
                      // marginLeft: 10,
                    }}
                    source={{
                      uri: item.image,
                    }}
                  />

                  <View
                    style={{
                      marginLeft: Dimensions.get('window').width * 0.03,
                    }}>
                    <Text style={styles.designationStyle}>{item.title}</Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {item.period} To {item.periodEnd}
                    </Text>
                    <View style={styles.ExpBoxView}>
                      <Text style={{fontWeight: 'bold'}}>{item.company}</Text>
                      <Text style={{fontWeight: 'bold'}}> - </Text>
                      <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
                        {item.city + ', ' + item.country}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
        {/* added the following view line to organize properly */}
        {/* </View> */}

        {/* <View style={styles.ExpbodyContent}> */}
        {/* post content here */}

        {/* THIS IS TO SEARCHED AS TO WHICH POSTS BELONG TO THIS USER */}
        <View>
          <Text
            style={{
              // marginTop: '5%',
              marginHorizontal: '7%',
              fontSize: 22,
              fontWeight: 'bold',
              color: '#000000',
            }}>
            Posts
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={fetchedPosts}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              // console.log('Id is : ', item);
              let likeColor = '';

              var found = false;
              for (var i = 0; i < item.likedBy.length; i++) {
                if (item.likedBy[i].email == emailAddressOfCurrentUser) {
                  found = true;
                  break;
                }
              }

              if (found) {
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
                      // justifyContent: 'space-around',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={{uri: storeData.pic}}
                        style={{
                          // flex: 1,
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
                        setShowWarning(true);
                        setDeleteId(item.id);

                        // console.log(item.id);
                        // dbFirestore()
                        //   .collection('Posts')
                        //   .doc(item.id)
                        //   .delete()
                        //   .then(() => {
                        //     console.log('User deleted!');
                        //     setFetchedPosts(current =>
                        //       current.filter(posts => posts.id !== item.id),
                        //     );
                        //     setExtraData(new Date());
                        //   });
                      }}
                      style={{
                        paddingHorizontal: '3%',
                        backgroundColor: '#5BA199',
                        // height: '30%',
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 16,
                        marginLeft: Dimensions.get('window').width * 0.15,
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
                      <TouchableOpacity
                        style={{marginBottom: 6}}
                        onPress={() => likeShow(item)}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#469597',
                            fontWeight: 'bold',
                          }}>
                          {item.likedBy.length} Likes
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          console.log('hdshjdsfvhddhfbhj');

                          var found = false;
                          for (var i = 0; i < item.likedBy.length; i++) {
                            if (
                              item.likedBy[i].email == emailAddressOfCurrentUser
                            ) {
                              found = true;
                              break;
                            }
                          }
                          if (found) {
                            dbFirestore()
                              .doc('Posts/' + item.id)
                              .update({
                                likedBy: dbFirestore.FieldValue.arrayRemove(
                                  ...[
                                    {
                                      email: emailAddressOfCurrentUser,
                                      name: storeData.firstName,
                                      picUrl: storeData.pic,
                                      role: storeData.role,
                                    },
                                  ],
                                ),
                              })
                              .then(() => {
                                console.log('Like Removed!');
                              });

                            fetchedPosts.find(
                              obj => obj.id == item.id,
                            ).likedBy = item.likedBy.filter(
                              e => e.email !== emailAddressOfCurrentUser,
                            );

                            setExtraData(new Date());

                            // likeColor = '#ffffff';
                          } else {
                            console.log('ye work');
                            dbFirestore()
                              .doc('Posts/' + item.id)
                              .update({
                                likedBy: dbFirestore.FieldValue.arrayUnion({
                                  email: emailAddressOfCurrentUser,
                                  name: storeData.firstName,
                                  picUrl: storeData.pic,
                                  role: storeData.role,
                                }),
                              })
                              .then(() => {
                                console.log('Like Placed!');
                              });
                            let arr = item.likedBy;
                            arr.push({
                              email: emailAddressOfCurrentUser,
                              name: storeData.firstName,
                              picUrl: storeData.pic,
                              role: storeData.role,
                            });
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
        </View>
        {/* </View> */}
        <ActionSheet ref={actionSheetRef}>
          <View
            style={
              // {paddingLeft: '20%'}
              {flexDirection: 'row'}
            }>
            <TouchableOpacity
              style={{
                color: 'blue',
                marginLeft: '5%',
                marginTop: '5%',
                // marginBottom: '25%',
                flexDirection: 'row',
              }}
              onPress={() => {
                selectImage();
                // hide();
              }}>
              <MaterialCommunityIcons
                name="image-edit-outline"
                size={25}
                color="#469597"
              />
              <Text style={{fontSize: 20, paddingLeft: '5%'}}>
                Update Profile Picture
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={
              // {paddingLeft: '20%'}
              {flexDirection: 'row'}
            }>
            <TouchableOpacity
              style={{
                color: 'blue',
                marginLeft: '5%',
                marginTop: '5%',
                // marginBottom: '2%',
                flexDirection: 'row',
              }}
              onPress={() => removeProfilePic()}>
              <MaterialCommunityIcons
                name="image-remove"
                size={25}
                color="#469597"
              />
              <Text style={{fontSize: 20, paddingLeft: '5%'}}>
                Remove Profile Picture
              </Text>
            </TouchableOpacity>
          </View>
        </ActionSheet>

        <ActionSheet
          // id={sheetId}
          // data={fetchedPosts}
          ref={actionSheetLike}
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
            <ScrollView
              style={{
                // flexDirection: 'row',
                backgroundColor: '#E5E3E4',
                // height: 500,

                // backgroundColor: 'white',
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    marginTop: '1%',
                    marginBottom: '3%',
                    marginHorizontal: '10%',
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: 25,
                  }}>
                  Likes
                </Text>
                {likedPeople.likedBy?.map((user, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'flex-start',
                      alignItems: 'center',
                      // paddingHorizontal: '10%',
                      // borderColor: 'black',
                      // borderWidth: 1,
                      marginBottom: Dimensions.get('window').height * 0.04,
                      marginHorizontal: '10%',
                    }}>
                    <Image
                      style={{height: 60, width: 60, borderRadius: 64, flex: 1}}
                      source={{
                        uri: user.picUrl,
                      }}
                    />

                    <View style={{flex: 3}}>
                      <Text
                        style={{
                          marginHorizontal: '20%',
                          backgroundColor: '#E5E3E4',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        {user.name}
                      </Text>

                      <Text
                        style={{
                          marginHorizontal: '20%',

                          backgroundColor: '#E5E3E4',
                          fontStyle: 'italic',

                          fontSize: 14,
                        }}>
                        {user.role}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ViewProfile', {
                          userEmail: user.email,
                        })
                      }
                      style={{
                        flex: 1,
                        backgroundColor: '#5BA199',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        paddingVertical: '2%',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#ffffff',
                          fontWeight: 'bold',
                        }}>
                        View
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </ActionSheet>

        <AlertBox
          showWarning={showWarning}
          CancelPressed={WarningCancelPressed}
          ConfirmPressed={WarningConfirmPressed}
          heading={'Confirmation'}
          text={'Do You want to Delete this post?'}
        />
      </View>
      {spinnerLoader ? (
        <Chase
          style={{
            position: 'absolute',
            // top: Dimensions.get('window').height * 0.5,
            left: Dimensions.get('window').width * 0.4,
            bottom: Dimensions.get('window').height * 0.15,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          size={Dimensions.get('window').width * 0.2}
          color="#5BA199"
        />
      ) : (
        console.log('nto')
      )}
    </ScrollView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
  },
  container: {
    borderRadius: 48,
    // borderColor: 'black',
    // borderWidth: 3,
    marginTop: -60,
    backgroundColor: '#E5E3E4',
    height: Dimensions.get('window').height * 0.8,
  },
  resumeText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  skillsList: {
    flexDirection: 'row',
  },
  ExpBoxView: {
    flexDirection: 'row',
  },
  designationStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: Dimensions.get('window').height * 0.006,
    color: '#000000',
    // marginTop: 12,
  },
  UploadCV: {
    alignSelf: 'center',
    marginTop: '5%',
  },
  header: {
    backgroundColor: '#E5E3E4',
    height: 400,
    resizeMode: 'cover',
    // marginTop: -20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  bodyContent: {
    marginHorizontal: '6%',
    marginVertical: '2%',
  },
  ExpbodyContent: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 10,
  },
  name: {
    fontSize: 28,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: '5%',
    // width: Dimensions.get('window').width * 0.5,
  },
  info: {
    fontSize: 18,
    color: '#469597',
  },
  skillsBtn: {
    backgroundColor: '#469597',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 20,
  },

  skillsBox: {
    alignSelf: 'flex-end',
    // backgroundColor: '#BBC6C8',
    backgroundColor: '#469597',
    // color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    flexDirection: 'row',
    paddingHorizontal: '3%',
  },
  skillsListBox: {
    backgroundColor: '#BBC6C8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    paddingVertical: Dimensions.get('window').height * 0.02,
    marginEnd: Dimensions.get('window').width * 0.05,
    marginTop: Dimensions.get('window').height * 0.02,
  },
  skillsText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  UploadBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#469597',
    borderRadius: 12,
    marginTop: '3%',
    height: 30,
    width: 150,
    // marginBottom: 25,
  },
  UploadText: {
    color: '#FFFFFF',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  expView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    /* Not doing anything. */
    // flex: 1,
  },

  expText1: {
    color: 'black',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  expText2: {
    color: 'white',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    backgroundColor: '#469597',
    width: 150,
    height: 35,
    borderRadius: 12,
  },
});
