import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {profile} from '../model/data';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import DocumentPicker from 'react-native-document-picker';
import ImageModal from 'react-native-image-modal';

export default function CreatePostScreen() {
  const [text, setText] = useState('');

  const [multipleFile, setMultipleFile] = useState([]);

  const selectMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      for (const res of results) {
        console.log('length is : ', results.length);

        console.log('URI : ' + res.uri);

        console.log('File Name : ' + res.name);

        console.log('File Type: ' + res.type);

        setMultipleFile(current => [
          ...current,
          {
            key: Math.floor(Math.random() * 1000000000),
            name: res.name,
            uri: res.uri,

            type: res.type,
          },
        ]);
      }
    } catch (err) {
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
          }}>
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
