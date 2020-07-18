import firebase from 'firebase'
import 'firebase/firestore'

/**
 * Firebase Configuration.
 */
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

const Firebase = firebase.initializeApp(firebaseConfig)

export const db = Firebase.firestore()


export default Firebase