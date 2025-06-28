import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl9F8vHJxyNMR9lumwED8A7a6e5iiKb78",
  authDomain: "andys-healthcare.firebaseapp.com",
  projectId: "andys-healthcare",
  storageBucket: "andys-healthcare.firebasestorage.app",
  messagingSenderId: "840331530360",
  appId: "1:840331530360:web:a1df986b79fcb7cd63dd8d",
  measurementId: "G-0P119HS7Y8"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);/
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
