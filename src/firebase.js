// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbiHMitL2wiGAumKz-lyYUUWM4hNhJADc",
  authDomain: "realton-clone-react-690c7.firebaseapp.com",
  projectId: "realton-clone-react-690c7",
  storageBucket: "realton-clone-react-690c7.appspot.com",
  messagingSenderId: "102867139409",
  appId: "1:102867139409:web:76b1baa9e83bf19e64b170"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()