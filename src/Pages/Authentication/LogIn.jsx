import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import SocialLogIn from "./SocialLogIn";
import Lottie from "lottie-react";
import logLottie from "../../assets/lottie.json";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
// import { TabTitle } from "../utils/General";


const LogIn = () => {
//   TabTitle("WhereIsIt-loginPage");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    const { email, password } = data;

    const checkPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!checkPassword.test(password)) {
      toast.error(
        "Password must have one lowercase, one uppercase, one digit and be at least 6 characters"
      );
      return;
    }

    try {
      const result = await signIn(email, password);
      console.log(result.user)
      toast.success("Successfully logged in!");
      navigate(location.state || "/");
    } catch (err) {
      setFirebaseError(err.code);
      toast.error(err.code);
    }
  };

  return (
    <div className="md:flex justify-center min-h-screen items-center">
      <div className="mx-8">
        <Lottie className="w-[250px]" animationData={logLottie} loop={true} />
      </div>

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold text-green-800 text-2xl text-center">
          Login your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <fieldset className="fieldset space-y-2">
            {/* Email Field */}
            <label className="label">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="input"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-xs text-error">{errors.email.message}</p>
            )}

            {/* Password Field */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                className="input w-full"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-2 top-2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-error">{errors.password.message}</p>
            )}

            {/* Firebase Error */}
            {firebaseError && (
              <p className="text-red-400 text-xs">{firebaseError}</p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="btn hover:bg-green-800 hover:text-white bg-green-100 text-green-800 mt-4"
            >
              Login
            </button>

            {/* Social Login */}
         <SocialLogin></SocialLogin>

            <p className="font-semibold text-center pt-5">
              Don't Have An Account?{" "}
              <Link to="/auth/register" className="text-green-800">
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
