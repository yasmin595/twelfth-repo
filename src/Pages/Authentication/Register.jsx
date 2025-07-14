import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Lottie from "lottie-react";
import registerLottie from "../../assets/lottie.json";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
// import { TabTitle } from "../utils/General";
// import { useAuth } from "../../hooks/useAuth"; // assuming you're using this

const Register = () => {
//   TabTitle("WhereIsIt-registrationPage");

  const { createUser, updateUser, setUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, photo, email, password } = data;

    const checkPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!checkPassword.test(password)) {
      toast.error(
        "Password must include uppercase, lowercase, number and at least 6 characters"
      );
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateUser({ displayName: name, photoURL: photo });
      setUser({ ...user, displayName: name, photoURL: photo });

      toast.success("Congratulations! You successfully registered");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <div className="md:flex justify-center min-h-screen items-center gap-12">
      <div>
        <Lottie className="w-[250px]" animationData={registerLottie} loop={true} />
      </div>

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold text-green-800 text-2xl text-center">
          Register your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <fieldset className="fieldset space-y-2">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="input"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 5,
                  message: "Name should be at least 5 characters",
                },
              })}
            />
            {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}

            {/* Photo URL */}
            <label className="label">Photo URL</label>
            <input
              type="text"
              placeholder="Photo URL"
              className="input"
              {...register("photo", { required: "Photo URL is required" })}
            />
            {errors.photo && <p className="text-xs text-error">{errors.photo.message}</p>}

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}

            {/* Password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input w-full"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-2 top-2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-error">{errors.password.message}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="btn hover:bg-green-800 hover:text-white bg-green-100 text-green-800 mt-4"
            >
              Register
            </button>
        

            <p className="font-semibold text-center pt-5">
              Already Have An Account?{" "}
              <Link className="text-green-800" to="/auth/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
