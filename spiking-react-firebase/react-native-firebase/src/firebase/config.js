// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import '@firebase/firestore';
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCbRd3DsQM73qpvyIk04PoMrxLyq5TDYJo",
    authDomain: "pets-reunited.firebaseapp.com",
    databaseURL: "https://pets-reunited-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pets-reunited",
    storageBucket: "pets-reunited.appspot.com",
    messagingSenderId: "313625608890",
    appId: "1:313625608890:web:fe23549c839c771e6bf883",
    measurementId: "G-FPZM2F1J6M"
};

//maybe delete! 
const app = firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    
}


export { firebase, app};