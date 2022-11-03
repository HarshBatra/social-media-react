// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg1GSszoGqm3HlxDXDQ4y9IWSeXD6NlM8",
  authDomain: "socialmedia-react-afda5.firebaseapp.com",
  projectId: "socialmedia-react-afda5",
  storageBucket: "socialmedia-react-afda5.appspot.com",
  messagingSenderId: "109804848304",
  appId: "1:109804848304:web:a8406af626fbbff92da775",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
