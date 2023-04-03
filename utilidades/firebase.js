import firebase from 'firebase/app'
import 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4xh6T-O4W9r9GD4iJN7GP12DImvl5IgA",
  authDomain: "project-animal-tds.firebaseapp.com",
  projectId: "project-animal-tds",
  storageBucket: "project-animal-tds.appspot.com",
  messagingSenderId: "744161593205",
  appId: "1:744161593205:web:bdd3fa443c105c8df5b53c"
};

// Initialize Firebase

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig)


