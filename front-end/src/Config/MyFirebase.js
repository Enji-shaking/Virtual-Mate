import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDcmQtOje_yTFxq6_aIiMhsB1yVyx-yZB4",
    authDomain: "virtual-mate-735d0.firebaseapp.com",
    databaseURL: "https://virtual-mate-735d0.firebaseio.com",
    projectId: "virtual-mate-735d0",
    storageBucket: "virtual-mate-735d0.appspot.com",
    messagingSenderId: "604795823558",
    appId: "1:604795823558:web:46f59c5dda077dd878bec7",
}
firebase.initializeApp(config)
firebase.analytics();

export const myFirebase = firebase
export const myFirestore = firebase.firestore()
export const myStorage = firebase.storage()
