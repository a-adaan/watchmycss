// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeymQSbobfaDZLjVWBTgjNrxj3prbAaa4",
  authDomain: "watch-my-css.firebaseapp.com",
  projectId: "watch-my-css",
  storageBucket: "watch-my-css.appspot.com",
  messagingSenderId: "434551459467",
  appId: "1:434551459467:web:c92bc3d83b11d31ac88e8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
