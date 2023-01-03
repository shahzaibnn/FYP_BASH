import React from 'react';

import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Communications from 'react-native-communications';
/* 2. Or import single methods
 import {
  phonecall,
  email,
  text,
  web
} from 'react-native-communications';*/

const Email = () => {
  return (
    <View>
      <View>
        <Text style={styles.titleText}>
          Make Phone Call, Send SMS or Email Using React Native Communication
        </Text>
        {/* Call: phonecall(phoneNumber, prompt) */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => Communications.phonecall('00923158994401', true)}>
          <Text style={styles.buttonTextStyle}>Make Phone Call</Text>
        </TouchableOpacity>
        {/* Mail: email(to, cc, bcc, subject, body) */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() =>
            Communications.email(
              ['habibafaisal8@gmail.com', 'habibablogs@gmail.com'],
              null,
              null,
              'Demo Subject',
              'Demo Content for the mail',
            )
          }>
          <Text style={styles.buttonTextStyle}>Send an Email</Text>
        </TouchableOpacity>
        {/* SMS: text(phoneNumber = null, body = null) */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() =>
            Communications.text(
              '00923158994401',
              'Follow https://aboutreact.com',
            )
          }>
          <Text style={styles.buttonTextStyle}>Send a Text/iMessage</Text>
        </TouchableOpacity>
        {/* Web: web(address = null)*/}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => Communications.web('https://aboutreact.com')}>
          <Text style={styles.buttonTextStyle}>Open AboutReact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Email;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    // color: '#fff',
    textAlign: 'center',
  },
});
