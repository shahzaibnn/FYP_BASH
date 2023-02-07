import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DropDownPicker from 'react-native-dropdown-picker';

import {user, jobs, posts, experience} from '../model/data';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import DocumentPicker, {types} from 'react-native-document-picker';

import ImageModal from 'react-native-image-modal';

import {useSelector, useDispatch} from 'react-redux';
import {db, dbFirestore} from '../Firebase/Config';
import {changeUserProfile, addSkillRedux} from '../store/action';

export default function EditProfileScreen() {
  const storeData = useSelector(state => state);
  const dispatch = useDispatch();

  const [extraData, setExtraData] = useState(new Date());

  const [titleDisplay, setTitleDisplay] = useState(false);
  const [title, setTitle] = useState(storeData?.title);

  const [skillsDisplay, setSkillsDisplay] = useState(false);
  const [skills, setSkills] = useState(storeData?.skills);

  const [addSkill, setAddSkill] = useState('');

  const [descriptionDisplay, setDescriptionDisplay] = useState(false);
  const [description, setDescription] = useState(storeData?.description);

  const [experienceDisplay, setExperienceDisplay] = useState(false);
  const [experience, setExperience] = useState(storeData?.experience);

  const [experienceTitle, setExperienceTitle] = useState('');
  const [experienceDate, setExperienceDate] = useState('');
  const [experienceCompany, setExperienceCompany] = useState('');
  const [experienceLocation, setExperienceLocation] = useState('');

  const [appliedJobsDisplay, setAppliedJobsDisplay] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState(storeData?.applied);

  const [singleFile, setSingleFile] = useState();
  const [uploaded, setUploaded] = useState(false);

  const updateArray = value => {
    // console.log(field);
    console.log(value);
    console.log(storeData.userEmail);
    // var object = {};
    dbFirestore()
      .collection('Users')
      // .doc('roles')
      // .collection(value.toLowerCase())
      .where('userEmail', '==', storeData.userEmail)
      .get()
      .then(querySnapshot => {
        console.log('Total Found users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.id);
          dbFirestore()
            .doc('Users/' + documentSnapshot.id)
            .update({
              skills: dbFirestore.FieldValue.arrayUnion(value),
            })
            .then(() => {
              dispatch(addSkillRedux(value));
              alert('skill added!');
              setExtraData(new Date());

              console.log('skills updated');
            });
        });
      })
      .catch(error => {
        alert(error);

        // setFlag(true);
      });
  };

  const updateField = (field, value) => {
    console.log(field);
    console.log(value);
    console.log(storeData.userEmail);
    var object = {};
    dbFirestore()
      .collection('Users')
      // .doc('roles')
      // .collection(value.toLowerCase())
      .where('userEmail', '==', storeData.userEmail)
      .get()
      .then(querySnapshot => {
        console.log('Total Found users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.id);
          dbFirestore()
            .collection('Users')
            .doc(documentSnapshot.id)
            .update({
              [field]: value,
            })
            .then(() => {
              dispatch(changeUserProfile(field, value));

              alert('User updated');
              console.log('User updated!');
            });
        });
      })
      .catch(error => {
        alert(error);

        // setFlag(true);
      });
  };

  const selectFile = async () => {
    try {
      const results = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.images,
      });

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

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <ScrollView style={{backgroundColor: '#E5E3E4'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: '3%',
          marginVertical: '5%',
          //   justifyContent: 'center',
        }}>
        <TouchableOpacity style={{}} onPress={() => console.log(storeData)}>
          <Ionicons
            name="chevron-back-circle-sharp"
            size={35}
            color="#777777"
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 35,
            color: '#000000',
            fontWeight: 'bold',
            textAlign: 'center',
            marginLeft: '3%',
            // marginHorizontal: Dimensions.get('window').width / 5,
            // marginEnd: '30%',

            // marginHorizontal: '25%',
          }}>
          Profile
        </Text>
      </View>

      {/* Title */}

      <View
        style={{
          marginHorizontal: '5%',
          marginTop: '10%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#BBC6C8',
          //   borderRadius: 8,
          padding: '2%',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: titleDisplay ? 0 : 8,
          borderBottomRightRadius: titleDisplay ? 0 : 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons
            name="title"
            size={25}
            color="#777777"
            style={{marginLeft: '0%'}}
          />
          <Text style={{fontSize: 25, color: '#000000', marginLeft: 10}}>
            Title
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setTitleDisplay(!titleDisplay)}
          style={{marginRight: '2%'}}>
          <FontAwesome name="plus-circle" size={25} color="#777777" />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={!titleDisplay}>
        <View
          style={{
            marginHorizontal: '5%',
            backgroundColor: '#BBC6C8',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              // width: Dimensions.get('window').width * 0.8,
              marginHorizontal: '10%',
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              // marginBottom: '7%',
              marginVertical: '3%',
            }}>
            <TextInput
              style={{}}
              onChangeText={setTitle}
              value={title}
              //   placeholder=""
            />
          </View>

          <TouchableOpacity
            onPress={() => updateField('title', title)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#469597',
              alignSelf: 'center',
              paddingHorizontal: '12%',
              paddingVertical: '3%',
              borderRadius: 16,
              marginVertical: '5%',
            }}>
            <Text style={{color: '#ffffff', fontSize: 30, fontWeight: 'bold'}}>
              Confirm Change
            </Text>
          </TouchableOpacity>
        </View>
      </Collapsible>

      {/* Skills */}

      <View
        style={{
          marginHorizontal: '5%',
          marginTop: '10%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#BBC6C8',
          //   borderRadius: 8,
          padding: '2%',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: skillsDisplay ? 0 : 8,
          borderBottomRightRadius: skillsDisplay ? 0 : 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="shape-plus"
            size={25}
            color="#777777"
            style={{}}
          />
          <Text style={{fontSize: 25, color: '#000000', marginLeft: 10}}>
            Skills
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setSkillsDisplay(!skillsDisplay)}
          style={{marginRight: '2%'}}>
          <FontAwesome name="plus-circle" size={25} color="#777777" />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={!skillsDisplay}>
        <View
          style={{
            marginHorizontal: '5%',
            backgroundColor: '#BBC6C8',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            paddingHorizontal: '3%',
            // zIndex: 999,
            // marginBottom: '5%',
          }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // numColumns={4}
            key={'_'}
            data={skills}
            extraData={extraData}
            renderItem={({item}) => (
              <View
              // style={{marginStart: Dimensions.get('window').width * 0.03}}
              >
                <View
                  style={{
                    backgroundColor: '#469597',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    // justifyContent: 'space-evenly',
                    borderRadius: 24,
                    paddingHorizontal: Dimensions.get('window').width * 0.03,
                    paddingVertical: Dimensions.get('window').height * 0.02,
                    marginEnd: Dimensions.get('window').width * 0.03,
                    marginVertical: Dimensions.get('window').height * 0.02,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: 14,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginRight: Dimensions.get('window').width * 0.02,
                    }}>
                    {item}
                  </Text>

                  <TouchableOpacity
                    style={{marginTop: 5}}
                    onPress={() => {
                      console.log('Selected skill to be removed is : ', item);
                    }}>
                    <Entypo
                      name="circle-with-cross"
                      size={20}
                      color="#000000"
                    />
                  </TouchableOpacity>
                </View>

                {/* profile description */}
              </View>
            )}
            keyExtractor={item => item.id + '_'}
          />

          <View
            style={{
              backgroundColor: '#ffffff',
              // width: Dimensions.get('window').width * 0.8,
              marginHorizontal: '10%',
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              // marginBottom: '7%',
              marginVertical: '3%',
            }}>
            <TextInput
              style={{}}
              onChangeText={setAddSkill}
              value={addSkill}
              //   placeholder=""
            />
          </View>

          <TouchableOpacity
            onPress={() => updateArray(addSkill)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#469597',
              alignSelf: 'center',
              paddingHorizontal: '12%',
              paddingVertical: '3%',
              borderRadius: 16,
              marginVertical: '5%',
            }}>
            <Text style={{color: '#ffffff', fontSize: 30, fontWeight: 'bold'}}>
              Add Skill
            </Text>
          </TouchableOpacity>
        </View>
      </Collapsible>

      {/* Description */}

      <View
        style={{
          marginHorizontal: '5%',
          marginTop: '10%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#BBC6C8',
          //   borderRadius: 8,
          padding: '2%',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: descriptionDisplay ? 0 : 8,
          borderBottomRightRadius: descriptionDisplay ? 0 : 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialIcons
            name="description"
            size={25}
            color="#777777"
            style={{marginLeft: '0%'}}
          />
          <Text style={{fontSize: 25, color: '#000000', marginLeft: 10}}>
            Description
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setDescriptionDisplay(!descriptionDisplay)}
          style={{marginRight: '2%'}}>
          <FontAwesome name="plus-circle" size={25} color="#777777" />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={!descriptionDisplay}>
        <View
          style={{
            marginHorizontal: '5%',
            backgroundColor: '#BBC6C8',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              // width: Dimensions.get('window').width * 0.8,
              marginHorizontal: '10%',
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              // marginBottom: '7%',
              marginVertical: '3%',
            }}>
            <View
              style={{
                // marginVertical: '5%',
                // height: Dimensions.get('window').height * 0.25,
                backgroundColor: '#BBC6C8',
                // marginHorizontal: '5%',
                borderRadius: 16,
              }}>
              <TextInput
                style={{
                  // marginHorizontal: '5%',

                  fontSize: 18,
                }}
                multiline
                onChangeText={setDescription}
                value={description}
                placeholder="Write post here..."
                placeholderTextColor={'#5BA199'}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => updateField('description', description)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#469597',
              alignSelf: 'center',
              paddingHorizontal: '12%',
              paddingVertical: '3%',
              borderRadius: 16,
              marginVertical: '5%',
            }}>
            <Text style={{color: '#ffffff', fontSize: 30, fontWeight: 'bold'}}>
              Confirm Change
            </Text>
          </TouchableOpacity>
        </View>
      </Collapsible>

      {/* Experience */}

      <View
        style={{
          marginHorizontal: '5%',
          marginTop: '10%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#BBC6C8',
          //   borderRadius: 8,
          padding: '2%',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: experienceDisplay ? 0 : 8,
          borderBottomRightRadius: experienceDisplay ? 0 : 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome
            name="graduation-cap"
            size={25}
            color="#777777"
            style={{marginLeft: '0%'}}
          />
          <Text style={{fontSize: 25, color: '#000000', marginLeft: 10}}>
            Experience
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setExperienceDisplay(!experienceDisplay)}
          style={{marginRight: '2%'}}>
          <FontAwesome name="plus-circle" size={25} color="#777777" />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={!experienceDisplay}>
        <View
          style={{
            marginHorizontal: '5%',
            backgroundColor: '#BBC6C8',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={user[0].experience}
            renderItem={({item}) => (
              <View
                style={{
                  //   backgroundColor: 'rgba(187, 198, 200, 0.5)',
                  backgroundColor: '#ffffff',
                  borderRadius: 16,
                  marginHorizontal: Dimensions.get('window').width * 0.02,

                  // height: Dimensions.get('window').height * 0.12,
                  // width: Dimensions.get('window').width * 0.9,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: Dimensions.get('window').height * 0.015,
                    marginHorizontal: Dimensions.get('window').width * 0.03,
                  }}>
                  <Image
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 16,
                      // marginTop: 15,
                      // marginLeft: 10,
                    }}
                    source={{
                      uri: item.pic,
                    }}
                  />

                  <View
                    style={{
                      marginLeft: Dimensions.get('window').width * 0.03,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginVertical: Dimensions.get('window').height * 0.006,
                        color: '#000000',
                        // marginTop: 12,
                      }}>
                      {item.designation}
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>{item.timePeriod}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text style={{fontWeight: 'bold'}}>{item.company}</Text>
                      <Text style={{fontWeight: 'bold'}}> - </Text>
                      <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
                        {item.location}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={{marginLeft: 10}}
                    onPress={() => {
                      console.log(
                        'Selected skill to be removed is : ',
                        item.id,
                      );
                    }}>
                    <Entypo
                      name="circle-with-cross"
                      size={20}
                      color="#000000"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={item => item.id}
          />

          <View
            style={{
              backgroundColor: '#ffffff',
              // width: Dimensions.get('window').width * 0.8,
              marginHorizontal: '10%',
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              // marginBottom: '7%',
              marginVertical: '5%',
            }}>
            <TextInput
              style={{}}
              onChangeText={setExperienceTitle}
              value={experienceTitle}
              placeholder="Job Title"
            />
          </View>

          <View
            style={{
              backgroundColor: '#ffffff',
              // width: Dimensions.get('window').width * 0.8,
              marginHorizontal: '10%',
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              // marginBottom: '7%',
              marginVertical: '3%',
            }}>
            <TextInput
              style={{}}
              onChangeText={setExperienceDate}
              value={experienceDate}
              placeholder="Time Period"
            />
          </View>

          <View
            style={{
              backgroundColor: '#ffffff',
              // width: Dimensions.get('window').width * 0.8,
              marginHorizontal: '10%',
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              // marginBottom: '7%',
              marginVertical: '3%',
            }}>
            <TextInput
              style={{}}
              onChangeText={setExperienceCompany}
              value={experienceCompany}
              placeholder="Organization"
            />
          </View>

          <View
            style={{
              backgroundColor: '#ffffff',
              // width: Dimensions.get('window').width * 0.8,
              marginHorizontal: '10%',
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              // marginBottom: '7%',
              marginVertical: '3%',
            }}>
            <TextInput
              style={{}}
              onChangeText={setExperienceLocation}
              value={experienceLocation}
              placeholder="Location"
            />
          </View>
          {/* 
          <View style={{marginHorizontal: '5%'}}>
            <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 18}}>
              Related Picture
            </Text>
          </View> */}

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

          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#469597',
              alignSelf: 'center',
              paddingHorizontal: '12%',
              paddingVertical: '3%',
              borderRadius: 16,
              marginVertical: '5%',
            }}>
            <Text style={{color: '#ffffff', fontSize: 30, fontWeight: 'bold'}}>
              Add Experience
            </Text>
          </TouchableOpacity>
        </View>
      </Collapsible>

      {/* Applied Jobs */}

      <View
        style={{
          marginHorizontal: '5%',
          marginTop: '10%',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#BBC6C8',
          //   borderRadius: 8,
          padding: '2%',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: appliedJobsDisplay ? 0 : 8,
          borderBottomRightRadius: appliedJobsDisplay ? 0 : 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="book-education"
            size={25}
            color="#777777"
            style={{marginLeft: '0%'}}
          />
          <Text style={{fontSize: 25, color: '#000000', marginLeft: 10}}>
            Applied Jobs
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setAppliedJobsDisplay(!appliedJobsDisplay)}
          style={{marginRight: '2%'}}>
          <FontAwesome name="plus-circle" size={25} color="#777777" />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={!appliedJobsDisplay}>
        <View
          style={{
            marginHorizontal: '5%',
            backgroundColor: '#BBC6C8',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}>
          <View style={{}}>
            <FlatList
              // nestedScrollEnabled
              style={{marginVertical: '5%', marginHorizontal: '2%'}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={appliedJobs}
              renderItem={({item}) => (
                <View
                  style={{
                    backgroundColor: '#ffffff',
                    // padding: '3%',
                    borderRadius: 16,
                    // marginBottom: Dimensions.get('window').height * 0.1,

                    marginHorizontal: Dimensions.get('window').width * 0.01,
                    // elevation: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: Dimensions.get('window').height * 0.02,
                      marginHorizontal: Dimensions.get('window').width * 0.05,
                    }}>
                    <Image
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 16,
                        // marginLeft: Dimensions.get('window').width * 0.1,
                      }}
                      source={{
                        uri: item.postedByPic,
                      }}
                    />
                    <View
                      style={{
                        marginLeft: Dimensions.get('window').width * 0.03,
                      }}>
                      <Text style={{fontSize: 12}}>
                        {item.postedBy} posted a new job
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          marginVertical:
                            Dimensions.get('window').height * 0.005,
                          color: '#000000',
                        }}>
                        {item.title}
                      </Text>
                      <Text>{item.company}</Text>
                    </View>

                    {/* <TouchableOpacity>
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        size={25}
                        color="#000000"
                        style={{
                          marginLeft: Dimensions.get('window').width * 0.05,
                        }}
                      />
                    </TouchableOpacity> */}
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      //   justifyContent: 'space-between',
                      alignItems: 'center',
                      marginHorizontal: Dimensions.get('window').width * 0.05,
                      marginVertical: Dimensions.get('window').height * 0.01,
                    }}>
                    <TouchableOpacity
                      disabled
                      style={{
                        backgroundColor: '#5BA199',

                        paddingHorizontal: Dimensions.get('window').width * 0.1,
                        paddingVertical: Dimensions.get('window').height * 0.01,
                        borderRadius: 16,
                      }}>
                      <Text
                        style={{
                          color: '#ffffff',
                          fontWeight: 'bold',
                        }}>
                        Applied
                      </Text>
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: '#469597',
                        fontSize: 16,
                        marginLeft: Dimensions.get('window').width * 0.05,
                      }}>
                      {item.city},{item.country}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
            />

            {/* <Text>jhfvsdjvfjhvj</Text> */}
          </View>
        </View>
      </Collapsible>
    </ScrollView>
  );
}
