import * as firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyDFzXfd7RvAsFY7tUzCcjyXXqr89JwEMmk",
    authDomain: "myuchat-24619.firebaseapp.com",
    databaseURL: "https://myuchat-24619.firebaseio.com",
    projectId: "myuchat-24619",
    storageBucket: "",
    messagingSenderId: "837761050568",
    appId: "1:837761050568:web:2d9a00a0cca6a47c9c02fd"
  };
  // Initialize Firebase
  const App = firebase.initializeApp(firebaseConfig)

export default App