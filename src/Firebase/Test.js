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

  const writePost = async () => {
    await dbFirestore()
      .collection('Posts')
      .add({
        commentedBy: ['shahzaibnn@gmail.com', 'habibafaisal8@gmail.com'],
        date: '25th October 2022',
        description:
          'Canada is one of those countries that continuously finds itself on “top 10” destination lists. Whether it’s for the country’s incredible natural beauty, delicious food, mountain resorts, unique culture, or unbeatable road trips—Canada has it all!',
        images: [
          // 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZHViYWl8ZW58MHx8MHx8&w=1000&q=80',
          // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrvShnjnecDWQkvqXazKndlV-5ydcpJgnkVJmcuVedoadu8Ryhj_Z3Z1nho9mapLazuo0&usqp=CAU',
        ],
        likedBy: ['shahzaibnn@gmail.com'],
        name: 'Canada',
        profilePic:
          'https://www.seekpng.com/png/detail/1008-10080082_27-2011-photoshop-pernalonga-baby-looney-tunes.png',
        title: 'BSCS Student',
      })
      .then(() => {
        console.log('Post Added!');
      });
  };

  const searchFirestore = async () => {
    await dbFirestore()
      .collection('Users')
      .doc('roles')
      .collection('student')
      // Filter results
      .where('userEmail', '==', 'habibafaisal8@gmail.com')
      // .where('firstName', '==', 'Habiba')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
            //To grab a particular field use
            //documentSnapshot.data().userEmail,
          );
        });
      });
  };

  const readFirestore = async () => {
    await dbFirestore()
      .collection('Users')
      .doc('roles')
      .collection('student')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
            //To grab a particular field use
            //documentSnapshot.data().userEmail,
          );
        });
      });
  };

  const addDataFirestore = async () => {
    // const usersCollection = await

    await dbFirestore()
      .collection('Users')
      .doc('roles')
      .collection('student')
      .add({
        role: 'student',
        firstName: 'Habiba',
        lastName: 'Faisal',
        userEmail: 'habibafaisal8@gmail.com',
        userPassword: '123456',
        contactNo: '03212185174',
        dateOfBirth: '25-10-2022',
        pic: '',
        title: 'BSCS Student',
        description: '',
        skills: ['java', 'React'],
        cv: '',
        experience: [{organization: 'one'}, {organization: 'two'}],
        postsId: ['1'],
        appliedJobId: ['1'],
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

      <TouchableOpacity
        style={{backgroundColor: 'red', padding: '10%', borderRadius: 16}}
        onPress={addDataFirestore}>
        <Text>Write Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={readFirestore}
        style={{backgroundColor: 'orange', padding: '10%', borderRadius: 16}}>
        <Text>Read Button</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={searchFirestore}
        style={{backgroundColor: 'green', padding: '10%', borderRadius: 16}}>
        <Text>Search Button</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={writePost}
        style={{backgroundColor: 'yellow', padding: '10%', borderRadius: 16}}>
        <Text>Write Post</Text>
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
