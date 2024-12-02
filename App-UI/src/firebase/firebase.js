import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "diascore.firebaseapp.com",
  projectId: "diascore",
  storageBucket: "diascore.firebasestorage.app",
  messagingSenderId: "601991649829",
  appId: "1:601991649829:web:996ab01f7051d753f2bdcc",
  measurementId: "G-F6HWBKQV4T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
