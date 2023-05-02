// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5jYQEccnLXGYzGV2OwWogV7mLW38wIyU",
  authDomain: "realtor-clone-70f40.firebaseapp.com",
  projectId: "realtor-clone-70f40",
  storageBucket: "realtor-clone-70f40.appspot.com",
  messagingSenderId: "1088736685071",
  appId: "1:1088736685071:web:537bb0e7f4ba2342a1877a"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()