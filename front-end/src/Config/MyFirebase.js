import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAyyNkWhlDDw7Jb_U9xkUZt5NTbPWeTIZc",
    authDomain: "mark-test-11011.firebaseapp.com",
    databaseURL: "https://mark-test-11011.firebaseio.com",
    projectId: "mark-test-11011",
    storageBucket: "mark-test-11011.appspot.com",
    messagingSenderId: "458194135945",
    appId: "1:458194135945:web:e29fe96b944877f83ccf58",
}
firebase.initializeApp(config)
firebase.analytics();

export const myFirebase = firebase
export const myFirestore = firebase.firestore()
export const myStorage = firebase.storage()
