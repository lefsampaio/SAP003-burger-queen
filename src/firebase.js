import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyD--dinG-lJPZrDAOfVueFQjBtVDgtv-JU",
    authDomain: "burger-queen-59dde.firebaseapp.com",
    databaseURL: "https://burger-queen-59dde.firebaseio.com",
    projectId: "burger-queen-59dde",
    storageBucket: "burger-queen-59dde.appspot.com",
    messagingSenderId: "355992975866",
    appId: "1:355992975866:web:66655ebea5ddb640d80c43",
    measurementId: "G-B1JCV5L152"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().enablePersistence();
  export default firebase;