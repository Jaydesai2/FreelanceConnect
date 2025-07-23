import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Browse Projects",
    description: "Explore jobs posted by clients and apply with ease.",
    route: "/jobs",
  },
  {
    title: "Post Your Work",
    description: "Create a profile and showcase your portfolio to attract new clients.",
    route: "/post-job",
  },
  {
    title: "Secure Payments",
    description: "We ensure timely and secure payments for completed work.",
    route: "/",
  },
];

const FeatureCards = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 hover:text-black font-medium px-3 py-2 rounded transition-colors border border-gray-200 bg-white shadow-sm"
      >
        <span className="mr-2 text-lg">&#8592;</span> Back
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => navigate(feature.route)}
            className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
