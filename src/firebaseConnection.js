import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBN3llxanS4bmLgpzl6Kyy3OF_VizfJ7Jk",
  authDomain: "curso-20cd8.firebaseapp.com",
  projectId: "curso-20cd8",
  storageBucket: "curso-20cd8.firebasestorage.app",
  messagingSenderId: "849914028913",
  appId: "1:849914028913:web:a2a568bc947ecac05c0cd0",
  measurementId: "G-3RN8H1YD5F",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
