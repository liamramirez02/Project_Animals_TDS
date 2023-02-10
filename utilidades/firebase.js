import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAGUq52OmqrwdtjgkZly1zYZy9KKhDbL1Q",
    authDomain: "petsafedb.firebaseapp.com",
    projectId: "petsafedb",
    storageBucket: "petsafedb.appspot.com",
    messagingSenderId: "408402032183",
    appId: "1:408402032183:web:2d44743b042465dec9b1b2"
  };

  export const FbApp = firebase.initializeApp(firebaseConfig)