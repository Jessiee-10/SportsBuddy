// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD4oYX1LaCQSQWdZBWTb-JqYUmUr5q-DdQ",
    authDomain: "sports-buddy-9094a.firebaseapp.com",
    projectId: "sports-buddy-9094a",
    storageBucket: "sports-buddy-9094a.firebasestorage.app",
    messagingSenderId: "1079215175613",
    appId: "1:1079215175613:web:b94903f22dd71b3bd304d4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
