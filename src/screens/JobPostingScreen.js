import React, {Component, useEffect, useState} from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';

// import {SliderBox} from 'react-native-image-slider-box';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageModal from 'react-native-image-modal';
import {db, dbFirestore} from '../Firebase/Config';

import DocumentPicker, {types} from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

import {addJob} from '../store/action';
import {useSelector, useDispatch} from 'react-redux';

export default function JobPostingScreen() {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');

  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Pakistan', value: 'Pakistan'},
    {label: 'USA', value: 'USA'},
    {label: 'JAPAN', value: 'Japan'},
    {label: 'CHINA', value: 'China'},
  ]);

  // const [value3, setValue3] = useState(null);
  // const [open3, setOpen3] = useState(false);

  // const [cities, setcities] = useState([
  //   {label: 'Pakistan', value: 'Karachi'},
  //   {label: 'USA', value: 'Washington'},
  //   {label: 'JAPAN', value: 'Tokyo'},
  //   {label: 'CHINA', value: 'Beijing'},
  // ]);
  const [open2, setOpen2] = useState(false);
  const [city, setCity] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: 'Remote', value: 'Remote'},
    {label: 'Hybrid', value: 'Hybrid'},
    {label: 'Onsite', value: 'Onsite'},
  ]);
  const [filePath, setfilePath] = useState();

  const [singleFile, setSingleFile] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [currentDate, setCurrentDate] = useState('');

  const storeData = useSelector(state => state);
  const dispatch = useDispatch();
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

  const addtoDB = async () => {
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
        .collection('Jobs')
        .add({
          jobTitle: title,
          jobEmail: email,
          jobCompany: company,
          jobSalary: salary,
          jobDescription: description,
          jobLocation: value,
          jobCity: city,
          jobMode: value2,
          image: url,
          jobPostedBy: name,
          createdAt: currentDate,
        })
        .then(() => {
          console.log('Post Added!');
          let jobRedux = {
            jobTitle: title,
            jobEmail: email,
            jobCompany: company,
            jobSalary: salary,
            jobDescription: description,
            jobLocation: value,
            jobCity: city,
            jobMode: value2,
            image: url,
            jobPostedBy: name,
            createdAt: currentDate,
          };
          dispatch(addJob(jobRedux));
        });
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert('Job uploaded!', 'You will receive the responses soon! ');
    // setImage(null);
    setfilePath({});
  };

  const selectFile = async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.images,
        copyTo: 'cachesDirectory',
      });
      setfilePath(results);

      console.log(results.uri);
      console.log(results.type);

      setSingleFile(results.uri);
      setUploaded(true);
    } catch (err) {
      console.log('Some Error!!!');
    }
  };

  const removeFile = key => {
    setSingleFile(null);
    setUploaded(false);
    console.log('clicked!!!');
  };

  // console.log(multipleFile);

  console.log('Saved value is: ', singleFile);
  return (
    <ScrollView style={{backgroundColor: '#E5E3E4', flex: 1}}>
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
          Post Job
        </Text>
      </View>

      <View style={{marginHorizontal: '5%'}}>
        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          Job Title
        </Text>

        <View
          style={{
            marginVertical: '5%',
            // height: Dimensions.get('window').height * 0.25,
            backgroundColor: '#BBC6C8',
            // marginHorizontal: '5%',
            borderRadius: 16,
          }}>
          <TextInput
            style={{marginHorizontal: '5%', fontSize: 14, color: '#5BA199'}}
            // multiline
            onChangeText={setTitle}
            value={title}
            placeholder="Job title here..."
            placeholderTextColor={'#5BA199'}
          />
        </View>
      </View>

      <View style={{marginHorizontal: '5%'}}>
        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          Job Location
        </Text>
        <DropDownPicker
          listMode="SCROLLVIEW"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select country"
          style={{
            marginVertical: '5%',
            backgroundColor: '#BBC6C8',
            borderWidth: 0,
            borderRadius: 16,
          }}
          textStyle={{color: '#5BA199', fontSize: 14, marginHorizontal: '2%'}}
          dropDownContainerStyle={{
            backgroundColor: '#469597',
            borderWidth: 0,
            marginTop: 10,
          }}
          //   labelStyle={{color: 'white'}}
          listItemLabelStyle={{color: 'white', fontWeight: 'bold'}}
        />
      </View>

      <View style={{marginHorizontal: '5%'}}>
        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          City
        </Text>

        <View
          style={{
            marginVertical: '5%',
            // height: Dimensions.get('window').height * 0.25,
            backgroundColor: '#BBC6C8',
            // marginHorizontal: '5%',
            borderRadius: 16,
          }}>
          <TextInput
            style={{marginHorizontal: '5%', fontSize: 14, color: '#5BA199'}}
            // multiline
            onChangeText={setCity}
            value={city}
            placeholder="City name"
            placeholderTextColor={'#5BA199'}
          />
        </View>
      </View>

      <View style={{marginHorizontal: '5%'}}>
        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          Name
        </Text>

        <View
          style={{
            marginVertical: '5%',
            // height: Dimensions.get('window').height * 0.25,
            backgroundColor: '#BBC6C8',
            // marginHorizontal: '5%',
            borderRadius: 16,
          }}>
          <TextInput
            style={{marginHorizontal: '5%', fontSize: 14, color: '#5BA199'}}
            // multiline
            onChangeText={setName}
            value={name}
            placeholder="Your name here..."
            placeholderTextColor={'#5BA199'}
          />
        </View>
      </View>

      <View style={{marginHorizontal: '5%'}}>
        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          Contact Email
        </Text>

        <View
          style={{
            marginVertical: '5%',
            // height: Dimensions.get('window').height * 0.25,
            backgroundColor: '#BBC6C8',
            // marginHorizontal: '5%',
            borderRadius: 16,
          }}>
          <TextInput
            style={{marginHorizontal: '5%', fontSize: 14, color: '#5BA199'}}
            // multiline
            onChangeText={setEmail}
            value={email}
            placeholder="Email here..."
            placeholderTextColor={'#5BA199'}
          />
        </View>
      </View>

      <View style={{marginHorizontal: '5%'}}>
        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          Company Name
        </Text>

        <View
          style={{
            marginVertical: '5%',
            // height: Dimensions.get('window').height * 0.25,
            backgroundColor: '#BBC6C8',
            // marginHorizontal: '5%',
            borderRadius: 16,
          }}>
          <TextInput
            style={{marginHorizontal: '5%', fontSize: 14, color: '#5BA199'}}
            // multiline
            onChangeText={setCompany}
            value={company}
            placeholder="Company name here..."
            placeholderTextColor={'#5BA199'}
          />
        </View>
      </View>

      <View style={{marginHorizontal: '5%'}}>
        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          Mode of Work
        </Text>
        <DropDownPicker
          listMode="SCROLLVIEW"
          open={open2}
          value={value2}
          items={items2}
          setOpen={setOpen2}
          setValue={setValue2}
          setItems={setItems2}
          style={{
            marginVertical: '5%',
            backgroundColor: '#BBC6C8',
            borderWidth: 0,
            borderRadius: 16,
          }}
          textStyle={{color: '#5BA199', fontSize: 14, marginHorizontal: '2%'}}
          dropDownContainerStyle={{
            backgroundColor: '#469597',
            borderWidth: 0,
            marginTop: 10,
          }}
          //   labelStyle={{color: 'white'}}
          listItemLabelStyle={{color: 'white', fontWeight: 'bold'}}
        />
      </View>

      <View style={{marginHorizontal: '5%'}}>
        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          Related Picture
        </Text>
      </View>

      {uploaded ? (
        <View
          style={{
            // backgroundColor: 'orange',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{}}>
            <ImageModal
              // onTap={() => console.log(item.display)}
              // disabled={!item.display}
              resizeMode="stretch"
              modalImageResizeMode="contain"
              style={{
                width: 60,
                height: 60,
                borderRadius: 64,
                alignSelf: 'center',
                //   backgroundColor: 'orange',
                //   marginLeft: Dimensions.get('window').width * 0.4,
              }}
              modalImageStyle={{
                minHeight: Dimensions.get('window').height,
                minWidth: Dimensions.get('window').width,
              }}
              source={{
                uri: singleFile,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => removeFile()}
            style={{marginTop: '2%'}}>
            <Entypo name="circle-with-cross" color={'#777777'} size={20} />
          </TouchableOpacity>
        </View>
      ) : null}
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#469597',
          borderRadius: 12,
          marginTop: '3%',
          height: 30,
          width: 150,
        }}
        onPress={() => selectFile()}>
        <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 15}}>
          Upload Picture
        </Text>
      </TouchableOpacity>

      <View style={{marginHorizontal: '5%'}}>
        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          Salary
        </Text>

        <View
          style={{
            marginVertical: '5%',
            // height: Dimensions.get('window').height * 0.25,
            backgroundColor: '#BBC6C8',
            // marginHorizontal: '5%',
            borderRadius: 16,
          }}>
          <TextInput
            style={{marginHorizontal: '5%', fontSize: 14, color: '#5BA199'}}
            // multiline
            onChangeText={setSalary}
            value={salary}
            placeholder="Salary here..."
            placeholderTextColor={'#5BA199'}
          />
        </View>
      </View>

      <View style={{marginHorizontal: '5%'}}>
        <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          Job Description
        </Text>

        <View
          style={{
            marginVertical: '5%',
            height: Dimensions.get('window').height * 0.25,
            backgroundColor: '#BBC6C8',
            // marginHorizontal: '5%',
            borderRadius: 16,
          }}>
          <TextInput
            style={{marginHorizontal: '5%', fontSize: 14}}
            multiline
            onChangeText={setDescription}
            value={description}
            placeholder="Job description here..."
            placeholderTextColor={'#5BA199'}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{
          alignSelf: 'center',
          paddingHorizontal: '15%',
          paddingVertical: '3%',
          backgroundColor: '#469597',
          borderRadius: 32,
          marginVertical: '3%',
        }}
        onPress={addtoDB}>
        <Text
          style={{
            fontSize: 25,
            color: '#ffffff',
            fontWeight: 'bold',
          }}>
          Post Job
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
