import React, { useState } from "react";
import { FaFacebookF, FaApple, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [languages, setLanguages] = useState("");
  const [interests, setInterests] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const today = new Date();
  const maxDob = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate()).toISOString().split('T')[0];

  // ✅ Handle signup
  const handleSignup = async () => {
    setError("");
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }
    if (dob && new Date(dob) > new Date(maxDob)) {
      setError("You must be at least 10 years old to sign up.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username, email, password, education, experience, languages, interests, bio, phone, location, dob, gender, linkedin, github, website, address
        })
      });
      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        // If response is not JSON
        setError("Server returned an invalid response.");
        return;
      }
      if (res.ok) {
        alert("✅ Account created successfully!");
        navigate("/"); // Redirect to home page
      } else {
        setError(data.message || data.error || "Unknown server error");
      }
    } catch (err) {
      setError(err.message || "Network/server error");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <Link to="/" className="mb-5 flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-center">Create your FreeLance account</h1>
        </Link>
        <div className="w-full max-w-md space-y-6">
          {/* Logo + Heading */}
          {/* <div className="flex justify-center">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full text-lg">
              ✦
            </div>
          </div> */}
          
          <p className="text-sm text-gray-500 text-center">This is the start of something good.</p>

          {/* Social Login */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => alert("Login with Facebook")}
              className="bg-gray-100 p-3 rounded-full shadow hover:scale-110 transition-all duration-200 hover:bg-blue-600 hover:text-white"
            >
              <FaFacebookF />
            </button>
            <button
              onClick={() => alert("Login with Apple")}
              className="bg-gray-100 p-3 rounded-full shadow hover:scale-110 transition-all duration-200 hover:bg-black hover:text-white"
            >
              <FaApple />
            </button>
            <button
              onClick={() => alert("Login with Google")}
              className="bg-gray-100 p-3 rounded-full shadow hover:scale-110 transition-all duration-200 hover:bg-red-500 hover:text-white"
            >
              <FaGoogle />
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Show error message above the form */}
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="example@example.com"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Create a secure password"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Education</label>
              <input type="text" value={education} onChange={e => setEducation(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="Education" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Experience</label>
              <select
                value={experience}
                onChange={e => setExperience(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Languages</label>
              <input type="text" value={languages} onChange={e => setLanguages(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="Languages" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Interests</label>
              <input type="text" value={interests} onChange={e => setInterests(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="Interests" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Bio</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="Bio" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Phone</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="Phone" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Location</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="Location" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={e => setDob(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                max={maxDob}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Gender</label>
              <select value={gender} onChange={e => setGender(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">LinkedIn</label>
              <input type="url" value={linkedin} onChange={e => setLinkedin(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="LinkedIn URL" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">GitHub</label>
              <input type="url" value={github} onChange={e => setGithub(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="GitHub URL" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Website</label>
              <input type="url" value={website} onChange={e => setWebsite(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="Personal Website" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Address</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2 border rounded-lg" placeholder="Address" />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center text-sm mt-2">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-600">Remember me</span>
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all mt-2"
          >
            Start your adventure
          </button>

          {/* Login Redirect */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
