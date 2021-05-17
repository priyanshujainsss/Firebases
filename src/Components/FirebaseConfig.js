import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCzpPOjWzA2MNuOl1yxNHLwjOudsKOzOtk",
    authDomain: "reactfirebase-7e53a.firebaseapp.com",
    databaseURL: "https://reactfirebase-7e53a-default-rtdb.firebaseio.com",
    projectId: "reactfirebase-7e53a",
    storageBucket: "reactfirebase-7e53a.appspot.com",
    messagingSenderId: "938850261780",
    appId: "1:938850261780:web:b7d43ef16e596579924001",
    measurementId: "G-RQ7VP5LS23"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export default firebase;