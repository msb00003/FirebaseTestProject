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

app.initializeApp(firebaseConfig);
console.warn('Initialized firebase');

// TODO: split this into logical chunks, keeping as is for Auth for now.
class Firebase {
  private auth: app.auth.Auth;

  constructor() {
    this.auth = app.auth();
  }

  signInWithGoogle() {
    // https://firebase.google.com/docs/auth/web/google-signin
    this.auth.useDeviceLanguage();
    // TODO: nicer import for this rather than global?
    const provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithRedirect(provider);
  }

  async getUserIfLoggedInFromRedirect(): Promise<app.User | null> {
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

  getCurrentUser(): app.User | null {
    return this.auth.currentUser;
  }

  isLoggedIn(): Boolean {
    return Boolean(this.auth.currentUser && this.auth.currentUser.email);
  }

  // TODO: signout
}

const COUNTER_COLLECTION_ID = "counter_col"
const COUNTER_DOCUMENT_ID = "counter_doc"

interface CounterData {
  count: number;
}

class Database {
  private db: app.firestore.Firestore;

  constructor() {
    this.db = app.firestore();
  }

  // async writeSomething() {
  //   // TODO: I fully expect this to fail for Auth reasons... it did not, firestore.rules is open...
  //   this.db.collection("users").add({
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815,
  //   })
  //   .then(function(docRef) {
  //       console.log("Document written with ID: ", docRef.id);
  //   })
  //   .catch(function(error) {
  //       console.error("Error adding document: ", error);
  //   });
  // }

  // async readSomething() {
  //   this.db.collection("users").get().then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //         console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  //     });
  //   });
  // }

  
  fetchAndListenToCounter(callbackFunc: Function) {
    const wrappedCallBackFunc = (data: CounterData) => {
      callbackFunc(data.count)
    }
    this.listenForChange(COUNTER_COLLECTION_ID, COUNTER_DOCUMENT_ID, wrappedCallBackFunc);
  }

  async setCounter(newCounterValue: number) {
    // TODO: does this need to be an increment? Components should have it.
    const newData: CounterData = {
      count: newCounterValue,
    }

    this.updateDocument(COUNTER_COLLECTION_ID, COUNTER_DOCUMENT_ID, newData)
  }

  private async updateDocument(collectionId: string, documentId: string, newData: Object): Promise<void> {
    return this.db.collection(collectionId).doc(documentId).set(newData);
  }

  private listenForChange(collectionId: string, documentId: string, callbackFunc: Function) {
    // Note: this will fetch immediately as well.
    this.db.collection(collectionId).doc(documentId).onSnapshot(
      (doc) => callbackFunc(doc.data())
    );
  }

  // TODO: support removing listeners.
}

class Storage {
  private storage: app.storage.Storage;
  
  constructor() {
    this.storage = app.storage()
  }

  uploadFile() {
    
  } // so... yah.
}

const database = new Database();
export { database };
// TODO: migrate both to named import, 
//  may restructure the Firebase class to be Auth specific
//  that would also make it easier to swap providers as there could be a decent interface
//  especially so in Typescript if I were to write one.
export default new Firebase();


