import RNSmtpMailer from 'react-native-smtp-mailer';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import RNFS from 'react-native-fs';
import React, {Component} from 'react';

export default class App extends Component {
  sendEmail = () => {
    console.log(RNFS.readFileAssets(RNFS.DownloadDirectoryPath));
    console.log(RNFS.DownloadDirectoryPath);

    var path = RNFS.DownloadDirectoryPath + '/check.pdf';
    // write the file
    RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
      .then(success => {
        console.log('FILE WRITTEN!');
      })
      .catch(err => {
        console.log(err.message);
      });
    var path2 = RNFS.DownloadDirectoryPath + '/Case-study.docx';

    RNFS.readFile(path2, 'base64')
      .then(success => {
        console.log('Read!');
      })
      .catch(err => {
        console.log(err.message);
      });
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
      // bcc: ['shahzaibnn@gmail.com'], // optional
      subject: 'Let me know if it works',
      htmlBody: '<h1>header</h1><p>Helloooooo</p>',

      attachmentPaths: [path],
      attachmentNames: ['test'], //only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[]
      //   attachmentTypes: ['img'],
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
