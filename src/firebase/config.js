import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTzeUc5kuHCVbEhrmUcr_fPiFnxYirhOo",
  authDomain: "hrgroupsukses-b99ff.firebaseapp.com",
  databaseURL:
    "https://hrgroupsukses-b99ff-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hrgroupsukses-b99ff",
  storageBucket: "hrgroupsukses-b99ff.firebasestorage.app",
  messagingSenderId: "848559697458",
  appId: "1:848559697458:web:6eb581cff85dd6042c962b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
