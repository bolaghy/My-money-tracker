import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyASgXvfv4-NQMz78Ye2Lei1xKkpKRclraY",
  authDomain: "my-money-tracker-8bcf3.firebaseapp.com",
  projectId: "my-money-tracker-8bcf3",
  storageBucket: "my-money-tracker-8bcf3.firebasestorage.app",
  messagingSenderId: "1034404619558",
  appId: "1:1034404619558:web:3c62d726ca7da8a56a4de7",
};

const app = initializeApp(firebaseConfig);

// ✅ Use AsyncStorage for persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});