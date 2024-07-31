// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSEFcHJ2U6pENJRmcWDQOsbOkk0WXm6QM",
  authDomain: "inventory-app-238d5.firebaseapp.com",
  projectId: "inventory-app-238d5",
  storageBucket: "inventory-app-238d5.appspot.com",
  messagingSenderId: "422836340520",
  appId: "1:422836340520:web:0e3ebc963f30aeae72b21d",
  measurementId: "G-7WVBHHJPLH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
