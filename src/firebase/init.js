 import firebase from 'firebase';
 import firestore from 'firebase/firestore';

 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyBfIk8cTM4UozhF1ERV4kg448a6XpZ8sI4",
  authDomain: "smoothy-shop.firebaseapp.com",
  databaseURL: "https://smoothy-shop.firebaseio.com",
  projectId: "smoothy-shop",
  storageBucket: "smoothy-shop.appspot.com",
  messagingSenderId: "984801597931",
  appId: "1:984801597931:web:99ed11ae72cdac7bfba1ae",
  measurementId: "G-YBXHSZPYN9"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp.firestore();