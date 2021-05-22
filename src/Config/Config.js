import firebase from 'firebase'
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDbdFW33nyslu2iJbKvKW98QtqUZ5fpYdo",
    authDomain: "task-40285.firebaseapp.com",
    projectId: "task-40285",
    storageBucket: "task-40285.appspot.com",
    messagingSenderId: "637364422778",
    appId: "1:637364422778:web:a081f485b607ffe30593c3"
  };

  firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }