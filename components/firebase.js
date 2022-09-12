// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import "firebase/auth";
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBAwAefx4Z0ydU9sK2A63oEiOQvD1NCcO0",
  authDomain: "stage1a-85133.firebaseapp.com",
  projectId: "stage1a-85133",
  storageBucket: "stage1a-85133.appspot.com",
  messagingSenderId: "598866263276",
  appId: "1:598866263276:web:404e1ecd8823dcc122f9c9"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
export { auth, db };
