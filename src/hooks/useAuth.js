// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { 
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signOut,
  onAuthStateChanged
} from '../firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(getFirebaseError(error.code));
    }
  };

  const socialLogin = async (provider, token) => {
    try {
      let providerInstance;
      switch(provider) {
        case 'google':
          providerInstance = new GoogleAuthProvider();
          if (token) {
            providerInstance.addScope('email');
            providerInstance.addScope('profile');
            const credential = GoogleAuthProvider.credential(token);
            return await signInWithPopup(auth, providerInstance, credential);
          }
          break;
        case 'github':
          providerInstance = new GithubAuthProvider();
          break;
        case 'apple':
          providerInstance = new OAuthProvider('apple.com');
          break;
        default:
          throw new Error('Unsupported provider');
      }
      return await signInWithPopup(auth, providerInstance);
    } catch (error) {
      throw new Error(getFirebaseError(error.code));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getFirebaseError = (code) => {
    switch(code) {
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-disabled':
        return 'Account disabled';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password';
      case 'auth/account-exists-with-different-credential':
        return 'Account already exists with different credential';
      case 'auth/popup-closed-by-user':
        return 'Login popup was closed';
      case 'auth/cancelled-popup-request':
        return 'Popup sign in was cancelled';
      case 'auth/popup-blocked':
        return 'Popup was blocked by your browser';
      default:
        return 'Login failed. Please try again.';
    }
  };

  return { 
    user, 
    loading,
    login, 
    socialLogin, 
    logout 
  };
};