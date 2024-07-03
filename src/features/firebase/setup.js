// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN7CBOasB3CCYw20S9_hMk0swcTIe-sao",
  authDomain: "asha-tai.firebaseapp.com",
  projectId: "asha-tai",
  storageBucket: "asha-tai.appspot.com",
  messagingSenderId: "42978829605",
  appId: "1:42978829605:web:44ba2043edb51714d6a6cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
