import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Find the perfect freelance services for your business
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect with talented freelancers and get your projects done with confidence.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/post-job"
                  className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium"
                >
                  Post a Job
                </Link>
                <Link
                  to="/jobs"
                  className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Browse Jobs
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/FreelanceJobIcon.png"
                alt="Freelance Work"
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why choose FreelanceConnect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition" onClick={() => navigate("/find-top-talent")}>
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full text-xl mb-6">
                🔍
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Find Top Talent
              </h3>
              <p className="text-gray-600">
                Access a global network of skilled freelancers ready to bring your projects to life.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition" onClick={() => navigate("/quality-work")}>
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full text-xl mb-6">
                💼
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Quality Work
              </h3>
              <p className="text-gray-600">
                Get high-quality deliverables from experienced professionals in your field.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition" onClick={() => navigate("/secure-payments")}>
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full text-xl mb-6">
                🔒
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Work with confidence knowing your payments are secure and protected.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-white border-t py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-lg">
                ✦
              </div>
              <span className="text-gray-900 font-semibold">FreelanceConnect</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2025 FreelanceConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
