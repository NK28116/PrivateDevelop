import {initializeApp} from 'firebase/app'
import {initializeAuth,getReactNativePersistence,getAuth} from 'firebase/auth'//公式のバグ．typescriptの型情報を読み込めていない
import {getFirestore} from 'firebase/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: "AIzaSyCapQFQ0xvLlS_aeQeWyEPHBFAkfqN1lqc",
  authDomain: "memoapp-ae56e.firebaseapp.com",
  projectId: "memoapp-ae56e",
  storageBucket: "memoapp-ae56e.firebasestorage.app",
  messagingSenderId: "440811944861",
  appId: "1:440811944861:web:0552d8e5077903328fcd74"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})
const db =getFirestore(app)

export {app,auth,db}