import React, {useState, createRef, useCallback, useEffect} from 'react';
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
  Alert,
} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import {user, jobs, posts} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import FileViewer from 'react-native-file-viewer';
import ImageModal from 'react-native-image-modal';
import RNSmtpMailer from 'react-native-smtp-mailer';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';

import {useSelector, useDispatch} from 'react-redux';
import {
  addAppliedJob,
  addition,
  setInititialLogin,
  subtraction,
} from '../store/action';
import {dbFirestore} from '../Firebase/Config';

import {Grid} from 'react-native-animated-spinkit';
import {Chase} from 'react-native-animated-spinkit';

const ApplyToJob = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [imageURL, setimageURL] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Pakistan', value: 'Pakistan'},
    // {label: 'Karachi', value: 'Karachi, Pakistan', parent: 'pk'},
    // {label: 'Lahore', value: 'Lahore, Pakistan', parent: 'pk'},
    // {label: 'Islamabad', value: 'Islamabad, Pakistan', parent: 'pk'},
    // {label: 'Rawalpindi', value: 'Rawalpindi, Pakistan', parent: 'pk'},
    // {label: 'Faisalabad', value: 'Faisalabad, Pakistan', parent: 'pk'},

    {label: 'USA', value: 'USA'},
    // {label: 'New York', value: 'New York, USA', parent: 'us'},
    // {label: 'Los Angeles', value: 'Los Angeles, USA', parent: 'us'},
    // {label: 'Chicago', value: 'Chicago, USA', parent: 'us'},
    // {label: 'Houston', value: 'Houston, USA', parent: 'us'},
    // {label: 'Phoenix', value: 'Phoenix, USA', parent: 'us'},

    {label: 'Australia', value: 'Australia'},
    // {label: 'Sydney', value: 'Sydney, Australia', parent: 'au'},
    // {label: 'Melbourne', value: 'Melbourne, Australia', parent: 'au'},
    // {label: 'Brisbane', value: 'Brisbane, Australia', parent: 'au'},
    // {label: 'Perth', value: 'Perth, Australia', parent: 'au'},
    // {label: 'Adelaide', value: 'Adelaide, Australia', parent: 'au'},

    {label: 'United Kingdom', value: 'United Kingdom'},
    // {label: 'London', value: 'London, UK', parent: 'uk'},
    // {label: 'Manchester', value: 'Manchester, UK', parent: 'uk'},
    // {label: 'Birmingham', value: 'Birmingham, UK', parent: 'uk'},
    // {label: 'Liverpool', value: 'Liverpool, UK', parent: 'uk'},
    // {label: 'Leeds', value: 'Leeds, UK', parent: 'uk'},

    {label: 'Japan', value: 'Japan'},
    // {label: 'Tokyo', value: 'Tokyo, Japan', parent: 'jp'},
    // {label: 'Osaka', value: 'Osaka, Japan', parent: 'jp'},
    // {label: 'Nagoya', value: 'Nagoya, Japan', parent: 'jp'},
    // {label: 'Sapporo', value: 'Sapporo, Japan', parent: 'jp'},
    // {label: 'Fukuoka', value: 'Fukuoka, Japan', parent: 'jp'},

    {label: 'Canada', value: 'Canada'},
    // {label: 'Toronto', value: 'Toronto, Canada', parent: 'ca'},
    // {label: 'Montreal', value: 'Montreal, Canada', parent: 'ca'},
    // {label: 'Vancouver', value: 'Vancouver, Canada', parent: 'ca'},
    // {label: 'Calgary', value: 'Calgary, Canada', parent: 'ca'},
    // {label: 'Ottawa', value: 'Ottawa, Canada', parent: 'ca'},

    {label: 'India', value: 'India'},
    // {label: 'Mumbai', value: 'Mumbai, India', parent: 'in'},
    // {label: 'Delhi', value: 'Delhi, India', parent: 'in'},
    // {label: 'Bangalore', value: 'Bangalore, India', parent: 'in'},
    // {label: 'Hyderabad', value: 'Hyderabad, India', parent: 'in'},
    // {label: 'Chennai', value: 'Chennai, India', parent: 'in'},

    {label: 'France', value: 'France'},
    // {label: 'Paris', value: 'Paris, France', parent: 'fr'},
    // {label: 'Marseille', value: 'Marseille, France', parent: 'fr'},
    // {label: 'Lyon', value: 'Lyon, France', parent: 'fr'},
    // {label: 'Toulouse', value: 'Toulouse, France', parent: 'fr'},
    // {label: 'Nice', value: 'Nice, France', parent: 'fr'},

    {label: 'Brazil', value: 'Brazil'},
    // {label: 'São Paulo', value: 'São Paulo, Brazil', parent: 'br'},
    // {label: 'Rio de Janeiro', value: 'Rio de Janeiro, Brazil', parent: 'br'},
    // {label: 'Brasília', value: 'Brasília, Brazil', parent: 'br'},
    // {label: 'Salvador', value: 'Salvador, Brazil', parent: 'br'},
    // {label: 'Fortaleza', value: 'Fortaleza, Brazil', parent: 'br'},

    {label: 'Germany', value: 'Germany'},
    // {label: 'Berlin', value: 'Berlin, Germany', parent: 'de'},
    // {label: 'Hamburg', value: 'Hamburg, Germany', parent: 'de'},
    // {label: 'Munich', value: 'Munich, Germany', parent: 'de'},
    // {label: 'Cologne', value: 'Cologne, Germany', parent: 'de'},
    // {label: 'Frankfurt', value: 'Frankfurt, Germany', parent: 'de'},

    {label: 'Spain', value: 'Spain'},
    // {label: 'Madrid', value: 'Madrid, Spain', parent: 'es'},
    // {label: 'Barcelona', value: 'Barcelona, Spain', parent: 'es'},
    // {label: 'Valencia', value: 'Valencia, Spain', parent: 'es'},
    // {label: 'Seville', value: 'Seville, Spain', parent: 'es'},
    // {label: 'Zaragoza', value: 'Zaragoza, Spain', parent: 'es'},
  ]);
  // const emailAddressOfCurrentUser = route.params.userEmail;

  // const [singleFile, setSingleFile] = useState();
  const [singleFile, setSingleFile] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setfileName] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const storeData = useSelector(state => state);
  const dispatch = useDispatch();
  const [job, setJob] = useState(route.params.job);

  // for loader
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [pointerEvent, setPointerEvent] = useState('auto');
  const [opacity, setOpacity] = useState(1);
  const [indicator, setIndicator] = useState(true);
  const [enabledScroll, setEnabledScroll] = useState(true);

  const showToast = heading => {
    Toast.show({
      type: 'error',
      text1: heading,
      // text2: text,
    });
  };

  const applySubmitted = async () => {
    if (!message) {
      // showToast('Please fill First Name');
      Alert.alert('Empty Field', 'Please do not leave the message field empty');
      showToast('Please fill message body');
    } else if (message.length > 50) {
      // Display an error message if the input is too long
      Alert.alert(
        'Exceeded Length',
        'Message is too long. Maximum length is 50 characters.',
      );
      showToast('Message is too long. Maximum length is 50 characters.');
    } else if (!value) {
      // Display an error message if the dropdown value is empty
      Alert.alert('Empty Field', 'Please select a country');
    } else if (!uploaded) {
      // Display an error message if the resume file is not uploaded
      Alert.alert('Resume Not Uploaded', 'Please upload a resume file');
    } else {
      // setFlag(true);

      sendEmail();
    }
  };

  useEffect(() => {
    if (indicator) {
      setSpinnerLoader(false);
      setPointerEvent('auto');
      setOpacity(1);
      setEnabledScroll(true);
    } else {
      setSpinnerLoader(true);
      setPointerEvent('none');
      setOpacity(0.8);
      setEnabledScroll(false);
    }
  }, [indicator]);
  const sendEmail = async () => {
    setIndicator(false);
    // var path = RNFS.DownloadDirectoryPath + '/test.pdf';
    var path = RNFS.ExternalDirectoryPath + '/test.pdf';
    // write the file

    console.log('EMAIL ', job.jobEmail);
    console.log('store ', storeData);

    RNFS.copyFile(singleFile, path)
      .then(success => {
        console.log('worksss!');
        console.log(job.jobEmail);
        console.log('check route', {job});
      })
      .catch(err => {
        console.log('error');
        console.log(err.message);
      });
    RNSmtpMailer.sendMail({
      mailhost: 'smtp.gmail.com',
      port: '465',
      ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
      username: 'bashfyp@gmail.com',
      password: 'ltdapqlallccrgss',
      // password: 'adjofwuxqsyqetmw',
      // fromName: 'Some Name', // optional
      // replyTo: 'usernameEmail', // optional
      // recipients: 'habibafaisal8@gmail.com',
      recipients: job.jobEmail,

      // bcc: ['bccEmail1', 'bccEmail2'], // optional
      // bcc: ['shahzaibnn@gmail.com'], // optional
      bcc: [storeData.userEmail], // optional
      subject: 'For the post of ' + job.jobTitle,
      // htmlBody:
      //   'Respected ' +
      //   job.jobPostedBy +
      //   ',<p>I hope this email finds you well. I am reaching out to express my interest in the <b>' +
      //   job.jobTitle +
      //   '</b> role at <b>' +
      //   job.jobCompany +
      //   '</b>' +
      //   ' that I found on BASH Application.</p><p>I am confident that my skills and experiences align well with the requirements of the role.' +
      //   'I have attached my updated CV for your review.</p><p>My skills match the criteria of your job requirements. I am eager to bring my expertise and contribute to the success of <b>' +
      //   job.jobCompany +
      //   '</b>.</p>' +
      //   '<p>Thank you for considering my application. I look forward to the opportunity to discuss my qualifications further.' +
      //   'My contact email is ' +
      //   storeData.userEmail +
      //   '</p><p>Best regards,<br>' +
      //   storeData.firstName +
      //   ' ' +
      //   storeData.lastName +
      //   '</p>',

      htmlBody:
        '  <label><b>First Name:' +
        storeData.firstName +
        '</label>' +
        '  <label><b>Last Name:' +
        storeData.lastName +
        '</label>' +
        '  <label><b>Message:' +
        message +
        '</label>' +
        '  <label><b>Country:' +
        value +
        '</label>' +
        '  <label><b>Email:' +
        storeData.userEmail +
        '</label>',
      attachmentPaths: [path],
      attachmentNames: ['CV.pdf'],
    })
      .then(success => {
        addJobToProfile();
      })
      .catch(error => {
        setIndicator(true);
        console.error('error', error);
        alert('Applying Failed!\nPlease Check Your Internet Connection');
      });
  };

  async function addJobToProfile() {
    dbFirestore()
      .collection('Users')
      // .doc('roles')
      // .collection(value.toLowerCase())
      .where('userEmail', '==', storeData.userEmail)
      // .where('userEmail', '==', 'bashfyp@gmail.com')
      .get()
      .then(querySnapshot => {
        console.log('Total Found users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.id);
          let appliedJobss = [
            {
              ...job,
              // jobId: job.id,
              // jobTitle: job.jobTitle,
              // jobCompany: job.jobCompany,
              // jobMode: job.jobMode,
              // jobEmail: job.jobEmail,
              // jobSalary: job.jobSalary,
              dateApplied: dbFirestore.Timestamp.now(),
              // dateApplied: dbFirestore.Timestamp.now().toDate(),
            },
          ];

          dbFirestore()
            .doc('Users/' + documentSnapshot.id)
            .update({
              appliedJobId: dbFirestore.FieldValue.arrayUnion(...appliedJobss),
            })
            .then(() => {
              alert('Applied Successfully');
              console.log('Added in firestore');
              dispatch(addAppliedJob(job));
              setIndicator(true);
              navigation.goBack();
            })
            .catch(err => {
              console.log('not working');
              setIndicator(true);
            });
        });
      })
      .catch(error => {
        alert(error);

        setIndicator(true);
      });
  }

  const selectFile = async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.pdf,
      });

      console.log(results.uri);
      console.log(results.name);

      setSingleFile(results.uri);
      setfileName(results.name);
      setUploaded(true);
    } catch (err) {
      console.log('Some Error!!!');
    }
  };
  console.log('Saved value is: ', singleFile);
  return (
    // <View style={styles.bg}>
    <ScrollView
      scrollEnabled={enabledScroll}
      showsVerticalScrollIndicator={false}
      style={styles.SectionStyle}>
      <View
        pointerEvents={pointerEvent}
        style={{
          backgroundColor: '#E5E3E4',
          flex: 1,
          // height: 1000,
          borderRadius: 12,
          marginTop: 15,
          marginLeft: 25,
          marginRight: 25,
          margin: 10,
          opacity: opacity,
        }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: '5%',
            marginVertical: '2%',
            // justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{flex: 1}}>
            <Entypo name="circle-with-cross" size={26} color="#777777" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 35,
              color: '#5BA199',
              fontWeight: 'bold',
              textAlign: 'center',
              // marginLeft: '3%',
              flex: 4,
              // marginHorizontal: Dimensions.get('window').width / 5,
              // marginEnd: '30%',
              // marginHorizontal: '25%',  },
            }}>
            Applied Jobs
          </Text>
          <View style={{flex: 1}} />
        </View>
        {/* Form */}
        <View style={styles.ExpBoxView}>
          <Text style={styles.text}>First Name</Text>
          <Text style={styles.lastNameStyle}>Last Name</Text>
        </View>
        <View style={styles.ExpBoxView}>
          <TextInput
            style={styles.inputStyle}
            // onChangeText={name => setName(name)}
            placeholder="First Name"
            placeholderTextColor="#6A6A6A"
            blurOnSubmit={false}
            value={storeData.firstName}
            editable={false}
          />
          <View style={{flex: 0.1}}></View>
          <TextInput
            style={styles.inputStyle}
            // onChangeText={lastName => setLastName(lastName)}
            placeholder="Last Name"
            placeholderTextColor="#6A6A6A"
            blurOnSubmit={false}
            value={storeData.lastName}
            editable={false}
          />
        </View>
        <View style={styles.ExpBoxView}>
          <Text style={styles.text}>Email</Text>
        </View>
        <View style={styles.ExpBoxView}>
          <TextInput
            style={styles.inputStyle}
            value={storeData.userEmail}
            // onChangeText={userEmail => setUserEmail(userEmail)}
            placeholder="Email"
            placeholderTextColor="#6A6A6A"
            blurOnSubmit={false}
            editable={false}
          />
        </View>
        {/* Dropdown Menu */}
        <View>
          <View style={styles.ExpBoxView}>
            <Text style={styles.text}>Country</Text>
          </View>

          <DropDownPicker
            listMode="SCROLLVIEW"
            open={open}
            categorySelectable={true}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select country"
            placeholderStyle={{color: '#777777'}}
            searchable={true}
            addCustomItem={true}
            mode="BADGE"
            badgeDotColors={['#469597']}
            theme="LIGHT"
            // containerStyle={{marginTop: 40}}

            style={{
              marginVertical: '5%',
              backgroundColor: 'white',
              borderWidth: 0,
              borderRadius: 16,
              borderWidth: 1.5,
              borderColor: '#469597',
              // zIndex: 1000,
            }}
            textStyle={{color: '#5BA199', fontSize: 14}}
            dropDownContainerStyle={{
              // backgroundColor: '#469597',
              backgroundColor: 'white',
              borderWidth: 0,
              marginTop: 10,
              borderRadius: 16,
              zIndex: 10000,
              borderWidth: 1.5,
              borderColor: '#469597',
            }}
            searchTextInputStyle={{borderWidth: 1.5, borderColor: '#469597'}}
            //   labelStyle={{color: 'white'}}
            // listItemLabelStyle={{color: 'white', fontWeight: 'bold'}}
            listItemLabelStyle={{color: '#6A6A6A'}}
          />
        </View>
        {/*  */}
        {/* Message Input Field */}
        <View style={styles.ExpBoxView}>
          <Text style={styles.text}>Message</Text>
          {/* <Text style={styles.lengthText}>{messageLength}/50</Text> */}
          <Text
            style={[styles.lengthText, messageLength >= 50 && {color: 'red'}]}>
            {messageLength}/50
          </Text>
        </View>
        {/* <View style={styles.messageBodyStyle}>
          <TextInput
            // style={styles.messageStyle}
            // style={[styles.messageStyle, messageLength >= 50 && {color: 'red'}]}
            style={styles.messageStyle}
            onChangeText={message => {
              setMessage(message);
              setMessageLength(message.length);
              // setErrorMessage('');
            }}
            multiline={true}
            value={message}
            // textAlignVertical={true}
            placeholder="What sets you different from others?"
            placeholderTextColor="#777777"
            blurOnSubmit={false}
            // maxLength={50}
          />
        </View> */}

        <View
          style={{
            marginVertical: '5%',
            height: Dimensions.get('window').height * 0.2,
            backgroundColor: '#ffffff',
            // marginLeft: 25,
            // marginRight: 25,
            // margin: 10,
            borderRadius: 16,
            borderWidth: 1.5,
            borderColor: '#469597',
          }}>
          <TextInput
            style={{marginHorizontal: '5%', fontSize: 14, fontStyle: 'italic'}}
            onChangeText={message => {
              setMessage(message);
              setMessageLength(message.length);
              // setErrorMessage('');
            }}
            multiline={true}
            value={message}
            placeholder="What Sets You Different From Others?"
            placeholderTextColor={'#777777'}
          />
        </View>

        <Text style={styles.text}>CV</Text>

        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5%',
          }}>
          {uploaded ? (
            <View>
              <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate('PDFView', {
              //     pdfUrl: storeData.resumeUrl,
              //   })
              // }
              >
                <MaterialCommunityIcons
                  name="file-pdf-box"
                  size={60}
                  color="red"
                  style={{
                    // alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                />

                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    fontWeight: '600',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  {fileName}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setUploaded(false);
                }}
                style={{alignSelf: 'center', marginTop: '2%'}}>
                <Entypo name="circle-with-cross" color={'#777777'} size={20} />
              </TouchableOpacity>
            </View>
          ) : null}

          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#469597',
              borderRadius: 12,
              marginTop: '3%',
              height: 30,
              width: 150,
              // marginBottom: 25,
            }}
            onPress={() => selectFile()}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 15,
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
              }}>
              Upload CV
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
                style={styles.UploadBtn}
                onPress={() => addtoDB()}>
                <Text style={styles.UploadText}>Upload CV</Text>
              </TouchableOpacity> */}
        </View>

        {/* Apply Now Button */}

        <TouchableOpacity
          style={styles.buttonStyle}
          // activeOpacity={0.5}
          // onPress={sendEmail}>
          onPress={() => {
            applySubmitted();
          }}>
          <Text style={styles.buttonTextStyle}>Apply</Text>
        </TouchableOpacity>
        {/* <Image source={{uri: source}} /> */}
      </View>
      {spinnerLoader ? (
        <Chase
          style={{
            position: 'absolute',
            // top: Dimensions.get('window').height * 0.5,
            left: Dimensions.get('window').width * 0.4,
            bottom: Dimensions.get('window').height * 0.5,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          size={Dimensions.get('window').width * 0.2}
          color="#5BA199"
        />
      ) : null}

      {/* testing upload */}

      {/* <Toast topOffset={30} /> */}
    </ScrollView>
    /*  </View> */
  );
};

export default ApplyToJob;

const styles = StyleSheet.create({
  gridStyle: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.5,
    left: Dimensions.get('window').width * 0.4,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    color: '#5BA199',
    paddingLeft: 20,
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
    color: '#5BA199',
    paddingLeft: 10,
    paddingRight: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#469597',
  },
  inputStyle2: {
    flex: 1,
    backgroundColor: 'white',
    color: '#5BA199',
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
  lengthText: {
    fontSize: 12,
    color: '#6A6A6A',
    // paddingBottom: 5,
    paddingTop: 25,
    marginLeft: '25%',
  },

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
  // dropdownContainer: {
  //   backgroundColor: 'white',
  //   margin: 10,
  //   borderWidth: 0.5,
  //   borderColor: 'white',
  //   borderRadius: 20,
  //   height: 50,
  //   width: 300,
  //   justifyContent: 'center',
  //   textAlign: 'center',
  //   alignSelf: 'center',
  // },

  dropdownContainer: {
    // backgroundColor: '#F5F5F5',
    backgroundColor: 'white',
    color: '#6A6A6A',

    borderWidth: 1,
    // borderColor: '#707070',
    borderColor: '#F5F5F5',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    // fontSize: 12,
  },
  dropdownText: {
    fontSize: 14,
    // color: '#707070',
    color: '#6A6A6A',
  },
  dropdownWrapper: {
    // borderColor: '#F5F5F5',
    width: '100%',
    height: 50,
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
