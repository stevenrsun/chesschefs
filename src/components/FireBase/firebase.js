import app from 'firebase/app';

  const config = {
    apiKey: "AIzaSyDKm_j6-ortLi8t9B_WnqkgfpAuSDjO-o4",
    authDomain: "chess-bros.firebaseapp.com",
    databaseURL: "https://chess-bros.firebaseio.com",
    projectId: "chess-bros",
    storageBucket: "chess-bros.appspot.com",
    messagingSenderId: "7559196477",
    appId: "1:7559196477:web:3beb443d38fbf1eb151f54",
    measurementId: "G-PGQPFWE10X"
  };

  class Firebase {
      constructor() {
          app.initializeApp(config);
      }
  }

  export default Firebase;
