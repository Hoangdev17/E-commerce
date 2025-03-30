// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4TWmaYF8Ghp6q-XLW2rxkVpDvhlWKsQ4",
  authDomain: "e-commerce-55743.firebaseapp.com",
  projectId: "e-commerce-55743",
  storageBucket: "e-commerce-55743.firebasestorage.app",
  messagingSenderId: "452889831192",
  appId: "1:452889831192:web:3ce046949f3b4ac8a0e06d",
  measurementId: "G-196ZZSF95G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();