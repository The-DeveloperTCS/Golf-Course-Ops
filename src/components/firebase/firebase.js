import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAfb3ytv1qMeUGQc_DmCQ1rXTbSaEFI9Xg",
  authDomain: "dukkan-22962.firebaseapp.com",
  databaseURL: "https://dukkan-22962-default-rtdb.firebaseio.com",
  projectId: "dukkan-22962",
  storageBucket: "dukkan-22962.appspot.com",
  messagingSenderId: "1006485820052",
  appId: "1:1006485820052:web:953b6f194670a8c8661a81",
  measurementId: "G-Q9BB8B9LG1",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
