// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATlv75R0TNtSQ7nZh9fi_zZjmNFVtBilo",
  authDomain: "trip-schedule-50129.firebaseapp.com",
  projectId: "trip-schedule-50129",
  storageBucket: "trip-schedule-50129.appspot.com",
  messagingSenderId: "53631166831",
  appId: "1:53631166831:web:6ef20f3592a28d398ea09a",
  measurementId: "G-D978245CR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

