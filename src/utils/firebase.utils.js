// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvRyaUYbHx3Dh9UlpsiLFHpL_PQaW6rlw",
  authDomain: "puppies-73f50.firebaseapp.com",
  projectId: "puppies-73f50",
  storageBucket: "puppies-73f50.appspot.com",
  messagingSenderId: "440126043077",
  appId: "1:440126043077:web:61de01180ea97d617b11ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Sign out the current user
export const signOutCurrentUser = async () => {
    return await signOut(auth);
    // signOut(auth)
    // .then(() => {
    //   // The user is signed out.
    //   console.log('out')
    // })
    // .catch((error) => {
    //   // Handle sign-out errors
    // });
     
  };

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    
    // .then((userCredential) => {
    //     // User created successfully.
    //     const user = userCredential.user;
    //     console.log("User created:", user.uid);
    // })
    // .catch((error) => {
    //     // Handle errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.error("Error creating user:", errorCode, errorMessage);
    // });
    return await createUserWithEmailAndPassword(auth, email, password);
}