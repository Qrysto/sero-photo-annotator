import firebase from 'firebase'

// Setup Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDbXohFxVeFgwKtiZfTKCVApq2tv0bkpgI",
  authDomain: "sero-annotator.firebaseapp.com",
  databaseURL: "https://sero-annotator.firebaseio.com",
  storageBucket: "sero-annotator.appspot.com",
  messagingSenderId: "920266114103"
});

export default firebase.database()
