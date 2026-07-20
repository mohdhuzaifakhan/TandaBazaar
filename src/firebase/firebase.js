import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Optional Firebase configuration loaded from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyMockKeyForTandaBadliMarketplace",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "tanda-badli-marketplace.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "tanda-badli-marketplace",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "tanda-badli-marketplace.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "8433043426",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:8433043426:web:mockappid"
};

let app, auth, db, storage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.warn("Firebase initialization running in local mock state mode:", error);
}

export { app, auth, db, storage };
