// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg3xlP50TY1ur_2zw_8sBPzxTyZPAKnQI",
  authDomain: "sr-smart-deals.firebaseapp.com",
  projectId: "sr-smart-deals",
  storageBucket: "sr-smart-deals.firebasestorage.app",
  messagingSenderId: "837997602355",
  appId: "1:837997602355:web:731c97778ed2bbd0b82546",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;