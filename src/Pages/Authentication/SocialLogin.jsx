import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import { auth } from '../../firebase/firebase.init';
import useAxios from '../../hooks/useAxios';

const SocialLogIn = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  const from = location.state?.from || '/';

  const handleGoogleSign = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Prepare user info for backend
      const userInfo = {
        email: user.email,
        role: 'user', // default role
        photoURL: user.photoURL,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString()
      };

      // Save or update user in your backend
      await axiosInstance.post('/users', userInfo);

      toast.success("You successfully logged in with Google!");
      navigate(from);
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      toast.error("Google login failed. Try again.");
    }
  };

  return (
    <div className="text-center mt-4">
      <p className="mb-2 text-gray-500">OR</p>
      <button
        onClick={handleGoogleSign}
        className="btn bg-[#efeeb4] text-amber-700 hover:bg-amber-700 hover:text-white w-full flex items-center gap-2 justify-center"
      >
        <FcGoogle size={24} /> Login with Google
      </button>
    </div>
  );
};

export default SocialLogIn;
