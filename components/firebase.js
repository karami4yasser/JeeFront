// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import "firebase/auth";
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDwpTgHXSRUd3BjypUl2BL8-nSLJ-GCZeA",
  authDomain: "challenge-7313f.firebaseapp.com",
  projectId: "challenge-7313f",
  storageBucket: "challenge-7313f.appspot.com",
  messagingSenderId: "994543207441",
  appId: "1:994543207441:web:eeb30a31a50969a70dddb0",
  measurementId: "G-3CLCQM9P70",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
export { auth, db };
