
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDgUgXCp6e2ebP1Sw6F5eX9aRptSkkwZ0M",
  authDomain: "gamelanguage-42e65.firebaseapp.com",
  projectId: "gamelanguage-42e65",
  storageBucket: "gamelanguage-42e65.firebasestorage.app",
  messagingSenderId: "124577574604",
  appId: "1:124577574604:web:d08a26a32c724e95959c69",
  measurementId: "G-LF567D15LM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);