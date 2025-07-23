import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8 w-full text-center">
      <div className="container mx-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} FreelanceConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 