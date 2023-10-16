// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKomh0puGtIc0SE45d1CuHrxqey0OeNb0",
  authDomain: "ecommerce-1ff11.firebaseapp.com",
  projectId: "ecommerce-1ff11",
  storageBucket: "ecommerce-1ff11.appspot.com",
  messagingSenderId: "975523497276",
  appId: "1:975523497276:web:e90ee3b0ecb611dd9dca39",
  measurementId: "G-1DH5T9V8YT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
