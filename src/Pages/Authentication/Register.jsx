import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Link, useLocation, useNavigate } from 'react-router';

import axios from 'axios';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import SocialLogIn from './SocialLogin';


const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUser} = useAuth();
  const [profilePic, setProfilePic] = useState('');
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const onSubmit = data => {
    createUser(data.email, data.password)
      .then(async (result) => {
        // Save user info in backend
        const userInfo = {
          email: data.email,
          role: 'user',
          
           photoURL:profilePic,
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        };

        await axiosInstance.post('/users', userInfo);

        // Update Firebase profile
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic
        };
        updateUser(userProfile)
          .then(() => {
            navigate(from);
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    try {
      const res = await axios.post(uploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-green-400 p-6">
      <div className="card bg-white shadow-2xl rounded-lg w-full max-w-md p-8">
        <h1 className="text-4xl font-extrabold text-green-800 mb-8 text-center">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-600 ${
                errors.name ? 'border-red-500' : ''
              }`}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-red-600 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            {profilePic && (
              <img
                src={profilePic}
                alt="Profile Preview"
                className="mt-3 w-24 h-24 rounded-full object-cover mx-auto border-2 border-green-600"
              />
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-600 ${
                errors.email ? 'border-red-500' : ''
              }`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-600 ${
                errors.password ? 'border-red-500' : ''
              }`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600 mt-1 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-wide bg-green-600 hover:bg-green-700 text-white font-bold transition duration-300"
          >
            Register
          </button>
        </form>
          <SocialLogIn></SocialLogIn>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-700 font-semibold hover:underline">
            Login
          </Link>
        </p>

        <div className="mt-6">
   
        </div>
      </div>
    </div>
  );
};

export default Register;
