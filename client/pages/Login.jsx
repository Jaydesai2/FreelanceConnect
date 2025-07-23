import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    alert("Redirecting to Google login...");
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/profile");
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      alert("❌ Server error");
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10">
          <Link to="/" className="mb-5 flex items-center space-x-2">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-lg">
              ✦
            </div>
            <span className="text-xl font-semibold text-gray-900">FreelanceConnect</span>
          </Link>
        <div className="w-full max-w-md flex flex-col">
          <h2 className="text-3xl font-bold mb-4">Welcome back to FreeLance</h2>
          <p className="text-sm text-gray-500 mb-6">
            Log in to access your mission control
          </p>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 mb-5 hover:shadow-md hover:bg-gray-100 transition-all duration-200"
          >
            <FaGoogle className="text-xl text-gray-700" />
            <span className="text-sm text-gray-800 font-medium">
              Continue with Google
            </span>
          </button>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-400 text-sm">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <input
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4"
          />
          <div className="flex justify-between items-center text-sm mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot password
            </Link>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded-md hover:opacity-90"
          >
            Log in
          </button>
          <p className="text-sm mt-4 text-center">
            Don’t have an account?{' '}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline"
            >
              Create one for free
            </button>
          </p>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img
          src="/FreelanceJobIcon.png" 
          alt="Freelance Job"
          className="w-3/4 max-w-sm object-contain"
        />
      </div>
    </div>
  );
};

export default LoginPage;
