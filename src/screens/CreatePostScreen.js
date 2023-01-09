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
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {profile} from '../model/data';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import DocumentPicker from 'react-native-document-picker';
import ImageModal from 'react-native-image-modal';

import storage from '@react-native-firebase/storage';
import {db, dbFirestore} from '../Firebase/Config';
import {ref, set, limitToFirst} from 'firebase/database';

export default function CreatePostScreen() {
  const [text, setText] = useState('');

  const [multipleFile, setMultipleFile] = useState([]);
  const [filePath, setfilePath] = useState();

  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  var yourArray = new Array();

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

  const fb = async () => {
    // let promise = new Promise(resolve => {
    //   // setTimeout(() => resolve("done!"), 1000)
    //   uploadImage();
    //   setTimeout(() => resolve('done!'), 1000);
    // });
    // let result = await promise;
    // alert(result);
    const result = await uploadImage();

    console.log('another method to check!!!' + yourArray);
    console.log('WORKING ');

    console.log('another method to check 222!!!' + yourArray);

    dbFirestore()
      .collection('Users')
      .doc('roles')
      .collection('alumni')
      .add({
        name: ' AGAINNNNN',
        age: 22,
        url: yourArray,
      })
      .then(() => {
        console.log('WORKING WITH MULTIPLE URLS!');
      });
  };
  const uploadImage = async () => {
    try {
      let mod = filePath.map(function (element) {
        console.log('test 1');
        console.log(element.fileCopyUri.replace('file://', ''));
        console.log('test 2');
        console.log(element.name);
        console.log('test 3');
        console.log(element.uri);

        // const url = .getDownloadURL();
        const reference = storage().ref('/myfiles/' + element.name);
        const task = reference.putFile(
          element.fileCopyUri.replace('file://', ''),
        );

        task.on('state_changed', async taskSnapshot => {
          // console.log('checking');
          console.log('uploading');
          // const url = await reference.getDownloadURL();
          // let yourArray = [url];
          // yourArray.push(...[url]);
          // console.log('URLS ARE \n' + yourArray.join('\n'));
        });
        task.then(async () => {
          const url = await reference.getDownloadURL();
          // yourArray = [url];
          // console.log('URLS 1 \n' + yourArray.join('\n'));

          // yourArray.push(url);
          // console.log('URLS ARE \n' + yourArray.join('\n'));
          console.log('Uploaded');
          console.log('Checking here 5555!');
          console.log(yourArray);
          function addd() {
            console.log('URLS ARE \n');

            yourArray.push(url);
            console.log('Checking here!34443');
            console.log(yourArray);
            // dbFirestore()
            //   .collection('Users')
            //   .doc('roles')
            //   .collection('student')
            //   .add({
            //     name: ' TESTTTTTTT',
            //     age: 22,
            //     url: yourArray,
            //   })
            //   .then(() => {
            //     console.log('WORKING WITH MULTIPLE URLS!');
            //   });
            // list.push(value);
          }
          addd();
          // console.log('url is: ' + url);
          // let yourArray = [url].join('');
          // console.log('URL: \n' + yourArray.push(...url));
          // yourArray.push(...url);
          // console.log('URLS ARE \n' + yourArray.push(...url));
        });
        console.log('Checking here!');
        console.log(yourArray);

        setfilePath({});
      });
      console.log('Checking here 2!');

      console.log(yourArray);

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
    }
  };
  console.log(yourArray);

  const removeFile = key => {
    setMultipleFile(current =>
      current.filter(multipleFile => {
        return multipleFile.key !== key;
      }),
    );
    console.log('clicked!!!');
  };

  console.log(multipleFile);
  console.log('outside to check!!!');
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
          onPress={fb}>
          <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 16}}>
            Post
          </Text>
        </TouchableOpacity>
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
