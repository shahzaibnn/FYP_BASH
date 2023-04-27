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
import CryptoJS from 'react-native-crypto-js';

import Spinner from 'react-native-spinkit';
import {Chase} from 'react-native-animated-spinkit';

import {useSelector, useDispatch} from 'react-redux';
import {ToastAndroid, Platform, AlertIOS} from 'react-native';
import Toast from 'react-native-toast-message';
import {db, authorization, auth, dbFirestore} from '../Firebase/Config';
import RNSmtpMailer from 'react-native-smtp-mailer';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  getAuth,
  updateCurrentUser,
  updatePassword,
  EmailAuthProvider,
  signOut,
} from 'firebase/auth';

export default function SettingsScreen({navigation}) {
  const [faqViewDisplay, setFaqViewDisplay] = useState(false);
  const [privacyViewDisplay, setPrivacyViewDisplay] = useState(false);
  const [contactViewDisplay, setContactViewDisplay] = useState(false);
  const [changePasswordDisplay, setChangePasswordDisplay] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [originalPassword, setOriginalPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [spinnerLoader, setSpinnerLoader] = useState(false);
  const [pointerEvent, setPointerEvent] = useState('auto');
  const [opacity, setOpacity] = useState(1);

  const [id, setId] = useState('');
  const [flag, setFlag] = useState(true);

  const [emailGenerated, setemailGenerated] = useState('');
  const [email, setEmail] = useState('');
  const storeData = useSelector(state => state);

  // const [role, setRole] = useState('');
  const [indicator, setIndicator] = useState(true);
  const [enabledScroll, setEnabledScroll] = useState(true);

  const [found, setFound] = useState(false);
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
  const showToast = heading => {
    Toast.show({
      type: 'error',
      text1: heading,
      // text2: text,
    });
  };

  const changePasswordPressed = async () => {
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&//.])[A-Za-z\d@$!%*?&//.]{8,}$/.test(
        newPassword,
      )
    ) {
      showToast(
        '(Password Criteria)\nMinimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      );
      console.log('no pls');
    } else {
      console.log('yes pls pls');

      changePassword();
    }
  };
  const changePassword = async () => {
    // firebase
    // authorization()

    // if (!email) {
    //   alert('Please Enter Email Address');
    // } else {
    //   setFlag(false);

    console.log('new', newPassword);

    // // to decrypt the password
    // let bytes = CryptoJS.AES.decrypt(user, 'secret key 123');
    // let originalText = bytes.toString(CryptoJS.enc.Utf8);

    // console.log('decrypted password: ', originalText); //decrypted password

    setIndicator(false);
    try {
      const querySnapshot = await dbFirestore()
        .collection('Users')
        .where('userEmail', '==', storeData.userEmail)
        .get();
      console.log('Total Found users: ', querySnapshot.size);

      if (querySnapshot.size == 0) {
        setFlag(true);
        notifyMessage('Email Address does not Exists');
      } else {
        querySnapshot.forEach(documentSnapshot => {
          setFound(true);
          console.log(documentSnapshot.id);
          console.log(documentSnapshot.data().userPassword);
          setId(documentSnapshot.id);
          // to decrypt the password
          let bytes = CryptoJS.AES.decrypt(
            documentSnapshot.data().userPassword,
            'secret key 123',
          );
          let originalText = bytes.toString(CryptoJS.enc.Utf8);
          console.log('decrypted password here: ', originalText); //decrypted password
          setOldPassword(originalText);
          setOriginalPassword(documentSnapshot.data().userPassword);
          // setFound(true);
        });
        return changePasswordProcess();
      }
    } catch {
      // alert(error);
      setIndicator(true);
      setFlag(true);
    }
  };

  const changePasswordProcess = () => {
    if (found) {
      let encryptedPassword = CryptoJS.AES.encrypt(
        newPassword,
        'secret key 123',
      ).toString();
      console.log('checking encrypted password', encryptedPassword);
      dbFirestore()
        .collection('Users')
        // .doc('roles')
        // .collection(value.toLowerCase())
        .doc(id)
        .update({
          userPassword: encryptedPassword,
        })
        .then(() => {
          console.log('----------------------------');
          console.log('new encrypted password: ', encryptedPassword);
          RNSmtpMailer.sendMail({
            mailhost: 'smtp.gmail.com',
            port: '465',
            ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
            username: 'bashfyp@gmail.com',
            password: 'ltdapqlallccrgss',
            // fromName: 'Some Name', // optional
            // replyTo: 'usernameEmail', // optional
            recipients: storeData.userEmail,
            // bcc: ['bccEmail1', 'bccEmail2'], // optional
            // bcc: ['shahzaibnn@gmail.com'], // optional
            subject: 'BASH Password Changed',
            htmlBody: '<h1>New Password is:' + newPassword + '</h1>',
            // attachmentPaths: [path],
            // attachmentNames: ['anotherTest.pdf'],
          })
            .then(success => {
              const auth = getAuth();
              console.log('Email sent');
              console.log('old pw check', oldPassword);

              signInWithEmailAndPassword(auth, storeData.userEmail, oldPassword)
                .then(userCredential => {
                  console.log('old pw', oldPassword);

                  // Signed in
                  const user = userCredential.user;
                  console.log('first : ', user);
                  updatePassword(user, newPassword)
                    .then(() =>
                      signOut(auth).then(() => {
                        console.log('pura done');
                        console.log(success);
                        console.log('Password Updated');

                        setemailGenerated(true);
                        // notifyMessage(
                        //   'New Password Sent At ' + storeData.userEmail,
                        // );
                        setNewPassword('');

                        console.log('toaster sent');
                        setFound(false);
                        setFlag(true);
                        // navigation.navigate('Login');
                      }),
                    )
                    .catch(error => {
                      setFlag(true);

                      console.log(error);
                    });
                  // ...
                })
                .catch(error => {
                  console.log(error);
                  setFlag(true);
                });
            })
            .catch(err => {
              console.log(err);
              setFound(false);
              setFlag(true);
              setIndicator(true);
            });
        });
    } else {
      console.log('not found');
    }
  };
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
              navigation.goBack();
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
            // backgroundColor: '#BBC6C8',
            backgroundColor: 'rgba(70,149,151,0.8)',

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
              size={20}
              color="white"
              style={{marginLeft: '2%'}}
            />
            <Text style={styles.optionsStyle}>FAQ's</Text>
          </View>

          <TouchableOpacity
            onPress={() => setFaqViewDisplay(!faqViewDisplay)}
            style={{marginRight: '2%'}}>
            <FontAwesome name="plus-circle" size={20} color="white" />
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
            {/* <Text style={{textAlign: 'center'}}> */}
            {/* -----------TEXT FOR FAQ's------------- */}
            {/* </Text> */}
            {/* test */}
            <Text style={styles.heading}>Bash FAQs</Text>
            <Text style={styles.question}>What is Bash?</Text>
            <Text style={styles.answer}>
              A: Bash is a social networking app that serves as a professional
              platform for users to connect, share their work experiences,
              skills, and career interests with potential employers, recruiters,
              and other professionals.
            </Text>

            <Text style={styles.question}>How does Bash work?</Text>
            <Text style={styles.answer}>
              A: Bash works by allowing users to create a professional profile
              with their work experience, skills, education, and other relevant
              information. Users can connect with other professionals, follow
              companies, join groups, and share their thoughts and ideas. They
              can also search for jobs, apply for them, and receive
              recommendations based on their profile.
            </Text>

            <Text style={styles.question}>How can I sign up for Bash?</Text>
            <Text style={styles.answer}>
              A: To sign up for Bash, download the app from the app store or
              play store, and create an account using your email address.
            </Text>

            <Text style={styles.question}>Is Bash free to use?</Text>
            <Text style={styles.answer}>
              A: Absolutely! Bash is a free platform that allows users to create
              a profile, connect with other professionals, join groups, and
              share their thoughts and ideas.
            </Text>

            <Text style={styles.question}>Can I search for jobs on Bash?</Text>
            <Text style={styles.answer}>
              A: Yes, you can search for jobs on Bash. The app offers a job
              search feature that allows users to search for jobs by keyword,
              location, and job title. You can also receive job recommendations
              based on your profile and preferences.
            </Text>

            <Text style={styles.question}>
              How can I view other professionals on Bash?
            </Text>
            <Text style={styles.answer}>
              A: To view other professionals on Bash, search for people by name,
              company, or job title.
            </Text>

            <Text style={styles.question}>Is Bash safe to use?</Text>
            <Text style={styles.answer}>
              A: Bash takes user privacy and security very seriously. The app
              uses industry-standard encryption to protect user data and
              information. It also offers various privacy settings to allow
              users to control who can see their profile and information.
            </Text>

            <Text style={styles.question}>
              How can I report inappropriate content on Bash?
            </Text>
            <Text style={styles.answer}>
              A: If you come across any inappropriate content on Bash, you can
              report it by clicking on the three dots next to the post or
              message and selecting the "Report" option. The Bash team will
              review the report and take appropriate action.
            </Text>

            {/* test */}
          </View>
        </Collapsible>

        {/* Privacy Policy */}

        <View
          style={{
            marginHorizontal: '5%',
            marginTop: '10%',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(70,149,151,0.8)',

            // backgroundColor: '#BBC6C8',
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
              size={20}
              color="white"
              style={{marginLeft: '0%'}}
            />
            <Text style={styles.optionsStyle}>Privacy Policy</Text>
          </View>

          <TouchableOpacity
            onPress={() => setPrivacyViewDisplay(!privacyViewDisplay)}
            style={{marginRight: '2%'}}>
            <FontAwesome name="plus-circle" size={20} color="white" />
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
            {/* <Text style={{textAlign: 'center'}}> */}
            {/* -----------TEXT FOR Privacy Policy------------- */}
            {/* </Text> */}
            <Text style={styles.privacyPolicy}>
              We collect personal info to create your profile, connect you with
              professionals, and provide job recommendations. We may share with
              third-party providers and other users. We use encryption to
              protect your info, but cannot guarantee complete security. You can
              edit your profile and control notifications. We may update this
              policy. Contact us with questions.
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
            // backgroundColor: '#BBC6C8',
            backgroundColor: 'rgba(70,149,151,0.8)',
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
              size={20}
              color="white"
              style={{marginLeft: '0%'}}
            />
            <Text style={styles.optionsStyle}>Contact Us</Text>
          </View>

          <TouchableOpacity
            onPress={() => setContactViewDisplay(!contactViewDisplay)}
            style={{marginRight: '2%'}}>
            <FontAwesome name="plus-circle" size={20} color="white" />
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
            {/* <Text style={{textAlign: 'center'}}> */}
            {/* -----------TEXT FOR Contact Us------------- */}
            {/* </Text> */}
            <Text style={styles.contactUs}>
              If you have any questions, concerns, or feedback, please email us
              at bashfyp@gmail.com. We strive to respond to all inquiries within
              24 hours.
            </Text>
          </View>
        </Collapsible>

        <View
          style={{
            marginHorizontal: '5%',
            marginTop: '10%',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(70,149,151,0.8)',
            // backgroundColor: '#BBC6C8',
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
              size={20}
              color="white"
              style={{marginLeft: '0%'}}
            />
            <Text style={styles.optionsStyle}>Change Password</Text>
          </View>

          <TouchableOpacity
            onPress={() => setChangePasswordDisplay(!changePasswordDisplay)}
            style={{marginRight: '2%'}}>
            <FontAwesome name="plus-circle" size={20} color="white" />
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
            <TouchableOpacity
              onPress={changePasswordPressed}
              style={styles.logoutStyle}>
              <Text style={{color: 'white', fontSize: 18}}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        </Collapsible>

        {spinnerLoader ? (
          <Chase
            style={{
              position: 'absolute',
              // top: Dimensions.get('window').height * 0.5,
              left: Dimensions.get('window').width * 0.4,
              bottom: Dimensions.get('window').height * 0.15,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            size={Dimensions.get('window').width * 0.2}
            color="#5BA199"
          />
        ) : (
          console.log('nto')
        )}
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
    backgroundColor: 'rgba(70,149,151,0.8)',
    alignSelf: 'center',
    paddingHorizontal: '8%',
    paddingVertical: '1%',
    borderRadius: 32,
    marginTop: '5%',
    marginBottom: '5%',
    // borderColor: 'white',
    // borderWidth: 1,
  },
  optionsStyle: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  question: {
    fontSize: 18,
    marginLeft: '3%',
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 16,
    marginVertical: 5,
    marginLeft: '3%',
  },
  privacyPolicy: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  contactUs: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
