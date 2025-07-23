import React from "react";
import { GoogleLogin } from '@react-oauth/google';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const handleGoogleSuccess = async (credentialResponse) => {
  // Send credentialResponse.credential to your backend
  const res = await fetch('http://localhost:5000/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential: credentialResponse.credential }),
  });
  const data = await res.json();
  if (res.ok) {
    // Save token, redirect, etc.
  } else {
    // Handle error
  }
};

const LoginPage = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          alert('Google Login Failed');
        }}
      />
    </div>
  </div>
);

export default LoginPage;
