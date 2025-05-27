import {initializeApp} from 'firebase/app'
import {initializeAuth,getReactNativePersistence,getAuth} from 'firebase/auth'//公式のバグ．typescriptの型情報を読み込めていない
import {getFirestore} from 'firebase/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FB_MASSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FB_APP_ID,
  };

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

const auth = getAuth(app);
/*
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
*/
const db =getFirestore(app)

//export {app,auth,db}