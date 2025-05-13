// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf8-QcjALt97p8U3nry0heeRY8iR3H86o",
  authDomain: "my-app-zd2000.firebaseapp.com",
  projectId: "my-app-zd2000",
  storageBucket: "my-app-zd2000.firebasestorage.app",
  messagingSenderId: "53731501732",
  appId: "1:53731501732:web:68b8afb205ecb4c240e831",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase App Check
// @ts-ignore
self.FIREBASE_APPCHECK_DEBUG_TOKEN = false;

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Ldtyi8rAAAAAOCoPhHZDowci_O1JquCNxCRf9JE"), // Replace with your reCAPTCHA v3 site key
  isTokenAutoRefreshEnabled: true, // Automatically refresh tokens to keep the session valid
});

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();