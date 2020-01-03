// Firebase App (the core Firebase SDK) is always required and must be listed first
import app from 'firebase/app';

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import * as firebase from 'firebase';


// TODO: Reserved urls seems like a much nicer way of doing this.
// "Note: The Firebase config object contains unique,
//  but non-secret identifiers for your Firebase project. "
const firebaseConfig = {
  apiKey: 'AIzaSyBHfFNj_zcMAwKKSX6L8RG15tysYTGXrAs',
  authDomain: 'michaeltestingstuff.firebaseapp.com',
  databaseURL: 'https://michaeltestingstuff.firebaseio.com',
  projectId: 'michaeltestingstuff',
  storageBucket: 'michaeltestingstuff.appspot.com',
  messagingSenderId: '567435610965',
  appId: '1:567435610965:web:ec0453e625707c935fbddc',
  measurementId: 'G-T9HY49EFG3',
};

console.warn('Initialized firebase');

class Firebase {
  private auth: app.auth.Auth;

  private db: app.firestore.Firestore;

  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  signInWithGoogle() {
    // https://firebase.google.com/docs/auth/web/google-signin
    this.auth.useDeviceLanguage();
    // TODO: nicer import for this rather than global?
    const provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithRedirect(provider);
  }

  async getUserIfLoggedInFromRedirect(): Promise<app.User|null> {
    // https://firebase.google.com/docs/auth/web/google-signin
    try {
      const result = await this.auth.getRedirectResult();
      // if (result.credential) {
      //   // This gives you a Google Access Token. You can use it to access the Google API.
      //   var credential = result.credential.accessToken;
      //   // ...
      // }
      // The signed-in user info.
      const { user } = result;
      return user;
    } catch (error) {
      // Handle Errors here.
      debugger;
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const { email } = error;
      // The firebase.auth.AuthCredential type that was used.
      const errorCredential = error.credential;
      // ...
      return null;
    }
  }

  getCurrentUser(): app.User|null {
    return this.auth.currentUser;
  }

  isLoggedIn(): Boolean {
    return Boolean(this.auth.currentUser && this.auth.currentUser.email);
  }

  // TODO: signout
}

export default new Firebase();
