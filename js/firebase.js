import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXW8GDkbqM9jZzYFbLYeN1MQb8t-wysug",
  authDomain: "cleaningschedule-fc3e1.firebaseapp.com",
  projectId: "cleaningschedule-fc3e1",
  storageBucket: "cleaningschedule-fc3e1.appspot.com",
  messagingSenderId: "910593614232",
  appId: "1:910593614232:web:9eaf9af4afc049e95e4bed",
  measurementId: "G-QQHWGWBMC2",
};

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  tosUrl: "/",
  privacyPolicyUrl: "/",
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      disableSignUp: {
        status: true,
        adminEmail: "klucidor@gmail.com",
        helpLink: undefined,
      },
    },
  ],
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, uiConfig };
