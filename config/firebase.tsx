import firebase from 'firebase'

/**
 * Firebase Configuration.
 */
const firebaseConfig = {
    apiKey: "AIzaSyDqFMSmFeGDVASr13cJfw_YdtI_JhFTUio",
    authDomain: "one-nation-3972c.firebaseapp.com",
    databaseURL: "https://one-nation-3972c.firebaseio.com",
    projectId: "one-nation-3972c",
    storageBucket: "one-nation-3972c.appspot.com",
    messagingSenderId: "975389306940",
    appId: "1:975389306940:web:cdd9b2d37ab92fb4761339"
};

const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase