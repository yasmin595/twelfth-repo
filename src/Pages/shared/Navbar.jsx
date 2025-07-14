import React, { useState} from 'react';
import { Link, NavLink } from 'react-router'; 
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';


const Navbar = () => {
    const { user, logOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("You logged out successfully");
        setShowDropdown(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? 'text-green-800 underline font-semibold' : ''}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/available-camps" className={({ isActive }) => isActive ? 'text-green-800 underline font-semibold' : ''}>Available Camps</NavLink>
      </li>
    </>
  );

  return (
    <div className='bg-gray-100 sticky top-0 z-50'>
      <div className="navbar bg-base-100 shadow-sm px-4 md:px-10">
        {/* Left: Logo + Name */}
        <div className="navbar-start">
          <Link to="/" className="text-green-800 font-bold text-2xl">MCMS</Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3">
            {navLinks}
          </ul>
        </div>

        {/* Right: Auth/Profile */}
        <div className="navbar-end">
          {!user ? (
            <Link to="/auth/register" className="btn bg-green-100 text-green-800 hover:bg-green-800 hover:text-white">
              Join Us
            </Link>
          ) : (
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={user?.photoURL}
                alt="User"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg z-50 p-2">
                  <p className="text-sm font-semibold text-gray-800 px-2 py-1">{user?.displayName}</p>
                  <hr className="my-1" />
                  <Link to="/dashboard" className="block px-2 py-1 hover:bg-gray-100 rounded">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="w-full text-left p-2 bg-[#efeeb4] text-amber-700 hover:bg-amber-700 hover:text-white rounded mt-1"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[99]">
            {navLinks}
            <li className="mt-2">
              {!user ? (
                <Link to="/auth/register" className="btn bg-green-100 text-green-800 hover:bg-green-800 hover:text-white w-full">
                  Join Us
                </Link>
              ) : (
                <>
                  <p className="text-sm font-semibold text-gray-800 px-2 py-1">{user?.displayName}</p>
                  <Link to="/dashboard" className="block px-2 py-1 hover:bg-gray-100 rounded">Dashboard</Link>
                  <button
                    onClick={handleLogOut}
                    className="btn bg-[#efeeb4] text-amber-700 hover:bg-amber-700 hover:text-white w-full mt-2"
                  >
                    Logout
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
