import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-lg">
              ✦
            </div>
            <span className="text-xl font-semibold text-gray-900">FreelanceConnect</span>
          </Link>
          {/* Hamburger menu button for mobile */}
          <button
            className="sm:hidden flex flex-col justify-center items-center ml-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-black mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
          {/* Desktop menu */}
          <div className="hidden sm:flex items-center space-x-6">
            <Link to="/jobs" className="text-gray-600 hover:text-gray-900 font-medium">
              Browse Jobs
            </Link>
            <Link to="/post-job" className="text-gray-600 hover:text-gray-900 font-medium">
              Post a Job
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">
              Log in
            </Link>
            <Link 
              to="/signup" 
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors font-medium"
            >
              Sign up
            </Link>
            {/* Profile Icon */}
            <div className="relative group ml-4">
              <Link to="/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
                <span role="img" aria-label="Profile" className="text-xl">👤</span>
              </Link>
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden flex flex-col space-y-2 mt-4 animate-fade-in">
            <Link to="/jobs" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>
              Browse Jobs
            </Link>
            <Link to="/post-job" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>
              Post a Job
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMenuOpen(false)}>
              Log in
            </Link>
            <Link 
              to="/signup" 
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Sign up
            </Link>
            <div className="flex items-center mt-2">
              <Link to="/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors mr-2">
                <span role="img" aria-label="Profile" className="text-xl">👤</span>
              </Link>
              <button onClick={handleLogout} className="block text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
