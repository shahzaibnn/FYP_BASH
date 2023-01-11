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

export default function CreatePostScreen() {
  const [text, setText] = useState('');

  const [multipleFile, setMultipleFile] = useState([]);
  const [yourArray, setyourArray] = useState([]);
  const [filePath, setfilePath] = useState();

  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [currentDate, setCurrentDate] = useState('');

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
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });
      console.log(results);
      setfilePath(results);
      for (const res of results) {
        // console.log('length is : ', results.length);
        // console.log('URI : ' + res.uri);
        // console.log('File Name : ' + res.name);
        // console.log('File Type: ' + res.type);
        // console.log('CHECKING ' + filePath);
        setMultipleFile(
          current => [
            ...current,
            {
              key: Math.floor(Math.random() * 1000000000),
              name: res.name,
              uri: res.uri,

              type: res.type,
            },
          ],
          console.log('File Path :' + results),
        );
      }
    } catch (err) {
      setfilePath({});
      console.log('Some Error!!!');
    }
  };

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

  const uploadImage = async () => {
    console.log(Docid);
    try {
      let mod = filePath.map(function (element) {
        // console.log('test 1');
        // console.log(element.fileCopyUri.replace('file://', ''));
        // console.log('test 2');
        // console.log(element.name);
        // console.log('test 3');
        // console.log(element.uri);

        // const url = .getDownloadURL();
        const reference = storage().ref('/myfiles/' + element.name);
        const task = reference.putFile(
          element.fileCopyUri.replace('file://', ''),
        );
        addd();

        task.on('state_changed', taskSnapshot => {
          // console.log('checking');
          console.log('uploading');
          // const url = await reference.getDownloadURL();
          // let yourArray = [url];
          // yourArray.push(...[url]);
          // console.log('URLS ARE \n' + yourArray.join('\n'));
        });
        async function addd() {
          const url = await reference.getDownloadURL();
          console.log('URLS ARE \n');
          yourArray.push(url);
          // console.log('Checking here!34443');
          console.log(yourArray);
          addtoDB(yourArray);

          // dbFirestore()
          //   .collection('Posts')
          //   // .doc('roles')
          //   // .collection('alumni')
          //   .doc('P01' + Docid)
          //   .set({
          //     // name: 'PLSSSSSSSSSSSS PLS AGAINNN',
          //     // age: 22,
          //     // url: yourArray,
          //     // .set({
          //     commentedBy: ['shahzaibnn@gmail.com', 'habibafaisal8@gmail.com'],
          //     date: '25th October 2022',
          //     description:
          //       "Architectural styles in Dubai have changed significantly in recent years. While architecture was initially traditional, Dubai's current modernist architecture features innovative exposed-glass walls, stepped ascending spirals and designs that offer subtle nods to traditional Arabic motifs.",
          //     images: [
          //       'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZHViYWl8ZW58MHx8MHx8&w=1000&q=80',
          //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrvShnjnecDWQkvqXazKndlV-5ydcpJgnkVJmcuVedoadu8Ryhj_Z3Z1nho9mapLazuo0&usqp=CAU',
          //     ],
          //     likedBy: ['shahzaibnn@gmail.com'],
          //     name: 'Benedict',
          //     profilePic:
          //       'https://www.seekpng.com/png/detail/1008-10080082_27-2011-photoshop-pernalonga-baby-looney-tunes.png',
          //     title: 'BSCS Student',
          //     url: yourArray,
          //   }
          //   )
          // })
          // .then(() => {
          //   // console.log(ress.id);
          //   console.log('WORKING WITH MULTIPLE URLS!');
          //   alert('FIRESTORE');
          // });
        }
        task.then(() => {
          // yourArray = [url];
          // console.log('URLS 1 \n' + yourArray.join('\n'));

          // yourArray.push(url);
          // console.log('URLS ARE \n' + yourArray.join('\n'));
          console.log('Uploaded');

          // console.log('Checking here 5555!');
          // console.log(yourArray);
          // addd();
          // console.log('url is: ' + url);
          // let yourArray = [url].join('');
          // console.log('URL: \n' + yourArray.push(...url));
          // yourArray.push(...url);
          // console.log('URLS ARE \n' + yourArray.push(...url));
        });
        // console.log('Checking here 2! Checking here! ');
        // console.log('Checking here! Checking here!  ');
        // console.log(yourArray);
        // setyourArray(url);
        // console.log(yourArray);
        setyourArray(yourArray);
        setfilePath({});
      });
      // mod.then(function () {
      //   console.log('Checking here 2! Checking here! ');
      //   dbadd();
      // });
      // abc = true;

      // console.log('Checking here 2!');
      // setyourArray(yourArray);
      // console.log(yourArray);

      // console.log('Checking here!');
      // console.log(yourArray);

      // setfilePath({});

      // dbFirestore()
      //   .collection('Users')
      //   .doc('roles')
      //   .collection('student')
      //   .add({
      //     name: ' mcka kadckacmdfsl',
      //     age: 30,
      //     url: url,
      //   })
      //   .then(() => {
      //     console.log('User added!');
      //   });
    } catch (error) {
      console.log('Some Error!!!');
    } finally {
      console.log('final: ');
      addtoDB(yourArray);
      console.log('Here: ');

      // dbadd();
    }
    // abc = 'true';
  };

  const addtoDB = yourArray => {
    console.log('id is ' + Docid);

    dbFirestore()
      .collection('Posts')
      // .doc('roles')
      // .collection('alumni')
      .doc('P0000' + Docid)
      .set({
        // name: 'PLSSSSSSSSSSSS PLS AGAINNN',
        // age: 22,
        // url: yourArray,
        // .set({
        commentedBy: ['shahzaibnn@gmail.com', 'habibafaisal8@gmail.com'],
        date: currentDate,
        description: text,
        images: yourArray,
        // [
        //   'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZHViYWl8ZW58MHx8MHx8&w=1000&q=80',
        //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrvShnjnecDWQkvqXazKndlV-5ydcpJgnkVJmcuVedoadu8Ryhj_Z3Z1nho9mapLazuo0&usqp=CAU',
        // ],
        likedBy: ['shahzaibnn@gmail.com'],
        name: 'Benedict',
        profilePic:
          'https://www.seekpng.com/png/detail/1008-10080082_27-2011-photoshop-pernalonga-baby-looney-tunes.png',
        title: 'BSCS Student',
        // url: yourArray,
      })

      // .set({
      //   postBody: text,
      //   url: yourArray,
      //   date: '25th October 2022',
      //   name: 'BASH',
      //   profilePic:
      //     'https://www.seekpng.com/png/detail/1008-10080082_27-2011-photoshop-pernalonga-baby-looney-tunes.png',
      //   title: 'BSCS Student',
      // })
      .then(() => {
        // console.log(ress.id);
        console.log('WORKING WITH MULTIPLE URLS!');
        alert('FIRESTORE');
        console.log(yourArray);
      });
  };

  //try setting variable
  const buttonClick = () => {
    uploadImage();
    // dbadd();

    // isBool = uploadImage();
    // setTimeout(() => {
    //   uploadImage();
    // }, 1000);

    console.log('Button clicked: ');
    // if (abc === 'true') {
    //   dbadd();
    // } else {
    //   console.log('sorryy ');

    //   alert('ERROR');
    // }
  };
  // console.log(yourArray);

  const removeFile = key => {
    setMultipleFile(current =>
      current.filter(multipleFile => {
        return multipleFile.key !== key;
      }),
    );
    console.log('clicked!!!');
  };

  const dbadd = () => {
    dbFirestore()
      .collection('Users')
      .doc('roles')
      .collection('alumni')
      .doc('5156')
      .set({
        name: 'HELLO',
        age: 22,
        url: yourArray,
      })
      .then(() => {
        // console.log(ress.id);
        console.log('WORKING WITH MULTIPLE URLS!');
        alert('FIRESTORE');
      });
  };

  console.log(multipleFile);
  // console.log('outside to check!!!');
  console.log('outside to check!!!' + yourArray);

  return (
    <ScrollView style={{backgroundColor: '#E5E3E4'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: '5%',
          marginVertical: '3%',
          justifyContent: 'center',
        }}>
        <TouchableOpacity style={{position: 'absolute', left: 0}}>
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
          source={{uri: profile[0].pic}}
          style={{width: 60, height: 60, borderRadius: 64}}
        />

        <View style={{marginLeft: '5%'}}>
          <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 20}}>
            {profile[0].name}
          </Text>
          <Text style={{color: '#5BA199', marginVertical: '2%'}}>
            {profile[0].title}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#4CA6A8',
            paddingVertical: '3%',
            paddingHorizontal: '7%',
            borderRadius: 16,
            marginLeft: '30%',
          }}
          onPress={buttonClick}>
          <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 16}}>
            Post
          </Text>
        </TouchableOpacity>

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
        <FontAwesome name="paperclip" size={30} color="#ffffff" />
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
          data={multipleFile}
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
                  <Entypo name="circle-with-cross" size={20} color="#777777" />
                </TouchableOpacity>

                {/* <Text>{item.name}</Text> */}
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}
