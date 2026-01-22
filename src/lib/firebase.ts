import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCahAMFt4RsFp1B3BM_wgoTmU6hAYHexT4",
    authDomain: "club-registration-a5631.firebaseapp.com",
    projectId: "club-registration-a5631",
    storageBucket: "club-registration-a5631.firebasestorage.app",
    messagingSenderId: "346699997684",
    appId: "1:346699997684:web:d78c5c1766b05e751719a1"
};

// Initialize Firebase (singleton pattern to avoid duplicate apps)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export Firestore instance
export const db = getFirestore(app);
