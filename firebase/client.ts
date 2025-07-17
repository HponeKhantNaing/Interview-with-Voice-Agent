// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKDH5DlPDvb46drQknzNZwJSt9jPJFA24",
  authDomain: "prepwise-298aa.firebaseapp.com",
  projectId: "prepwise-298aa",
  storageBucket: "prepwise-298aa.firebasestorage.app",
  messagingSenderId: "379418810550",
  appId: "1:379418810550:web:deecaad11fc26039ff2e17",
  measurementId: "G-BWD87E7SVP",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
