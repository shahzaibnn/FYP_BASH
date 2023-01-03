import RNSmtpMailer from 'react-native-smtp-mailer';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import RNFS from 'react-native-fs';
import React, {Component} from 'react';

export default class App extends Component {
  sendEmail = () => {
    RNSmtpMailer.sendMail({
      mailhost: 'smtp.gmail.com',
      port: '465',
      ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
      username: 'bashfyp@gmail.com',
      password: 'ltdapqlallccrgss',
      // fromName: 'Some Name', // optional
      // replyTo: 'usernameEmail', // optional
      recipients: 'habibafaisal8@gmail.com',
      // bcc: ['bccEmail1', 'bccEmail2'], // optional
      subject: 'Again',
      htmlBody: '<h1>header</h1><p>Helloooooo</p>',
      //   attachmentPaths: ['/FYP_BASH/bash_icon.png'],
      attachmentPaths: [
        // RNFS. + '/FYP_BASH/a.txt',
        RNFS.DocumentDirectoryPath + '/image6.pdf',
        // RNFS.ExternalDirectoryPath + 'FYP_BASH/src/assets/images/bash_icon.png',
      ],
      attachmentNames: ['a.pdf'], //only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[]
      //   attachmentTypes: ['img'],

      //   attachmentPaths: [
      //     RNFS.ExternalDirectoryPath + '/image.jpg',
      //     // RNFS.DocumentDirectoryPath + '/test.txt',
      //     // RNFS.DocumentDirectoryPath + '/test2.csv',
      //     // RNFS.DocumentDirectoryPath + '/pdfFile.pdf',
      //     // RNFS.DocumentDirectoryPath + '/zipFile.zip',
      //     // RNFS.DocumentDirectoryPath + '/image.png',
      //   ], // optional
      //   attachmentNames: [
      //     'image.jpg',
      //     // 'firstFile.txt',
      //     // 'secondFile.csv',
      //     // 'pdfFile.pdf',
      //     // 'zipExample.zip',
      //     // 'pngImage.png',
      //   ], // required in android, these are renames of original files. in ios filenames will be same as specified in path. In a ios-only application, no need to define it
    })
      .then(success => console.log(success))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Smtp Mailer!</Text>
        <Button title="Send Email" onPress={this.sendEmail} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
