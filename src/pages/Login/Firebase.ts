
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 


const firebaseConfig = {
  apiKey: "AIzaSyDLGAWeLK8HcrZ9tOK6MRmaMDjvNDKtc24",
  authDomain: "learn-language-e8255.firebaseapp.com",
  projectId: "learn-language-e8255",
  storageBucket: "learn-language-e8255.firebasestorage.app",
  messagingSenderId: "930030718720",
  appId: "1:930030718720:web:82850fa929eb5b0ffd6de5",
  measurementId: "G-RG4KC4YDMV"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
