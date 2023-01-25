import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonActions} from '@react-navigation/native';

import Spinner from 'react-native-spinkit';

export default function SettingsScreen({navigation}) {
  const [faqViewDisplay, setFaqViewDisplay] = useState(false);
  const [privacyViewDisplay, setPrivacyViewDisplay] = useState(false);
  const [contactViewDisplay, setContactViewDisplay] = useState(false);
  const [changePasswordDisplay, setChangePasswordDisplay] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [pointerEvent, setPointerEvent] = useState('auto');
  const [opacity, setOpacity] = useState(1);

  function logoutPressed() {
    return new Promise(function (resolve, reject) {
      setSpinnerLoader(true);
      setPointerEvent('none');
      setOpacity(0.8);
      setTimeout(function () {
        setSpinnerLoader(false);
        setPointerEvent('auto');
        setOpacity(1);
        navigation.navigate('Login');
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Login'}],
          }),
        );
      }, 3000);
    });
  }

  return (
    <ScrollView style={{backgroundColor: '#E5E3E4'}}>
      <View pointerEvents={pointerEvent} style={{opacity: opacity}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: '3%',
            marginVertical: '5%',
            //   justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              // setSpinnerVisible(!spinnerVisible);
              setIndexValue(indexValue + 1);
            }}
            style={{}}>
            <Ionicons
              name="chevron-back-circle-sharp"
              size={35}
              color="#777777"
            />
          </TouchableOpacity>

          <Text style={styles.settingsOptions}>Settings</Text>
        </View>

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
            borderBottomLeftRadius: faqViewDisplay ? 0 : 8,
            borderBottomRightRadius: faqViewDisplay ? 0 : 8,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome
              name="question-circle"
              size={25}
              color="#777777"
              style={{marginLeft: '2%'}}
            />
            <Text style={styles.optionsStyle}>FAQ's</Text>
          </View>

          <TouchableOpacity
            onPress={() => setFaqViewDisplay(!faqViewDisplay)}
            style={{marginRight: '2%'}}>
            <FontAwesome name="plus-circle" size={25} color="#777777" />
          </TouchableOpacity>
        </View>

        <Collapsible collapsed={!faqViewDisplay}>
          <View
            style={{
              marginHorizontal: '5%',
              backgroundColor: '#BBC6C8',
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}>
            <Text style={{textAlign: 'center'}}>
              -----------TEXT FOR FAQ's-------------
            </Text>
          </View>
        </Collapsible>

        {/* Privacy Policy */}

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
            borderBottomLeftRadius: privacyViewDisplay ? 0 : 8,
            borderBottomRightRadius: privacyViewDisplay ? 0 : 8,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons
              name="privacy-tip"
              size={25}
              color="#777777"
              style={{marginLeft: '0%'}}
            />
            <Text style={styles.optionsStyle}>Privacy Policy</Text>
          </View>

          <TouchableOpacity
            onPress={() => setPrivacyViewDisplay(!privacyViewDisplay)}
            style={{marginRight: '2%'}}>
            <FontAwesome name="plus-circle" size={25} color="#777777" />
          </TouchableOpacity>
        </View>

        <Collapsible collapsed={!privacyViewDisplay}>
          <View
            style={{
              marginHorizontal: '5%',
              backgroundColor: '#BBC6C8',
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}>
            <Text style={{textAlign: 'center'}}>
              -----------TEXT FOR Privacy Policy-------------
            </Text>
          </View>
        </Collapsible>

        {/* Contact Us
         */}

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
            borderBottomLeftRadius: contactViewDisplay ? 0 : 8,
            borderBottomRightRadius: contactViewDisplay ? 0 : 8,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="chat"
              size={25}
              color="#777777"
              style={{marginLeft: '0%'}}
            />
            <Text style={styles.optionsStyle}>Contact Us</Text>
          </View>

          <TouchableOpacity
            onPress={() => setContactViewDisplay(!contactViewDisplay)}
            style={{marginRight: '2%'}}>
            <FontAwesome name="plus-circle" size={25} color="#777777" />
          </TouchableOpacity>
        </View>

        <Collapsible collapsed={!contactViewDisplay}>
          <View
            style={{
              marginHorizontal: '5%',
              backgroundColor: '#BBC6C8',
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}>
            <Text style={{textAlign: 'center'}}>
              -----------TEXT FOR Contact Us-------------
            </Text>
          </View>
        </Collapsible>

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
            borderBottomLeftRadius: changePasswordDisplay ? 0 : 8,
            borderBottomRightRadius: changePasswordDisplay ? 0 : 8,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="lock"
              size={25}
              color="#777777"
              style={{marginLeft: '0%'}}
            />
            <Text style={styles.optionsStyle}>Change Password</Text>
          </View>

          <TouchableOpacity
            onPress={() => setChangePasswordDisplay(!changePasswordDisplay)}
            style={{marginRight: '2%'}}>
            <FontAwesome name="plus-circle" size={25} color="#777777" />
          </TouchableOpacity>
        </View>

        <Collapsible collapsed={!changePasswordDisplay}>
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
              <FontAwesome
                name="unlock-alt"
                size={22}
                color="#777777"
                style={{marginHorizontal: '5%', width: 20}}
              />
              <TextInput
                style={{}}
                onChangeText={setOldPassword}
                value={oldPassword}
                placeholder="Old Password"
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
              <FontAwesome
                name="lock"
                size={22}
                color="#777777"
                style={{marginHorizontal: '5%', width: 20}}
              />
              <TextInput
                style={{}}
                onChangeText={setNewPassword}
                value={newPassword}
                placeholder="New Password"
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
              <FontAwesome
                name="lock"
                size={22}
                color="#777777"
                style={{marginHorizontal: '5%', width: 20}}
              />
              <TextInput
                style={{}}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder="Confirm New Password"
              />
            </View>
          </View>
        </Collapsible>

        <TouchableOpacity onPress={logoutPressed} style={styles.logoutStyle}>
          <Text style={{color: '#000000', fontSize: 30, fontWeight: 'bold'}}>
            Logout
          </Text>
        </TouchableOpacity>

        <Spinner
          style={{
            position: 'absolute',
            top: Dimensions.get('window').height * 0.5,
            left: Dimensions.get('window').width * 0.4,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          isVisible={spinnerLoader}
          size={Dimensions.get('window').width * 0.2}
          type={'9CubeGrid'}
          color={'#5BA199'}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  settingsOptions: {
    fontSize: 35,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: '3%',
    // marginHorizontal: Dimensions.get('window').width / 5,
    // marginEnd: '30%',
    // marginHorizontal: '25%',  },
  },
  logoutStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BBC6C8',
    alignSelf: 'center',
    paddingHorizontal: '15%',
    paddingVertical: '3%',
    borderRadius: 32,
    marginTop: '50%',
    marginBottom: 100,
  },
  optionsStyle: {
    fontSize: 20,
    color: '#000000',
    marginLeft: 10,
  },
});
