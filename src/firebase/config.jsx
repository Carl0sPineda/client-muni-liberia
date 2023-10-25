// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoi2zKCiV8NAQHLoIJfxpF0aZUdSPU1qc",
  authDomain: "muni-liberia.firebaseapp.com",
  projectId: "muni-liberia",
  storageBucket: "muni-liberia.appspot.com",
  messagingSenderId: "581781470755",
  appId: "1:581781470755:web:2add945dfbefe195743b96",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
