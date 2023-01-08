import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
  TextInput,
} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
// import {getStorage, getDownloadURL} from 'firebase/storage';

import DocumentPicker from 'react-native-document-picker';
import {db, dbFirestore} from '../Firebase/Config';
import {ref, set, limitToFirst} from 'firebase/database';

import {
  launchCamera,
  launchImageLibrary,
  showImagePicker,
} from 'react-native-image-picker';
export default function ImageScreen() {
  const [image, setImage] = useState(null);
  const [filePath, setfilePath] = useState();
  const [url, setUrl] = useState();
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const selectImage = async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });
      setfilePath(results);
      console.log(results);
      console.log(results.uri);
      console.log(results.name);
      const source = {uri: results.uri};
      console.log(source);
      setImage(source);
      //   setSingleFile(results.uri);
      //   setfileName(results.name);
      //   setUploaded(true);
    } catch (err) {
      console.log('Some Error!!!');
    }
  };

  const readFirestore = async () => {
    // const usersCollection = await

    dbFirestore()
      .collection('Users')
      .doc('roles')
      .collection('student')
      .add({
        name: ' mcka kadckacmdfsl',
        age: 30,
        url: url,
      })
      .then(() => {
        console.log('User added!');
      });
  };
  function createData() {
    // const newKey = push(child(ref(database), 'users')).key;

    set(ref(db, 'roles/' + username), {
      username: username,
      email: email,
      imageurl: imageurl,
    })
      .then(() => {
        // Data saved successfully!
        alert('data added!');
      })
      .catch(error => {
        // The write failed...
        alert(error);
      });
  }
  const uploadImage = async () => {
    const filename = filePath.fileCopyUri.substring(
      filePath.fileCopyUri.lastIndexOf('/') + 1,
    );
    const uploadUri =
      Platform.OS === 'ios'
        ? filePath.fileCopyUri.replace('file://', '')
        : filePath.fileCopyUri;
    setUploading(true);
    setTransferred(0);
    const task = await storage().ref(filename).putFile(uploadUri);
    // console.log(task.ref.getDownloadURL);
    // final TaskSnapshot task = await storage().ref(filename).putFile(uploadUri);
    console.log('working');
    const url = await storage().ref(filename).getDownloadURL();
    console.log('url is: ' + url);

    try {
      task;
      dbFirestore()
        .collection('Users')
        .doc('roles')
        .collection('student')
        .add({
          name: ' Habiba ',
          PostContent: 'Testing the functionality',
          Image: url,
        })
        .then(() => {
          console.log('Uploaded!');
        });
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
    // setImage(null);
    setfilePath({});
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={username}
        onChangeText={setName}
        placeholder="Username"
        style={styles.textBoxes}></TextInput>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.textBoxes}></TextInput>
      <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {image !== null ? (
          <Image source={{uri: image.uri}} style={styles.imageBox} />
        ) : null}
        {uploading ? (
          <View style={styles.progressBarContainer}>
            {/* <Progress.Bar progress={transferred} width={300} /> */}
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Upload image</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* <View>
        <Image source={{uri: url}} />
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#bbded6',
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  },
});
