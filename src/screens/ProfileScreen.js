import React, {Component, useState} from 'react';
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
  TextInput,
} from 'react-native';
import {user, jobs, posts} from '../model/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  // const data = posts();
  return (
    <ScrollView>
      {/* back button with 3 dots button */}
      <ImageBackground
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/BCumberbatch_Comic-Con_2019.jpg/220px-BCumberbatch_Comic-Con_2019.jpg',
        }}
        style={styles.header}
      />
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{user[0].username}</Text>
            <View>
              <Text style={styles.info}>{user[0].education}</Text>
            </View>
            <View style={styles.skills}>
              <TouchableOpacity style={styles.skillsBox}>
                <Text style={styles.skillsText}>Add Skills +</Text>
              </TouchableOpacity>
            </View>
            {/* Skills here */}
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={user}
              style={styles.skills}
              renderItem={({item}) => (
                <View style={styles.skillsFlatlist}>
                  <TouchableOpacity style={styles.skillsListBox}>
                    <Text style={styles.skillsText}>{item.skills[0]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.skillsListBox}>
                    <Text style={styles.skillsText}>{item.skills[1]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.skillsListBox}>
                    <Text style={styles.skillsText}>{item.skills[2]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.skillsListBox}>
                    <Text style={styles.skillsText}>{item.skills[3]}</Text>
                  </TouchableOpacity>
                  {/* profile description */}
                </View>
              )}
              keyExtractor={item => item.id}
            />
            <View style={styles.editExpView}>
              <TouchableOpacity style={styles.skillsBox}>
                <Text style={styles.skillsText}>Edit Description</Text>
              </TouchableOpacity>

              <Text style={styles.description}>{user[0].description}</Text>
              {/* add cv button here */}
              <View style={styles.UploadCV}>
                <TouchableOpacity>
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
                </TouchableOpacity>
                <Text style={styles.resumeText}>{user[0].cvFile}</Text>
                <TouchableOpacity style={styles.UploadBtn}>
                  <Text style={styles.UploadText}>Upload CV</Text>
                </TouchableOpacity>
              </View>
              {/* cv file display */}

              {/* experience - edit experience */}
              {/* <View> */}
              <View style={styles.expView}>
                <Text style={styles.expText1}>Experience</Text>
                {/* place edit experience at right */}
                <View style={styles.editExpView}>
                  <TouchableOpacity style={styles.expBtn}>
                    <Text style={styles.expText2}>Edit Experience</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* </View> */}

              {/* posts */}
            </View>
          </View>
          <View style={styles.ExpbodyContent}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={user}
              renderItem={({item}) => (
                <View
                  style={{
                    backgroundColor: 'rgba(187, 198, 200, 0.5)',
                    borderRadius: 16,
                    marginLeft: Dimensions.get('window').width * 0.02,
                    height: Dimensions.get('window').height * 0.12,
                    width: Dimensions.get('window').width * 0.9,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 16,
                        marginTop: 15,
                        marginLeft: 10,
                      }}
                      source={{
                        uri: item.pic,
                      }}
                    />

                    <View
                      style={{
                        marginLeft: Dimensions.get('window').width * 0.03,
                      }}>
                      <Text style={styles.designationStyle}>
                        {item.designation}
                      </Text>
                      <Text>{item.timePeriod}</Text>
                      <View style={styles.ExpBoxView}>
                        <Text>{item.company}</Text>
                        <Text style={styles.ExpLocation}>{item.location}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={styles.ExpbodyContent}>{/* post content here */}</View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
  },
  container: {
    borderRadius: 35,
    borderColor: 'black',
    borderWidth: 3,
    marginTop: -35,
    backgroundColor: '#E5E3E4',
  },
  resumeText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  skillsList: {
    flexDirection: 'row',
  },
  ExpBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  designationStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: Dimensions.get('window').height * 0.006,
    color: '#000000',
    marginTop: 12,
  },
  ExpLocation: {
    textAlign: 'right',
    fontStyle: 'italic',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  skills: {
    alignSelf: 'flex-end',
  },
  UploadCV: {
    alignSelf: 'center',
  },
  header: {
    backgroundColor: '#E5E3E4',
    height: 400,
    resizeMode: 'cover',
    // marginTop: -20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 5,
    // borderRadius: 15,
    // borderColor: 'red',
    // borderWidth: 4,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 30,
  },
  ExpbodyContent: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 10,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
    marginTop: 5,
  },
  info: {
    fontSize: 16,
    color: '#469597',
    marginTop: 10,
  },
  description: {
    // backgroundColor: '#FFFFFF',
    // borderRadius: 10,
    // padding: 10,
    marginTop: 10,
  },
  skillsBtn: {
    backgroundColor: '#469597',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 20,
  },
  skillsFlatlist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').width * 0.05,
    marginVertical: Dimensions.get('window').height * 0.02,
  },
  skillsBox: {
    backgroundColor: '#469597',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 120,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 20,
  },
  skillsListBox: {
    backgroundColor: '#469597',
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    height: 25,
    width: 80,
    marginRight: 5,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 20,
    paddingRight: 15,
  },
  skillsText: {
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    fontSize: 14,
  },
  UploadBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#469597',
    borderRadius: 12,
    marginTop: 25,
    height: 30,
    width: 150,
    marginBottom: 25,
  },
  UploadText: {
    color: '#FFFFFF',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    /* Not doing anything. */
    // flex: 1,
  },
  editExpView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1,
  },
  expText1: {
    color: 'black',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  expText2: {
    color: 'white',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    backgroundColor: '#469597',
    width: 150,
    height: 35,
    borderRadius: 12,
  },
});
