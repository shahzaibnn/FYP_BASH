import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ref, set, update, onValue, remove} from 'firebase/database';
import {db, dbFirestore} from './Config';

import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
export default function App() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [item, setitem] = useState([]);

  useEffect(() => {
    return onValue(ref(db, '/roles/email/'), querySnapShot => {
      let data = querySnapShot.val();
      const items = Object.values(data);
      setitem(items);
      console.log(items);
    });
  }, []);

  function createData() {
    // const newKey = push(child(ref(database), 'users')).key;

    set(ref(db, 'roles/' + username), {
      username: username,
      email: email,
    })
      .then(() => {
        // Data saved successfully!
        alert('data updated!');
      })
      .catch(error => {
        // The write failed...
        alert(error);
      });
  }

  function updateData() {
    // const newKey = push(child(ref(database), 'users')).key;

    update(ref(db, 'users/' + username), {
      username: username,
      email: email,
    })
      .then(() => {
        // Data saved successfully!
        alert('data updated!');
      })
      .catch(error => {
        // The write failed...
        alert(error);
      });
  }

  function readData() {
    // const starCountRef = ref(db, 'users/' + username);
    // onValue(starCountRef, snapshot => {
    //   const data = snapshot.val();
    //   setEmail(data.email);
    // });
  }

  function deleteData() {
    remove(ref(db, 'users/' + username));
    alert('removed');
  }

  return (
    <View style={styles.container}>
      <Text>Firebase crud!</Text>

      <TextInput
        value={username}
        onChangeText={setName}
        placeholder="Username"
        style={styles.textBoxes}></TextInput>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.textBoxes}></TextInput>
      {/* <Button onPress={createData} title="Submit Data"></Button> */}
      <Text>{item}</Text>

      <TouchableOpacity>
        <Text>Submit Data </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          onClick={() => {
            console.log('submitted');
          }}>
          hi
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBoxes: {
    width: '90%',
    fontSize: 18,
    padding: 12,
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 10,
  },
});
