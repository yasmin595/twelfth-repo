import React, { useEffect, useState } from "react";


import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import app  from "../firebase/firebase.init";
import axios from "axios";
// import App from "../App";
// import app from "../firebase/firebase.init";
// import { AuthContext } from "./AuthContext";
// import app from "../../firebase/firebase.init";



const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(loading, user);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOut = () => {
    return signOut(auth);
  };

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    setLoading(false);

    // 🔐 If user is logged in, request JWT and store
    if (currentUser?.email) {
      const userData = { email: currentUser.email };

      try {
        const res = await axios.post("http://localhost:5000/jwt", userData);
        const token = res.data.token;
        localStorage.setItem("access-token", token);
      } catch (error) {
        console.error("JWT fetch error:", error);
      }
    } else {
      // ❌ If logged out, remove token
      localStorage.removeItem("access-token");
    }
  });

  return () => {
    unsubscribe();
  };
}, []);


  const authData = {
    user,
    setUser,
    createUser,
    logOut,
    signIn,
    loading,
    setLoading,
    updateUser,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider; 