import app from 'firebase/app';
import 'firebase/auth';

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

          this.auth = app.auth();
      }

      doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    
      doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    
      doSignOut = () => this.auth.signOut();
    
      doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    
      doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
      }

  export default Firebase;
