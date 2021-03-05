import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';
import 'firebase/storage';  
 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyB6YgbMI_wvZqL6ELvhZuUBkU9NJybeZ1A",
  authDomain: "notasfirebase-f8e60.firebaseapp.com",
  projectId: "notasfirebase-f8e60",
  storageBucket: "notasfirebase-f8e60.appspot.com",
  messagingSenderId: "1085662710891",
  appId: "1:1085662710891:web:72457e0b02ce30f707352e"
};  
// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true });



export default {
    
}