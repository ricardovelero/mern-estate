// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-xyz.firebaseapp.com",
  projectId: "mern-estate-xyz",
  storageBucket: "mern-estate-xyz.appspot.com",
  messagingSenderId: "682894861862",
  appId: "1:682894861862:web:c35f53afaece0c863ba8e7",
  measurementId: "G-7F51Y61LW5",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
