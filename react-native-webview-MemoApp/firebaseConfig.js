// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import {initializeAuth,getReactNativePersistence,getAuth} from '@firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore'
//
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCapQFQ0xvLlS_aeQeWyEPHBFAkfqN1lqc",
  authDomain: "memoapp-ae56e.firebaseapp.com",
  projectId: "memoapp-ae56e",
  storageBucket: "memoapp-ae56e.firebasestorage.app",
  messagingSenderId: "440811944861",
  appId: "1:440811944861:web:0552d8e5077903328fcd74"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)
/*
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
*/
export const auth = getAuth(app)