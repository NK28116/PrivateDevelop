// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth,getReactNativePersistence,getAuth} from 'firebase/auth'
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
const app = initializeApp(firebaseConfig);
const db =getFirestore(app)



const auth = getAuth(app)





export {app,auth,db}