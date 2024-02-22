

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js"
import { createUserWithEmailAndPassword, getAuth } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyBXGDpGLkoxPHaMGIG-E6GxviDDssv-97c",
  authDomain: "thesis-268ea.firebaseapp.com",
  projectId: "thesis-268ea",
  storageBucket: "thesis-268ea.appspot.com",
  messagingSenderId: "1065392850994",
  appId: "1:1065392850994:web:023a10aca1806650fd142b",
  measurementId: "G-XHJ0ES966N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Access the authentication functionality
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function () {
    // Get the submit button element by ID
    const submitButton = document.getElementById('submit');
    console.log(submitButton)
    // Add a click event listener to the submit button
    submitButton.addEventListener('click', function () {
        signUp();
    });

    // Your existing code


    // ... rest of your code
})
function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
   


    // Sign in with email and password
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      sendTokenToServer(user.accessToken)
      // ...
    })
    .catch((error) => {
      console.log(error)
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

function sendTokenToServer(idToken) {
    
    const serverEndpoint = 'http://localhost:3000/auth/register';

    // Make an HTTP POST request to the server
    fetch(serverEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: idToken}),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Server accepted the ID token
        console.log('ID Token sent to server successfully');
    
        return response.json(); // Assuming the server sends a JSON response
    })
    .then(data => {
        // Handle the server's response
        if (data.status === 'success') {
            // Redirect to another page
            window.location.href = '/auth/login';
        } else {
            // Display an error message
            alert('Server error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error sending ID token to server:', error.message);
        // Display an error message
        alert('Error sending ID token to server');
    });
}
