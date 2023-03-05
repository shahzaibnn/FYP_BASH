import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import AlertBox from '../components/AlertBox';

const AlertTesting = () => {
  const [name, SetName] = useState('');
  const [submitted, SetSubmitted] = useState(false);
  const [showWarning, SetshowWarning] = useState(false);
  const onPressHandler = () => {
    if (name.length > 3) {
      SetSubmitted(!submitted);
    } else {
      SetshowWarning(true);
    }
  };

  const CancelPressed = () => {
    SetshowWarning(false);

    console.log('Cancel is pressed!!');
  };

  const ConfirmPressed = () => {
    SetshowWarning(false);

    console.log('Confirm is pressed!!');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff', alignItems: 'center'}}>
      <AlertBox
        showWarning={showWarning}
        ConfirmPressed={ConfirmPressed}
        CancelPressed={CancelPressed}
        heading={'Confirmation'}
        text={'Do you want to delete this post?'}
      />
      <Text
        style={{
          color: '#000000',
          fontSize: 20,
          margin: 10,
          textAlign: 'center',
        }}>
        Please write your name:
      </Text>
      <TextInput
        style={{
          width: 200,
          borderWidth: 1,
          borderColor: '#555',
          borderRadius: 5,
          textAlign: 'center',
          fontSize: 20,
          marginBottom: 10,
        }}
        placeholder="e.g. John"
        onChangeText={value => SetName(value)}
      />
      <TouchableOpacity
        onPress={onPressHandler}
        hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
        android_ripple={{color: '#00f'}}
        style={({pressed}) => [
          {backgroundColor: pressed ? '#dddddd' : '#00ff00'},
          styles.button,
        ]}>
        <Text
          style={{
            color: '#000000',
            fontSize: 20,
            margin: 10,
            textAlign: 'center',
          }}>
          {submitted ? 'Clear' : 'Submit'}
        </Text>
      </TouchableOpacity>
      {submitted ? (
        <Text
          style={{
            color: '#000000',
            fontSize: 20,
            margin: 10,
            textAlign: 'center',
          }}>
          You are registered as {name}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    width: 150,
    height: 50,
    alignItems: 'center',
  },
  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    width: 300,
    height: 300,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
  },
  warning_title: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  warning_body: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning_button: {
    backgroundColor: '#00ffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default AlertTesting;
