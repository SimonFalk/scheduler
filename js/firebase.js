import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDaBR9TdxPHahpeqbn41Dh7vxzqvmkCRaw",
  authDomain: "skurat.firebaseapp.com",
  databaseURL: "https://skurat-default-rtdb.firebaseio.com/",
  projectId: "skurat",
  storageBucket: "skurat.appspot.com",
  messagingSenderId: "986460938097",
  appId: "1:986460938097:web:75b5f7bb2ffe744da920d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { auth, database };
