// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiJ5mgdgi3-bEF2BiydvpIb9GDz1VV8ac",
  authDomain: "azamat-cv.firebaseapp.com",
  projectId: "azamat-cv",
  storageBucket: "azamat-cv.firebasestorage.app",
  messagingSenderId: "815534384636",
  appId: "1:815534384636:web:e4a382f3a953efb5afbe79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);