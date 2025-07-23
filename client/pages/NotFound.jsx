import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
    <h1 className="text-4xl font-bold mb-4 text-red-600">404 - Page Not Found</h1>
    <p className="text-gray-600 mb-6">The page you are looking for doesn’t exist.</p>
    <Link to="/" className="text-indigo-600 hover:underline">Go back home</Link>
  </div>
);

export default NotFound;
