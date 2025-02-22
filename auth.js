import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    console.log("auth.js loaded"); // Debugging

    // Registration
    document.getElementById("register-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Registration successful!");
            window.location.href = "dashboard.html";
        } catch (error) {
            alert("Error: " + error.message);
        }
    });

    // Login
    document.getElementById("login-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } catch (error) {
            alert("Error: " + error.message);
        }
    });

    // Authentication State Listener
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is logged in:", user.email);
        } else {
            console.log("User is logged out");
        }
    });
});
