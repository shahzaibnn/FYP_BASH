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
    console.log(Docid);
    try {
      let counter = 0;
      let mod = filePath.map(function (element, index) {
        // const url = .getDownloadURL();
        const reference = storage().ref('/myfiles/' + element.name);
        const task = reference.putFile(
          element.fileCopyUri.replace('file://', ''),
        );
        // addd();

        task.on('state_changed', taskSnapshot => {
          console.log('uploading');
        });

        task.then(async () => {
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
        });
      });
      console.log('abey bhai!!');
    } catch (error) {
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
        commentedBy: ['shahzaibnn@gmail.com', 'habibafaisal8@gmail.com'],
        date: currentDate,
        description: text,
        images: yourArray,
        likedBy: ['shahzaibnn@gmail.com'],
        name: 'Canada',
        profilePic:
          'https://www.seekpng.com/png/detail/1008-10080082_27-2011-photoshop-pernalonga-baby-looney-tunes.png',
        title: 'BSCS Student',
      })
      .then(() => {
        console.log('Post Added!');
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

  console.log(filePath);
  // console.log('outside to check!!!');
  console.log('outside to check!!!' + yourArray);

  useEffect(() => {
    if (flag) {
      console.log('Flag is : ', flag);
      addtoDB(yourArray);
      console.log('file path: ', filePath);
      setfilePath([]);
      setText('');
      setyourArray([]);
      setFlag(false);
      alert('Post Uploaded!!!');
    }
  }, [flag]);

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
