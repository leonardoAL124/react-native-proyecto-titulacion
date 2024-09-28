import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMD8ORQfwaOolOSkOorAJV53YqvWn0RPg",
  authDomain: "usersadmin-cplx.firebaseapp.com",
  projectId: "usersadmin-cplx",
  storageBucket: "usersadmin-cplx.appspot.com",
  messagingSenderId: "883152156770",
  appId: "1:883152156770:web:33b377f4ade08cde17f93b",
  databaseURL: "https://usersadmin-cplx-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const dbRealTime = getDatabase(app);