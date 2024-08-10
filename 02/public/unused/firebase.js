
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7SaJ8FJa_YmvEYSxxyZQEo-9eYSXfLOw",
  authDomain: "mailboxclient-e0122.firebaseapp.com",
  projectId: "mailboxclient-e0122",
  storageBucket: "mailboxclient-e0122.appspot.com",
  messagingSenderId: "184185144029",
  appId: "1:184185144029:web:167d7a1dc0169126829134",
  measurementId: "G-H3MLE85M3E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
