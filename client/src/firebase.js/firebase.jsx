// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: ""+process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function recaptcha() {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: () => {
        // onSigninssubmit()
      },
    },
    auth
  );
}

export function onSigninssubmit(phonenumber) {
  const appVerifier = window.recaptchaVerifier;
  return new Promise((resolve, reject) => {
    signInWithPhoneNumber(auth, phonenumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(window.confirmationResult)
        resolve();
      })
      .catch((err) => {
        alert(err)
        reject(err);
      });
  });
}

