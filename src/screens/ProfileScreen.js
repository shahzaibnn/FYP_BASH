import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
const ProfileScreen = () => {
  return (
    <ScrollView>
      {/* back button with 3 dots button */}
      <ImageBackground
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/BCumberbatch_Comic-Con_2019.jpg/220px-BCumberbatch_Comic-Con_2019.jpg',
        }}
        style={styles.header}
      />
      {/* <Image
          style={styles.avatar}
          source={{
            uri: 'https://wallpaperaccess.com/full/317501.jpg',
          }}
        /> */}
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>Benedict Cumberbatch</Text>
            <View>
              <Text style={styles.info}>BS CS Student</Text>
            </View>
            <View style={styles.skills}>
              <TouchableOpacity style={styles.skillsBox}>
                <Text style={styles.skillsText}>Add Skills +</Text>
              </TouchableOpacity>
            </View>
            {/* Skills here */}
            <ScrollView horizontal={true} style={styles.skillsList}>
              <TouchableOpacity style={styles.skillsListBox}>
                <Text style={styles.skillsText}>React</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.skillsListBox}>
                <Text style={styles.skillsText}>MySQL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.skillsListBox}>
                <Text style={styles.skillsText}>Java</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.skillsListBox}>
                <Text style={styles.skillsText}>C+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.skillsListBox}>
                <Text style={styles.skillsText}>Python</Text>
              </TouchableOpacity>
            </ScrollView>

            {/* profile description */}
            <View style={styles.skills}>
              <TouchableOpacity style={styles.skillsBox}>
                <Text style={styles.skillsText}>Edit Description</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.description}>
              I'm very active, have a lot of different interests. Pick an
              activity, I've probably tried it before.
            </Text>
            {/* add cv button here */}
            <View style={styles.UploadCV}>
              <TouchableOpacity style={styles.UploadBtn}>
                <Text style={styles.UploadText}>Upload CV</Text>
              </TouchableOpacity>
            </View>
            {/* cv file display */}

            {/* experience - edit experience */}
            <View style={styles.expView}>
              <Text style={styles.expText1}>Experience</Text>
              {/* place edit experience at right */}
              <View style={styles.editExpView}>
                <TouchableOpacity style={styles.expBtn}>
                  <Text style={styles.expText2}>Edit Experience</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* posts */}
          </View>
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
    borderRadius: 15,
    borderColor: 'green',
    borderWidth: 2,
  },
  skillsList: {
    flexDirection: 'row',
  },
  skills: {
    alignSelf: 'flex-end',
  },
  UploadCV: {
    alignSelf: 'center',
  },
  header: {
    backgroundColor: '#E5E3E4',
    height: 450,
    resizeMode: 'cover',
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
    marginTop: 30,
    // borderRadius: 15,
    // borderColor: 'red',
    // borderWidth: 4,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
    marginTop: 5,
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
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
    fontSize: 15,
  },
  UploadBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#469597',
    borderRadius: 12,
    marginTop: 25,
    height: 30,
    width: 150,
    marginBottom: 20,
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
