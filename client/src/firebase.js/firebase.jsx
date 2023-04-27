// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvvMM7OOOoA5zkyKRzbqYMytllG1j2frU",
  authDomain: "yummers-7c3d1.firebaseapp.com",
  projectId: "yummers-7c3d1",
  storageBucket: "yummers-7c3d1.appspot.com",
  messagingSenderId: "21777330572",
  appId: "1:21777330572:web:64a4fef0847875a99566a9",
  measurementId: "G-E7VVBKSL3H",
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
  alert(phonenumber)
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

