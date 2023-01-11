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

// checking

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
