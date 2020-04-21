import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyAQu9W7It8L5WgsiNe0jroszYDRCmTq43E",
    authDomain: "jugtain-ebfa9.firebaseapp.com",
    databaseURL: "https://jugtain-ebfa9.firebaseio.com",
    projectId: "jugtain-ebfa9",
    storageBucket: "jugtain-ebfa9.appspot.com",
    messagingSenderId: "1076509201145",
    appId: "1:1076509201145:web:ede3480f5ceb769edc0828"
  };
  // Initialize Firebase
  const fire=firebase.initializeApp(firebaseConfig);
  const database=firebase.database()
  export {fire,database}




  

  
