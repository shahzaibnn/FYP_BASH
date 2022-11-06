import React, {useState, createRef, useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import {user, jobs, posts} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import FileViewer from 'react-native-file-viewer';
import ImageModal from 'react-native-image-modal';

const ApplyToJob = () => {
  const [name, setName] = useState('');
  const [lastName, setlastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [imageURL, setimageURL] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Pakistan', value: 'pakistan'},
    {label: 'USA', value: 'usa'},
  ]);
  const [singleFile, setSingleFile] = useState(null);
  const selectFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
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
    // <View style={styles.bg}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.SectionStyle}>
      <View style={styles.bg}>
        {/* Header */}
        <View style={styles.Header}>
          <TouchableOpacity>
            <FontAwesome
              name="chevron-left"
              style={styles.back}
              size={20}
              color="blacks"
            />
          </TouchableOpacity>

          <Text style={styles.titleText}>Apply to Job</Text>
        </View>
        {/* Form */}
        <View style={styles.ExpBoxView}>
          <Text style={styles.text}>First Name</Text>
          <Text style={styles.lastNameStyle}>Last Name</Text>
        </View>
        <View style={styles.ExpBoxView}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={name => setName(name)}
            placeholder="First Name"
            placeholderTextColor="#6A6A6A"
            blurOnSubmit={false}
          />
          <View style={{flex: 0.1}}></View>
          <TextInput
            style={styles.inputStyle}
            onChangeText={lastName => setlastName(lastName)}
            placeholder="Last Name"
            placeholderTextColor="#6A6A6A"
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.ExpBoxView}>
          <Text style={styles.text}>Email</Text>
        </View>
        <View style={styles.ExpBoxView}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={userEmail => setUserEmail(userEmail)}
            placeholder="Email"
            placeholderTextColor="#6A6A6A"
            blurOnSubmit={false}
          />
        </View>
        {/* Dropdown Menu */}
        <View>
          <View style={styles.ExpBoxView}>
            <Text style={styles.text}>Country</Text>
          </View>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.dropdownContainer}
          />
        </View>
        {/*  */}
        {/* Message Input Field */}
        <View style={styles.ExpBoxView}>
          <Text style={styles.text}>Message</Text>
        </View>
        <View style={styles.messageBodyStyle}>
          <TextInput
            style={styles.messageStyle}
            onChangeText={UserName => setUserName(UserName)}
            placeholder="What sets you different from others?"
            placeholderTextColor="#6A6A6A"
            blurOnSubmit={false}
          />
        </View>
        {/* CV + Icon */}
        <View style={styles.UploadCV}>
          <TouchableOpacity style={styles.UploadBtn}>
            <Text style={styles.text}>CV</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="file-pdf-box"
              size={60}
              color="#6A6A6A"
              style={{
                // alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          <View style={styles.resumeText}>
            <TouchableOpacity style={styles.resumeText} onPress={selectFile}>
              <Text>Upload Here</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Apply Now Button */}

        <TouchableOpacity
          style={styles.buttonStyle}
          // activeOpacity={0.5}
          // onPress={handleSubmitButton}
        >
          <Text style={styles.buttonTextStyle}>Apply</Text>
        </TouchableOpacity>
        {/* <Image source={{uri: source}} /> */}
      </View>

      {/* testing upload */}
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
          uri: res.uri,
        }}
      />
    </ScrollView>
    /*  </View> */
  );
};

export default ApplyToJob;

const styles = StyleSheet.create({
  ExpBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // height: 500,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 10,
    marginLeft: 15,
    color: '#5BA199',
  },
  messageBodyStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    height: 150,
    justifyContent: 'center',
  },
  messageStyle: {
    flex: 1,
    backgroundColor: 'white',
    color: '#6A6A6A',
    paddingLeft: 40,
    paddingRight: 20,
    borderRadius: 12,
    alignContent: 'center',
    // alignSelf: 'center',
  },
  Row: {
    flexDirection: 'row',
  },
  bg: {
    backgroundColor: '#E5E3E4',
    height: 1000,
    borderRadius: 12,
    marginTop: 15,
    marginLeft: 25,
    marginRight: 25,
    margin: 10,
  },
  SectionStyle: {
    // flexDirection: 'row',
    backgroundColor: '#E5E3E4',
    // height: 500,

    // backgroundColor: 'white',
  },
  inputStyle: {
    flex: 1,
    backgroundColor: 'white',
    color: '#6A6A6A',
    paddingLeft: 10,
    paddingRight: 20,
    borderRadius: 12,
  },
  inputStyle2: {
    flex: 1,
    backgroundColor: 'white',
    color: '#6A6A6A',
    paddingLeft: 30,
    paddingRight: 20,
    borderRadius: 12,
  },
  editExpView: {
    // alignItems: 'center',
    flex: 1,
  },
  resumeText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {fontSize: 20, fontWeight: 'bold', color: '#6A6A6A', paddingTop: 15},

  lastNameStyle: {
    textAlign: 'right',
    marginRight: 70,
    // paddingLeft: 15,
    fontSize: 15,
    color: '#6A6A6A',
    fontWeight: 'bold',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: '#6A6A6A',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
    marginTop: 20,
    // borderRadius: 15,
    // borderWidth: 5,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    margin: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  menuContent: {
    color: '#000',
    padding: 2,
    fontSize: 15,
  },
  buttonStyle: {
    backgroundColor: '#4CA6A8',
    color: '#FFFFFF',
    height: 50,
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
