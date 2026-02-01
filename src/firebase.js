import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDmGKBpvFcyJvxGV8U2CRtmt-484aLOVRQ",
  authDomain: "civicconnect-4e717.firebaseapp.com",
  projectId: "civicconnect-4e717",
  storageBucket: "civicconnect-4e717.firebasestorage.app",
  messagingSenderId: "739216785619",
  appId: "1:739216785619:web:97310787f518b134dc1426"
};

const app = initializeApp(firebaseConfig);

// ✅ EXPORT EVERYTHING
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
