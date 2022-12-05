import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import {getFirestore} from 'firebase/firestore';
// import auth from '@react-native-firebase/auth';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBeJkjyyQBii5lFh2-3kwmKUWVAeC4ZlqM',
  authDomain: 'nodetest-f3431.firebaseapp.com',
  databaseURL: 'https://nodetest-f3431-default-rtdb.firebaseio.com',
  projectId: 'nodetest-f3431',
  storageBucket: 'nodetest-f3431.appspot.com',
  messagingSenderId: '683086119963',
  appId: '1:683086119963:web:87a8c0d03a442c25de64be',
  measurementId: 'G-KYD0E1K5K1',
};
const app = initializeApp(firebaseConfig);

// const authorization = firebase.auth(app);
export const authorization = getAuth(app);
//initizile database
export const db = getDatabase(app);
//export const dbFirestore = getFirestore(app);

// export {authorization};
import 'firebase/compat/auth';
const auth = firebase.auth(app);

export {auth};
