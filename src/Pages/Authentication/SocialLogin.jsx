import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import  { useState } from 'react';

import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
// import { auth } from '../firebase/firebase.init';
import {  useLocation, useNavigate } from 'react-router';
import { auth } from '../../firebase/firebase.init';
// import { Navigate } from 'react-router';
const SocialLogIn = () => {
    const [user, setUser]= useState(null);
      const location = useLocation();
  const navigate = useNavigate();
    const provider = new GoogleAuthProvider
const handleGoogleSign = ()=>{
    // console.log("google sign in is clicked");
    signInWithPopup(auth, provider)
    .then(result => {
    //    console.log(result.user);
       setUser(result.user)
    })
    .catch(error =>{
        console.log(error)
    })
      navigate(`${location.state ? location.state : "/"}`)
      

toast.success("You Successfully log in with your google account")
 
}
//    Navigate(`${location.state ? location.state : "/"}`)
    return (
        <div>
             <button onClick={handleGoogleSign} className="btn bg-[#efeeb4] text-amber-700 hover:bg-amber-700 hover:text-white w-full">
                      <FcGoogle size={24} /> Login with Google
                    </button>
        </div>
    );
};

export default SocialLogIn;