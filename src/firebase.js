// src/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup,
    signOut,
    onAuthStateChanged

} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDGMWa7KmwHvuAtYkvlJvtBQ_jY6vuqN4U",
    authDomain: "test-1ef59.firebaseapp.com",
    projectId: "test-1ef59",
    storageBucket: "test-1ef59.firebasestorage.app",
    messagingSenderId: "381657429111",
    appId: "1:381657429111:web:28039ba0cbe9b2cc208272",
    measurementId: "G-938WWBHK3B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');

// Auth functions
export const registerWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const socialLogin = (provider) => {
  switch(provider) {
    case 'google':
      return signInWithPopup(auth, googleProvider);
    case 'github':
      return signInWithPopup(auth, githubProvider);
    case 'apple':
      return signInWithPopup(auth, appleProvider);
    default:
      throw new Error('Unsupported provider');
  }
};


export {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    OAuthProvider,
    signOut,
    onAuthStateChanged
}