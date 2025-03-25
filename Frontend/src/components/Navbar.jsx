import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the saved token
    navigate('/'); // Redirect to login
  };

  // Hide Navbar on login page
  if (location.pathname === "/") return null;
  if (location.pathname === "/register") return null;

  return (
    <div className="relative w-full">
      <div onClick={handleLogout} className="absolute shadow-2xl right-7 top-[2px] text-white bg-red-600 hover:bg-blue-800 transition duration-300 px-4 py-2 rounded cursor-pointer">
        Logout
      </div>
    </div>
  );
};

export default Navbar;
