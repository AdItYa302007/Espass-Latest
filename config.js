import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyD0UhlGe5sIKUnTeurL43VaZ7Ysh5uyLo8",
  authDomain: "espass-8bee8.firebaseapp.com",
  projectId: "espass-8bee8",
  storageBucket: "espass-8bee8.appspot.com",
  messagingSenderId: "875130904504",
  appId: "1:875130904504:web:6620bbf0b90dea949af94d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
