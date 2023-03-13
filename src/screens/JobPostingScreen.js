import React, {Component, useEffect, useState, useRef} from 'react';
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
import Toast from 'react-native-toast-message';

// import {SliderBox} from 'react-native-image-slider-box';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageModal from 'react-native-image-modal';
import {db, dbFirestore} from '../Firebase/Config';

import DocumentPicker, {types} from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

import {addJob} from '../store/action';
import {useSelector, useDispatch} from 'react-redux';

import {Chase} from 'react-native-animated-spinkit';
import MultiSelect from 'react-native-multiple-select';

export default function JobPostingScreen() {
  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [pointerEvent, setPointerEvent] = useState('auto');
  const [opacity, setOpacity] = useState(1);
  const [indicator, setIndicator] = useState(true);
  const [enabledScroll, setEnabledScroll] = useState(true);

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
    {label: 'UK', value: 'uk'},
    {label: 'France', value: 'france'},
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
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [salaryLength, setSalaryLength] = useState(0);
  const [companyNameLength, setCompanyNameLength] = useState(0);
  const [nameLength, setNameLength] = useState(0);
  const [cityLength, setCityLength] = useState(0);
  const [titleLength, setTitleLength] = useState(0);
  const [newItem, setNewItem] = useState('');

  const storeData = useSelector(state => state);
  const dispatch = useDispatch();

  const [skillsList, setSkillsList] = useState([
    {
      label: 'React-Native',
      value: 'React-native',
    },
    {
      label: 'React',
      value: 'React',
    },
    {
      label: 'Javascript',
      value: 'Javascript',
    },
    {
      label: 'Java',
      value: 'Java',
    },
    {
      label: 'Databases',
      value: 'Databases',
    },
    {
      label: 'C',
      value: 'C',
    },
    {
      label: 'Python',
      value: 'Python',
    },
    {
      label: 'Swift',
      value: 'Swift',
    },
    {
      label: 'PHP',
      value: 'PHP',
    },
    {
      label: 'Ruby',
      value: 'Ruby',
    },
    {
      label: 'HTML',
      value: 'HTML',
    },
    {
      label: 'CSS',
      value: 'CSS',
    },
    {
      label: 'TypeScript',
      value: 'TypeScript',
    },
    {
      label: 'Angular',
      value: 'Angular',
    },
    {
      label: 'Vue',
      value: 'Vue',
    },
    {
      label: 'jQuery',
      value: 'jQuery',
    },
    {
      label: 'Node.js',
      value: 'Node.js',
    },
    {
      label: 'Express.js',
      value: 'Express.js',
    },
    {
      label: 'MongoDB',
      value: 'MongoDB',
    },
    {
      label: 'SQL',
      value: 'SQL',
    },
    {
      label: 'Git',
      value: 'Git',
    },
    {
      label: 'AWS',
      value: 'AWS',
    },
    {
      label: 'Azure',
      value: 'Azure',
    },
    {
      label: 'Firebase',
      value: 'Firebase',
    },
    {
      label: 'Heroku',
      value: 'Heroku',
    },
    {
      label: 'Docker',
      value: 'Docker',
    },
    {
      label: 'Project Management',
      value: 'Project-Management',
    },
    {
      label: 'Leadership',
      value: 'Leadership',
    },
    {
      label: 'Marketing',
      value: 'Marketing',
    },
    {
      label: 'Social Media Management',
      value: 'Social-Media-Management',
    },
    {
      label: 'Search Engine Optimization (SEO)',
      value: 'SEO',
    },
    {
      label: 'Human Resource Management',
      value: 'Human-Resource-Management',
    },
    {
      label: 'Business Analytics',
      value: 'Business-Analytics',
    },
    {
      label: 'Financial Management',
      value: 'Financial-Management',
    },
    {
      label: 'Copywriting',
      value: 'Copywriting',
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  const [skillOpen, setSkillOpen] = useState(false);
  // const [skillsList, setSkillsList] = useState([]);
  const multiSelect = useRef(null);

  const onSelectedItemsChange = items => {
    setSelectedItems(items);
    // setSelectedItems(items.map(item => item.id));
  };

  const getSelectedItemsExt = items =>
    items.map(
      item => skillsList.find(skill => skill.id === item)?.name || item,
    );
  const addNewSkill = newSkill => {
    console.log('adding new skill', newSkill);
    const newItemId = selectedItems.length + 1;
    setSkillsList([...skillsList, {id: newItemId, name: newSkill}]);
  };

  const onSubmit = () => {
    // Check if the last item in selectedItems is a new skill
    const newSkill = selectedItems[selectedItems.length - 1];
    if (newSkill && !skillsList.find(skill => skill.id === newSkill)) {
      addNewSkill(newSkill);
    }
    // const newSelectedItems = selectedItems.map(skill => skill.name);
    setSelectedItems([]);
  };

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

  const showToast = heading => {
    Toast.show({
      type: 'error',
      text1: heading,
      // text2: text,
    });
  };

  // const handleAddItem = newItem => {
  //   const existingSkill = skillsList.find(
  //     skill => skill.name.toLowerCase() == newItem,
  //   );

  //   if (existingSkill) {
  //     const newItems = [...selectedItems, existingSkill];
  //     setSelectedItems(newItems);
  //     console.log(' exist', newItems);
  //   } else {
  //     const newItemId = selectedItems.length + 1;
  //     // const newItems = [...selectedItems, {id: newItemId, name: newItem}];
  //     const newSkill = {id: newItemId, name: newItem};
  //     const newItems = [...selectedItems, newSkill];
  //     const newSkillsList = [...selectedSkills, newSkills];
  //     setSelectedItems(newItems);
  //     setSelectedSkills(newSkillsList);
  //     console.log('doesnt exist', newItems);
  //     console.log('new adding', newSkillsList);
  //   }
  // };

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      const newItemId = selectedItems.length + 1;
      const newSkill = {id: newItemId, name: newItem};
      const newSkillsList = [...selectedSkills, newSkill];
      setSkillsList(newSkillsList);
      setNewItem('');
    }
  };

  // const onSubmit = () => {
  //   // Check if the last item in selectedItems is a new skill
  //   const newSkill = selectedItems[selectedItems.length - 1];
  //   if (newSkill && !skillsList.find(skill => skill.id === newSkill)) {
  //     addNewSkill(newSkill);
  //   }
  //   setSelectedItems([]);
  // };

  const handleSubmit = () => {
    if (!title) {
      Alert.alert('Empty Field', 'Please enter a job title.');
    } else if (!value) {
      Alert.alert('Empty Field', 'Please select a country.');
    } else if (!city) {
      Alert.alert('Empty Field', 'Please enter a city.');
    } else if (!email) {
      Alert.alert('Empty Field', 'Please enter a email.');
    } else if (!singleFile) {
      Alert.alert('Empty Field', 'Please upload an image.');
    } else if (!name) {
      Alert.alert('Empty Field', 'Please enter a name.');
    } else if (!value2) {
      Alert.alert('Empty Field', 'Please select a job mode.');
    } else if (!description) {
      Alert.alert('Empty Field', 'Please select a job description.');
    } else if (!salary) {
      Alert.alert('Empty Field', 'Please select a job salary.');
    } else if (!company) {
      Alert.alert('Empty Field', 'Please select a job company.');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email.');
    } else if (!/^[0-9]*\.?[0-9]+$/.test(salary)) {
      Alert.alert('Invalid Salary Value', 'Please enter a valid salary value.');
    } else if (description.length > 50) {
      // Display an error message if the input is too long
      Alert.alert(
        'Exceeded Length',
        'Message is too long. Maximum length is 50 characters.',
      );
      showToast('Message is too long. Maximum length is 50 characters.');
    } else if (name.length > 15) {
      // Display an error message if the input is too long
      Alert.alert(
        'Exceeded Length',
        'Name is too long. Maximum length is 15 characters.',
      );
      // showToast('Message is too long. Maximum length is 50 characters.');
    } else if (city.length > 15) {
      // Display an error message if the input is too long
      Alert.alert(
        'Exceeded Length',
        'City is too long. Maximum length is 15 characters.',
      );
      // showToast('Message is too long. Maximum length is 50 characters.');
    } else if (company.length > 15) {
      // Display an error message if the input is too long
      Alert.alert(
        'Exceeded Length',
        'Company is too long. Maximum length is 15 characters.',
      );
      // showToast('Message is too long. Maximum length is 50 characters.');
    } else if (title.length > 15) {
      // Display an error message if the input is too long
      Alert.alert(
        'Exceeded Length',
        'Title is too long. Maximum length is 15 characters.',
      );
      // showToast('Message is too long. Maximum length is 50 characters.');
    } else {
      addtoDB();
    }
  };
  const addtoDB = async () => {
    setIndicator(false);

    try {
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
          skills: selectedItems,
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
          // dispatch(addJob(jobRedux));
          setIndicator(true);
        });
    } catch (e) {
      setIndicator(true);

      console.error(e);
    }
    setUploading(false);

    setUploaded(false);
    setfilePath({});
    setSingleFile('');
    setTitle('');
    setValue('');
    setCity('');
    setName('');
    setEmail('');
    setCompany('');
    setValue2('');
    setSalary('');
    setDescription('');

    setTitleLength(0);
    setCityLength(0);
    setNameLength(0);
    setCompanyNameLength(0);
    setSalaryLength(0);
    setDescriptionLength(0);

    setSelectedItems([]);

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    );
    Alert.alert('Job uploaded!', 'You will receive the responses soon! ');
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
  return (
    <ScrollView
      style={{backgroundColor: '#E5E3E4', flex: 1}}
      scrollEnabled={enabledScroll}>
      <View pointerEvents={pointerEvent} style={{opacity: opacity}}>
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
          {/* <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          Job Title
        </Text> */}

          <View style={styles.ExpBoxView}>
            <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
              Job Title
            </Text>
            <Text
              style={[styles.lengthText, titleLength >= 15 && {color: 'red'}]}>
              {titleLength}/15
            </Text>
          </View>

          <View
            style={{
              marginVertical: '5%',
              // height: Dimensions.get('window').height * 0.25,
              backgroundColor: 'white',
              // marginHorizontal: '5%',
              borderRadius: 16,
            }}>
            <TextInput
              style={{marginHorizontal: '5%', fontSize: 14, color: '#5BA199'}}
              // multiline
              // onChangeText={setTitle}
              onChangeText={title => {
                setTitle(title);
                setTitleLength(title.length);
                // setErrorMessage('');
              }}
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
              backgroundColor: 'white',
              borderWidth: 0,
              borderRadius: 16,
            }}
            textStyle={{color: '#5BA199', fontSize: 14, marginHorizontal: '2%'}}
            dropDownContainerStyle={{
              // backgroundColor: '#469597',
              backgroundColor: 'white',
              borderWidth: 0,
              marginTop: 10,
              borderRadius: 30,
            }}
            //   labelStyle={{color: 'white'}}
            // listItemLabelStyle={{color: 'white', fontWeight: 'bold'}}
            listItemLabelStyle={{color: '#6A6A6A'}}
          />
        </View>

        <View style={{marginHorizontal: '5%'}}>
          {/* <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          City
        </Text> */}

          <View style={styles.ExpBoxView}>
            <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
              City
            </Text>
            <Text
              style={[styles.lengthText, cityLength >= 15 && {color: 'red'}]}>
              {cityLength}/15
            </Text>
          </View>

          <View
            style={{
              marginVertical: '5%',
              // height: Dimensions.get('window').height * 0.25,
              backgroundColor: 'white',
              // marginHorizontal: '5%',
              borderRadius: 16,
            }}>
            <TextInput
              style={{marginHorizontal: '5%', fontSize: 14, color: '#5BA199'}}
              // multiline
              // onChangeText={setCity}
              onChangeText={city => {
                setCity(city);
                setCityLength(city.length);
                // setErrorMessage('');
              }}
              value={city}
              placeholder="City name"
              placeholderTextColor={'#5BA199'}
            />
          </View>
        </View>

        <View style={{marginHorizontal: '5%'}}>
          {/* <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          Name
        </Text> */}
          <View style={styles.ExpBoxView}>
            <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
              Name
            </Text>
            <Text
              style={[styles.lengthText, nameLength >= 15 && {color: 'red'}]}>
              {nameLength}/15
            </Text>
          </View>

          <View
            style={{
              marginVertical: '5%',
              // height: Dimensions.get('window').height * 0.25,
              backgroundColor: 'white',
              // marginHorizontal: '5%',
              borderRadius: 16,
            }}>
            <TextInput
              style={{marginHorizontal: '5%', fontSize: 14, color: '#5BA199'}}
              // multiline
              // onChangeText={setName}
              onChangeText={name => {
                setName(name);
                setNameLength(name.length);
                // setErrorMessage('');
              }}
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
              backgroundColor: 'white',
              // marginHorizontal: '5%',
              borderRadius: 16,
            }}>
            <TextInput
              style={{marginHorizontal: '5%', fontSize: 14, color: '#5BA199'}}
              // multiline
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              placeholder="Email here..."
              placeholderTextColor={'#5BA199'}
            />
          </View>
        </View>

        <View style={{marginHorizontal: '5%'}}>
          {/* <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          Company Name
        </Text> */}

          <View style={styles.ExpBoxView}>
            <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
              Company Name
            </Text>
            <Text
              style={[
                styles.lengthText,
                companyNameLength >= 15 && {color: 'red'},
              ]}>
              {companyNameLength}/15
            </Text>
          </View>

          <View
            style={{
              marginVertical: '5%',
              // height: Dimensions.get('window').height * 0.25,
              backgroundColor: 'white',
              // marginHorizontal: '5%',
              borderRadius: 16,
            }}>
            <TextInput
              style={{marginHorizontal: '5%', fontSize: 14, color: '#5BA199'}}
              // multiline
              // onChangeText={setCompany}
              onChangeText={company => {
                setCompany(company);
                setCompanyNameLength(company.length);
                // setErrorMessage('');
              }}
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
              backgroundColor: 'white',
              borderWidth: 0,
              borderRadius: 16,
            }}
            textStyle={{color: '#5BA199', fontSize: 14, marginHorizontal: '2%'}}
            dropDownContainerStyle={{
              // backgroundColor: '#469597',
              backgroundColor: 'white',
              borderWidth: 0,
              marginTop: 10,
              borderRadius: 30,
            }}
            //   labelStyle={{color: 'white'}}
            // listItemLabelStyle={{color: 'white', fontWeight: 'bold'}}
            listItemLabelStyle={{color: '#6A6A6A'}}
          />
        </View>
        {/* testing for multi-select */}
        <View style={{marginHorizontal: '5%'}}>
          <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
            Skills
          </Text>
        </View>
        <View style={{marginHorizontal: '5%'}}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            multiple={true}
            min={0}
            max={5}
            open={skillOpen}
            value={selectedItems}
            items={skillsList}
            onChangeValue={console.log(value)}
            setOpen={setSkillOpen}
            setValue={setSelectedItems}
            setItems={setSkillsList}
            placeholder="Select relevant skills"
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
            }}
            textStyle={{color: '#5BA199', fontSize: 14}}
            dropDownContainerStyle={{
              // backgroundColor: '#469597',
              backgroundColor: 'white',
              borderWidth: 0,
              marginTop: 10,
              borderRadius: 30,
            }}
            //   labelStyle={{color: 'white'}}
            // listItemLabelStyle={{color: 'white', fontWeight: 'bold'}}
            listItemLabelStyle={{color: '#6A6A6A'}}
            // listItemContainer={{
            //   // height: 100,
            //   backgroundColor: 'red',
            // }}
          />
          {/* <Text>select skills</Text> */}
          {/* <MultiSelect
            // hideTags
            items={skillsList}
            // items={skillsList.map(item => ({value: item.id, label: item.name}))}
            uniqueKey="id"
            // displayKey="name"
            ref={multiSelect}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Select Skils"
            searchInputPlaceholderText="Search Items..."
            // single={true}
            // onChangeInput={text => console.log(text)}
            altFontFamily="ProximaNova-Light"
            // tagRemoveIconColor="#CCC"
            tagRemoveIconColor="black"
            tagBorderColor="#469597"
            tagTextColor="#469597"
            selectedItemTextColor="#469597"
            selectedItemIconColor="#469597"
            itemTextColor="#000"
            // displayKey="name"
            searchInputStyle={{color: '#CCC', textAlign: 'center'}}
            submitButtonColor="#469597"
            canAddItems={true} // fontSize={15}
            styleIndicator={
              {
                // color: '#469597',
                // paddingLeft: '-5%',
              }
            }
            // hideDropdown={true}
            styleDropdownMenu={{
              // marginTop: 10,
              // borderWidth: 1,
              // paddingLeft: '%',
              borderRadius: 300,
              borderColor: 'gray',
              borderRadius: 55,
              fontSize: 12,
              fontWeight: 'bold',
              alignContent: 'center',
              textAlign: 'center',

              // backgroundColor: 'white',
              // padding: 10,
            }}
            onChangeInput={text => setNewItem(text)}
            onSubmit={onSubmit}
            onAddItem={addNewSkill}
          />

          <View>{multiSelect.current?.getSelectedItemsExt(selectedItems)}</View> */}
          {/* <View>
            <Text>
              {JSON.stringify(
                multiSelect.current?.getSelectedItemsExt(selectedItems),
              )}
            </Text>
          </View> */}
        </View>

        {/* testing ends */}
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
          {/* <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
          Salary
        </Text> */}

          <View style={styles.ExpBoxView}>
            <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
              Salary
            </Text>
            <Text
              style={[styles.lengthText, salaryLength >= 15 && {color: 'red'}]}>
              {salaryLength}/15
            </Text>
          </View>

          <View
            style={{
              marginVertical: '5%',
              // height: Dimensions.get('window').height * 0.25,
              backgroundColor: 'white',
              // backgroundColor: '#BBC6C8',
              // marginHorizontal: '5%',
              borderRadius: 16,
            }}>
            <TextInput
              style={{marginHorizontal: '5%', fontSize: 14, color: '#5BA199'}}
              // multiline
              // onChangeText={setSalary}
              onChangeText={salary => {
                setSalary(salary);
                setSalaryLength(salary.length);
                // setErrorMessage('');
              }}
              value={salary}
              placeholder="Salary here..."
              placeholderTextColor={'#5BA199'}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={{marginHorizontal: '5%'}}>
          <View style={styles.ExpBoxView}>
            <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
              Job Description
            </Text>
            <Text
              style={[
                styles.lengthText,
                descriptionLength >= 50 && {color: 'red'},
              ]}>
              {descriptionLength}/50
            </Text>
          </View>

          <View
            style={{
              marginVertical: '5%',
              height: Dimensions.get('window').height * 0.25,
              backgroundColor: 'white',
              // marginHorizontal: '5%',
              borderRadius: 16,
            }}>
            <TextInput
              style={{marginHorizontal: '5%', fontSize: 14}}
              multiline={true}
              // onChangeText={setDescription}
              onChangeText={description => {
                setDescription(description);
                setDescriptionLength(description.length);
                // setErrorMessage('');
              }}
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
          onPress={() => handleSubmit()}>
          <Text
            style={{
              fontSize: 25,
              color: '#ffffff',
              fontWeight: 'bold',
            }}>
            Post Job
          </Text>
        </TouchableOpacity>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ExpBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 10,
  },
  lengthText: {
    fontSize: 12,
    color: '#6A6A6A',
    // paddingBottom: 5,
    // paddingTop: 8,
    paddingTop: '2%',
    // paddingLeft: '5%',
    // marginLeft: '25%',
  },
});
