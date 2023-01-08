import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ref,
  set,
  update,
  onValue,
  remove,
  orderByChild,
  query,
  limitToLast,
  equalTo,
  limitToFirst,
} from 'firebase/database';
import {db, dbFirestore} from './Config';

import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
export default function App() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [item, setitem] = useState([]);
  const [values, setValues] = useState('No Value');

  /* Creating a reference to the collection named Users. */

  const readFirestore = async () => {
    // const usersCollection = await

    dbFirestore()
      .collection('Users')
      .doc('roles')
      .collection('student')
      .add({
        name: ' mcka kadckacmdfsl',
        age: 30,
      })
      .then(() => {
        console.log('User added!');
      });
    // dbFirestore().collection('Users').doc('roles').collection('student').add({
    //   name: 'Ada Lovelace',
    //   age: 30,
    // });
    // .doc('IWLSdpM6vFjgOcLYwJLt')
    // .get()
    // .set({
    //   key: '1',
    //   value: '88',
    // });
    // .onSnapshot(documentSnapshot => {
    //   console.log('User data: ', documentSnapshot.data());
    // });
    // console.log(usersCollection);
  };
  const userInput = 'insideanother';
  // useEffect(() => {
  //   return onValue(ref(db, '/roles/email/' + userInput), querySnapShot => {
  //     // let data = querySnapShot.toJSON();
  //     let data = querySnapShot.val();
  //     const items = Object.values(data);
  //     setitem(items);
  //     console.log(items);
  //   });
  // }, []);

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

  const readData = () => {
    const recentPostsRef = query(ref(db, 'roles/students'), limitToFirst(1));
    // console.log(Object.values(recentPostsRef));

    // const topUserPostsRef = query(
    //   ref(db, 'roles/students'),
    //   orderByValue('userEmail'),
    // );

    const topUserPostsRef = query(
      ref(db, 'roles/students'),
      orderByChild('userEmail'),
      // equalTo(emailAddressOfCurrentUser),
      // onValue('userEmail'),
    );

    onValue(topUserPostsRef, snapshot => {
      const data = snapshot.val();
      console.log(data);
      // console.log(data.key);
      snapshot.forEach(function (data) {
        console.log(data.val().experience);
      });
    });

    // const starCountRef = ref(db, 'roles/students');

    // orderByChild(starCountRef, snapshot => {
    //   const data = snapshot.val();
    //   console.log(data);
    //   console.log(starCountRef);
    //   // setEmail(data.userEmail);
    //   // setValues(Object.values(data));
    // });

    // onValue(starCountRef, snapshot => {
    //   const data = snapshot.val();
    //   console.log(data);
    //   console.log(starCountRef);
    //   // setEmail(data.userEmail);
    //   // setValues(Object.values(data));
    // });

    // const refer = ref(db, 'roles/students/');

    // var query = orderByChild('userEmail');
    // var query2 = equalTo('shahzaibnn@gmail.com');

    // console.log(query);

    // const refer = ref(db, 'roles/students/');
    // // var ref = ref(db, 'roles/students/');
    // var query = refer.orderByChild('userEmail').equalTo('shahzaibnn@gmail.com');

    // query.once('value', function (snapshot) {
    //   snapshot.forEach(function (child) {
    //     console.log(child.key, child.val().contactNo);
    //   });
    // });
  };

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

      <TouchableOpacity onPress={readFirestore}>
        <Text>Submit Data</Text>
      </TouchableOpacity>

      <Text>{values}</Text>
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
