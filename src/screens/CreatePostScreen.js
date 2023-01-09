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
          const url = await reference.getDownloadURL();
          let yourArray = [url];
          yourArray.push(...[url]);
          console.log('URLS ARE \n' + yourArray.join('\n'));
        });
        task.then(async () => {
          // const url = await reference.getDownloadURL();
          console.log('Uploaded');
          // console.log('url is: ' + url);
          // let yourArray = [url].join('');
          // console.log('URL: \n' + yourArray.push(...url));
          // yourArray.push(...url);
          // console.log('URLS ARE \n' + yourArray.push(...url));

          // dbFirestore()
          //   .collection('Posts')
          // .add({
          //   commentedBy: ['shahzaibnn@gmail.com', 'habibafaisal8@gmail.com'],
          //   date: '25th October 2022',
          //   description:
          //     "Architectural styles in Dubai have changed significantly in recent years. While architecture was initially traditional, Dubai's current modernist architecture features innovative exposed-glass walls, stepped ascending spirals and designs that offer subtle nods to traditional Arabic motifs.",
          //   images: [
          //     'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZHViYWl8ZW58MHx8MHx8&w=1000&q=80',
          //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrvShnjnecDWQkvqXazKndlV-5ydcpJgnkVJmcuVedoadu8Ryhj_Z3Z1nho9mapLazuo0&usqp=CAU',
          //   ],
          //   likedBy: ['shahzaibnn@gmail.com'],
          //   name: 'Benedict',
          //   profilePic:
          //     'https://www.seekpng.com/png/detail/1008-10080082_27-2011-photoshop-pernalonga-baby-looney-tunes.png',
          //   title: 'BSCS Student',
          // })
          //   .add({
          //     name: 'NEW POST',
          //     age: 30,
          //     url: yourArray,
          //   })
          // .then(() => {
          //   console.log('User added!');
          // });
        });
      });

      setfilePath({});

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

  const removeFile = key => {
    setMultipleFile(current =>
      current.filter(multipleFile => {
        return multipleFile.key !== key;
      }),
    );
    console.log('clicked!!!');
  };

  console.log(multipleFile);

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
          onPress={uploadImage}>
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
