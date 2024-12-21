import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyATX5NG1B6cdYMCyWeeGABrOi3begUFXCg",
    authDomain: "my-signin-15ab7.firebaseapp.com",
    projectId: "my-signin-15ab7",
    storageBucket: "my-signin-15ab7.firebasestorage.app",
    messagingSenderId: "349794486227",
    appId: "1:349794486227:web:29d0464bd850ff67799126",
    measurementId: "G-P47EGTHNTL"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Current path:", window.location.pathname);


if (document.querySelector('form')) {
    const form = document.querySelector('form');
    console.log("Form found:", form);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("Form submitted");

        
        if (document.getElementById('name')) {
            console.log("Processing signup...");
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            const signUpMessage = document.getElementById("signUPMessage");
            
            console.log("Signup data collected:", { name, email });

            if (password !== confirmPassword) {
                signUpMessage.style.display = "block";
                signUpMessage.textContent = "Passwords do not match!";
                signUpMessage.style.color = "red";
                return;
            }

            try {
                console.log("Creating user account...");
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log("User created successfully:", user.uid);

                await setDoc(doc(db, "users", user.uid), {
                    fullName: name,
                    email: email,
                    signUpDate: new Date().toISOString()
                });
                console.log("User data stored in Firestore");

                signUpMessage.style.display = "block";
                signUpMessage.textContent = "Sign-Up successful! Redirecting to login page...";
                signUpMessage.style.color = "green";

                console.log("Starting redirect countdown...");
                setTimeout(() => {
                    console.log("Redirecting to login page...");
                    window.location.replace("log.html");
                }, 2000);

            } catch (error) {
                console.error("Signup error:", error);
                signUpMessage.style.display = "block";
                signUpMessage.textContent = `Error: ${error.message}`;
                signUpMessage.style.color = "red";
            }
        } 
    
        else {
            console.log("Processing login...");
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            let loginMessage = document.getElementById("loginMessage");

            if (!loginMessage) {
                loginMessage = document.createElement("div");
                loginMessage.id = "loginMessage";
                form.insertBefore(loginMessage, form.firstChild);
            }

            try {
                console.log("Attempting login...");
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log("Login successful:", user.uid);

                loginMessage.style.display = "block";
                loginMessage.textContent = "Login successful! Redirecting...";
                loginMessage.style.color = "green";

                console.log("Starting redirect countdown...");
                setTimeout(() => {
                    console.log("Redirecting to main page...");
                    window.location.replace("main.html"); 
                }, 2000);

            } catch (error) {
                console.error("Login error:", error);
                loginMessage.style.display = "block";
                loginMessage.textContent = "Invalid email or password";
                loginMessage.style.color = "red";
            }
        }
    });
}


auth.onAuthStateChanged((user) => {
    console.log("Auth state changed. User:", user ? user.uid : "null");
    if (window.location.pathname.includes('main.html') && !user) {  
        console.log("Unauthorized access to main page. Redirecting to login...");
        window.location.replace("login.html");
    }
});