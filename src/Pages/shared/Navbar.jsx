import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("You logged out successfully");
        setShowDropdown(false);
        setIsMobileMenuOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-800 font-bold underline" : "text-gray-700"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/available-camps"
          className={({ isActive }) =>
            isActive ? "text-green-800 font-bold underline" : "text-gray-700"
          }
        >
          Available Camps
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/feedback"
          className={({ isActive }) =>
            isActive ? "text-green-800 font-bold underline" : "text-gray-700"
          }
        >
          Feedback
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-gray-100 sticky top-0 z-50">
      <div className="navbar bg-base-100 shadow-sm px-4 md:px-10">
        {/* Left: Logo */}
        <div className="navbar-start">
          <Link to="/" className="text-2xl font-bold text-green-700">
            MCMS
          </Link>
        </div>

        {/* Center: Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">{navLinks}</ul>
        </div>

        {/* Right: Desktop Auth/Profile */}
        <div className="navbar-end hidden lg:flex">
          {!user ? (
            <Link
              to="/auth/register"
              className="btn bg-green-100 text-green-800 hover:bg-green-700 hover:text-white"
            >
              Join Us
            </Link>
          ) : (
            <div className="relative">
              <img
                onClick={() => setShowDropdown(!showDropdown)}
                src={user?.photoURL}
                alt="user"
                className="w-10 h-10 rounded-full cursor-pointer border border-green-600"
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg z-50">
                  <p className="px-4 py-2 font-medium text-gray-800">
                    {user.displayName}
                  </p>
                  <hr />
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <ul className="menu menu-vertical px-4 py-2 space-y-2">{navLinks}</ul>
          <div className="px-4 pb-4">
            {!user ? (
              <Link
                to="/auth/register"
                className="btn bg-green-100 text-green-800 hover:bg-green-700 hover:text-white w-full"
              >
                Join Us
              </Link>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">
                  {user.displayName}
                </p>
                <Link
                  to="/dashboard"
                  className="block px-2 py-1 hover:bg-gray-100 rounded"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogOut}
                  className="btn bg-red-100 text-red-700 hover:bg-red-700 hover:text-white w-full"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
