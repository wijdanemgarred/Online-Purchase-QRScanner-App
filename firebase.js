// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdVny760pozjiQxcooxYXxeQ3ocQaA9Lo",
  authDomain: "reactapp-ca598.firebaseapp.com",
  projectId: "reactapp-ca598",
  storageBucket: "reactapp-ca598.firebasestorage.app",
  messagingSenderId: "915176352956",
  appId: "1:915176352956:web:0d99a96ca7a4f540b0f4b9",
  measurementId: "G-0N258N1JE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

//db 
const db = getFirestore(app);

export { db };