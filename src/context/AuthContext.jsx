import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch or sync user profile from Firestore
  const fetchUserProfile = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
        return docSnap.data();
      } else {
        setUserProfile(null);
        return null;
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setUserProfile(null);
      return null;
    }
  };

  // Signup function (Email & Password)
  const signup = async (email, password, fullName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name in Firebase Auth
    if (fullName) {
      await updateProfile(user, { displayName: fullName });
    }

    // Save initial user details in Firestore
    const initialData = {
      uid: user.uid,
      fullName: fullName || '',
      email: email,
      phone: '',
      address: null,
      addressType: 'Home',
      profileCompleted: false,
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', user.uid), initialData);
    setUserProfile(initialData);
    return user;
  };

  // Login function (Email & Password)
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await fetchUserProfile(userCredential.user.uid);
    return userCredential.user;
  };

  // Complete / Update Profile (Phone, Address & Address Type)
  const completeProfile = async (profileData) => {
    if (!currentUser) throw new Error("No authenticated user found.");
    
    const updatedData = {
      phone: profileData.phone || '',
      address: {
        street: profileData.street || '',
        locality: profileData.locality || '',
        city: profileData.city || '',
        state: profileData.state || '',
        pincode: profileData.pincode || ''
      },
      addressType: profileData.addressType || 'Home',
      profileCompleted: true,
      updatedAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'users', currentUser.uid), updatedData, { merge: true });
    
    // Refresh user profile state
    await fetchUserProfile(currentUser.uid);
  };

  // Logout function
  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUserProfile(null);
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    completeProfile,
    logout,
    fetchUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
