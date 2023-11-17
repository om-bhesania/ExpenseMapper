// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTdyuWms1k_wGAn_E5nf-Q-b85fj0Q7fg",
    authDomain: "fintracker-bd5d5.firebaseapp.com",
    projectId: "fintracker-bd5d5",
    storageBucket: "fintracker-bd5d5.appspot.com",
    messagingSenderId: "356165031958",
    appId: "1:356165031958:web:34bb2b819b85cabeb13d37",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
