import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {profile} from '../model/data';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import DocumentPicker from 'react-native-document-picker';
import ImageModal from 'react-native-image-modal';

import storage from '@react-native-firebase/storage';
import {db, dbFirestore} from '../Firebase/Config';
import {useSelector, useDispatch} from 'react-redux';

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
} from 'firebase/database';
import {waitForPendingWrites} from 'firebase/firestore';

import {Wave} from 'react-native-animated-spinkit';
import {Chase} from 'react-native-animated-spinkit';

export default function CreatePostScreen() {
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [pointerEvent, setPointerEvent] = useState('auto');
  const [opacity, setOpacity] = useState(1);
  const [indicator, setIndicator] = useState(true);

  const storeData = useSelector(state => state);
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const [multipleFile, setMultipleFile] = useState([]);
  const [yourArray, setyourArray] = useState([]);
  const [filePath, setfilePath] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    );
  }, []);

  const Docid = Math.floor(Math.random() * 100);

  // var yourArray = new Array();
  // var abc;
  const selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });
      console.log('Main rrsuklts chbhdscbsh: ', results);
      // setfilePath(results);
      for (const res of results) {
        setfilePath(
          current => [
            ...current,
            {
              key: Math.floor(Math.random() * 100000000000),
              name: res.name,
              uri: res.uri,
              fileCopyUri: res.fileCopyUri,
              size: res.size,
              type: res.type,
            },
          ],
          // console.log('File Path :' + results),
        );
      }
    } catch (err) {
      // setfilePath({});
      console.log('Some Error!!!');
    }
  };

  const uploadImage = async () => {
    setIndicator(false);
    console.log('yahan pe checking!!!');
    try {
      let counter = 0;

      if (filePath.length === 0) {
        setFlag(true);
      }

      let mod = filePath.map(function (element, index) {
        console.log('no image');
        // const url = .getDownloadURL();
        const reference = storage().ref('/myfiles/' + element.name);
        const task = reference.putFile(
          element.fileCopyUri.replace('file://', ''),
        );
        // addd();

        task.on('state_changed', taskSnapshot => {
          console.log('uploading');
        });

        task
          .then(async () => {
            console.log('Task complete');
            console.log('Uploaded');
            const url = await reference.getDownloadURL();
            console.log('URLS ARE \n');
            yourArray.push(url);
            // console.log('Checking here!34443');
            console.log(yourArray);
            // addtoDB(yourArray);
            setyourArray(yourArray);
            // setfilePath({});
            counter++;
            console.log(counter);
            console.log(filePath.length);
            if (counter == filePath.length) {
              setFlag(true);
            }
          })
          .catch(() => {
            console.log('no image');
          });
      });
      console.log('abey bhai!!');
    } catch (error) {
      setIndicator(true);
      console.log('Some Error!!!');
    } finally {
      console.log('final: ');
      // addtoDB(yourArray);
      console.log('Here: ');

      // alert('ALL UPLOADED');
    }
  };

  const addtoDB = async yourArray => {
    console.log('id is ' + Docid);
    console.log('------------------------------------------------------------');

    await dbFirestore()
      .collection('Posts')
      .add({
        commentedBy: [],
        createdAt: currentDate,
        description: text,
        images: yourArray,
        likedBy: [],
        name: storeData.firstName,
        profilePic: storeData.pic,
        title: storeData.title,
        postedBy: storeData.userEmail,
      })
      .then(() => {
        setIndicator(true);
        console.log('Post Added!');
        alert('Post Uploaded!!!');
      });
  };

  // function one() {
  //   return new Promise(function (resolve, reject) {
  //     uploadImage();
  //     // setTimeout(function () {
  //     //   // console.log('first function executed');
  //     //   // resolve();
  //     // }, 3000);
  //   });
  // }

  // function two() {
  //   console.log('second function executed');
  // }
  // one().then(two);

  function buttonClick() {
    uploadImage();
    // function doHomework(subject, callback) {
    //   // alert(`Starting my ${subject} homework.`);
    //   addtoDB(yourArray);
    //   callback();
    // }
    // function alertFinished() {
    //   // alert('Finished my homework');
    //   uploadImage();
    // }
    // doHomework('math', alertFinished);

    // setTimeout(async () => {
    //   await addtoDB(yourArray);
    // });
    // await uploadImage();

    // let myPromise = new Promise(function (myResolve, myReject) {
    //   uploadImage;
    //   myResolve('succesffulll'); // when successful
    //   myReject('errorrrrr'); // when error
    // });

    // // "Consuming Code" (Must wait for a fulfilled Promise)
    // myPromise.then(
    //   function (value) {
    //     alert('sahi!!');
    //     console.log('pass', value);
    //   },
    //   function (error) {
    //     console.log('afsos', error);
    //     alert('errir hey!!');
    //   },
    // );
  }

  const removeFile = key => {
    setfilePath(current =>
      current.filter(filePath => {
        return filePath.key !== key;
      }),
    );
    console.log('clicked!!!');
  };

  // console.log(filePath);
  // console.log('outside to check!!!');
  // console.log('outside to check!!!' + yourArray);

  useEffect(() => {
    if (flag) {
      console.log('Flag is : ', flag);
      addtoDB(yourArray);
      console.log('file path: ', filePath);
      setfilePath([]);
      setText('');
      setyourArray([]);
      setFlag(false);
      // setIndicator(true);
      // alert('Post Uploaded!!!');
    }
  }, [flag]);

  useEffect(() => {
    if (indicator) {
      setSpinnerLoader(false);
      setPointerEvent('auto');
      setOpacity(1);
    } else {
      setSpinnerLoader(true);
      setPointerEvent('none');
      setOpacity(0.8);
    }
  }, [indicator]);

  return (
    <ScrollView style={{backgroundColor: '#E5E3E4'}}>
      <View pointerEvents={pointerEvent} style={{opacity: opacity}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: '5%',
            marginVertical: '3%',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 0}}
            onPress={() => console.log(storeData)}>
            <Entypo name="circle-with-cross" size={25} color="#777777" />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 30,
              color: '#000000',
              fontWeight: 'bold',
              textAlign: 'center',
              // marginHorizontal: Dimensions.get('window').width / 5,
              // marginEnd: '30%',

              // marginHorizontal: '25%',
            }}>
            Share Post
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: '5%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: storeData.pic}}
            style={{width: 60, height: 60, borderRadius: 64}}
          />

          <View
            style={{
              // marginLeft: '5%',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View style={{marginLeft: '5%'}}>
              <Text
                style={{color: '#000000', fontWeight: 'bold', fontSize: 20}}>
                {storeData.firstName} {storeData.lastName}
              </Text>
              <Text style={{color: '#5BA199', marginVertical: '2%'}}>
                {storeData.title}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#4CA6A8',
                paddingVertical: '3%',
                paddingHorizontal: '7%',
                borderRadius: 16,
                marginLeft: '24%',
                // alignContent: 'flex-end',
                // alignItems: 'flex-end',
                // flexDirection: 'row',
                alignSelf: 'baseline',
              }}
              onPress={buttonClick}>
              <Text
                style={{color: '#ffffff', fontWeight: 'bold', fontSize: 16}}>
                Post
              </Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
          style={{
            backgroundColor: '#4CA6A8',
            paddingVertical: '2%',
            paddingHorizontal: '17%',
            // borderRadius: 16,
            marginLeft: '-50%',
            marginTop: '-50%',
          }}
          onPress={dbadd}>
          <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 16}}>
            Post here
          </Text>
        </TouchableOpacity> */}
        </View>

        <View
          style={{
            marginVertical: '5%',
            height: Dimensions.get('window').height * 0.25,
            backgroundColor: '#BBC6C8',
            marginHorizontal: '5%',
            borderRadius: 16,
          }}>
          <TextInput
            style={{marginHorizontal: '5%', fontSize: 18}}
            multiline
            onChangeText={setText}
            value={text}
            placeholder="Write post here..."
            placeholderTextColor={'#5BA199'}
          />
        </View>

        <Text
          style={{
            marginHorizontal: '5%',
            fontSize: 23,
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '3%',
          }}>
          Attachments
        </Text>

        <TouchableOpacity
          onPress={() => selectMultipleFile()}
          style={{
            backgroundColor: '#4CA6A8',

            marginHorizontal: '5%',
            alignSelf: 'baseline',
            paddingHorizontal: '8%',
            paddingVertical: '3%',
            borderRadius: 32,
          }}>
          <FontAwesome name="paperclip" size={25} color="#ffffff" />
        </TouchableOpacity>

        <View
          style={{
            marginHorizontal: '5%',
            marginVertical: '5%',
            // backgroundColor: '#BBC6C8',
            // justifyContent: 'space-between',
          }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // numColumns={4}
            data={filePath}
            key={'_'}
            keyExtractor={item => '_' + item.key}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    marginVertical: 10,
                    marginEnd: 15,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ImageModal
                    // onTap={() => console.log(item.display)}
                    // disabled={!item.display}
                    resizeMode="stretch"
                    modalImageResizeMode="contain"
                    style={{width: 60, height: 60, borderRadius: 64}}
                    modalImageStyle={{
                      minHeight: Dimensions.get('window').height,
                      minWidth: Dimensions.get('window').width,
                    }}
                    source={{
                      uri: item.uri,
                    }}
                  />

                  <TouchableOpacity
                    style={{marginTop: 5}}
                    onPress={() => removeFile(item.key)}>
                    <Entypo
                      name="circle-with-cross"
                      size={20}
                      color="#777777"
                    />
                  </TouchableOpacity>

                  {/* <Text>{item.name}</Text> */}
                </View>
              );
            }}
          />
        </View>
        {spinnerLoader ? (
          <Chase
            style={{
              position: 'absolute',
              top: Dimensions.get('window').height * 0.5,
              left: Dimensions.get('window').width * 0.4,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            size={Dimensions.get('window').width * 0.2}
            color="#5BA199"
          />
        ) : null}
      </View>
    </ScrollView>
  );
}

// const checking = () => {
//   console.log('Button Clicked!');
//   setTimeout(function () {
//     fb();
//     // first();
//   }, 3000);
// };
// const fb = async () => {
//   console.log('Clicked ');

//   let promise = new Promise(resolve => {
//     // setTimeout(() => resolve("done!"), 1000)
//     setTimeout(() => resolve('done!'), 1000);
//     console.log('WORKING promise ');
//     uploadImage();
//   });
//   let result = await promise;
//   alert(result);
//   console.log('check after promise' + yourArray);

//   // let promisee = new Promise(resolve => {
//   //   // setTimeout(() => resolve("done!"), 1000)
//   //   setTimeout(() => resolve('DONEEEEE!'), 1000);
//   //   console.log('WORKING promise 21 ');
//   //   console.log(yourArray);
//   //   console.log('another method to check!!! 22222' + yourArray);
//   console.log('WORKING 1112222');
//   dbFirestore()
//     .collection('Users')
//     .doc('roles')
//     .collection('alumni')
//     .add({
//       name: 'PROMISE LOGICC',
//       age: 22,
//       url: yourArray,
//     })
//     .then(() => {
//       console.log('WORKING WITH MULTIPLE URLS!');
//       alert('FIRESTORE');
//     });
//   return true;
//   // });
//   // let results = await promisee;
//   // alert(results);
//   // resultt();
//   // const resultt = (function () {
//   //   console.log(yourArray);
//   //   console.log('another method to check!!!' + yourArray);
//   //   console.log('WORKING ');
//   //   dbFirestore()
//   //     .collection('Users')
//   //     .doc('roles')
//   //     .collection('alumni')
//   //     .add({
//   //       name: 'PROMISE LOGICC',
//   //       age: 22,
//   //       url: yourArray,
//   //     })
//   //     .then(() => {
//   //       console.log('WORKING WITH MULTIPLE URLS!');
//   //       alert('doneeeeeee');
//   //     });
//   // })();
//   // console.log(result);

//   // console.log('another method to check 222!!!' + yourArray);
//   // uploadImage();
//   // setTimeout(function () {
//   //   uploadImage();
//   // }, 3000);
// };
