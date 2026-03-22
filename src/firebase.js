// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPiFdqvClGKBgq34alX1bM_EL_i0evljM",
  authDomain: "hanumant-hostel-c34ee.firebaseapp.com",
  projectId: "hanumant-hostel-c34ee",
  storageBucket: "hanumant-hostel-c34ee.firebasestorage.app",
  messagingSenderId: "526586901478",
  appId: "1:526586901478:web:ee748699650f4b1b949c27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ ADD THIS
export const auth = getAuth(app);
