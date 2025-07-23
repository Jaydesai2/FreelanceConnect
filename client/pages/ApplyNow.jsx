import React, { useState } from "react";
import { FaUser, FaEnvelope, FaFileAlt, FaPaperPlane, FaFileUpload } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";

const ApplyNow = () => {
  const [form, setForm] = useState({ name: "", email: "", coverLetter: "" });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg flex flex-col items-center animate-fade-in">
        <FaPaperPlane className="text-4xl text-green-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold mb-2 text-green-600">Application Submitted!</h2>
        <p className="text-gray-700 text-center mb-2">
          Thank you for applying. We will review your application and get back to you soon.
        </p>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => navigate("/jobs")}
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <FaFileAlt className="text-blue-600" /> Apply for this Job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <div className="relative flex items-center">
            <FaUser className="absolute left-3 text-gray-400 pointer-events-none top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-3 text-gray-400 pointer-events-none top-1/2 -translate-y-1/2" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Cover Letter</label>
          <textarea
            name="coverLetter"
            value={form.coverLetter}
            onChange={handleChange}
            required
            placeholder="Tell us why you're a great fit..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[120px] transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
            <FaFileUpload className="text-gray-500" /> Resume (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleResumeChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {resume && <span className="text-sm text-green-600 mt-1 block">{resume.name}</span>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow"
        >
          <FaPaperPlane /> Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyNow;

// Inject fade-in animation globally in browser environments
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    .animate-fade-in {
      animation: fadeIn 0.7s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}
