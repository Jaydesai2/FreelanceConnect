import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; 

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostJob from "./pages/PostJob";
import Jobs from "./pages/Jobs"; 
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import Footer from "./components/Footer";
import ApplyNow from "./pages/ApplyNow";
import JobDescription from "./pages/JobDescription";
import Profile from "./pages/Profile";
import FindTopTalent from "./pages/FindTopTalent";
import QualityWork from "./pages/QualityWork";
import SecurePayments from "./pages/SecurePayments";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/jobs" element={<Jobs />} /> 
          <Route path="/job-description" element={<JobDescription />} />
          <Route path="/apply-now" element={<ApplyNow />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/find-top-talent" element={<FindTopTalent />} />
          <Route path="/quality-work" element={<QualityWork />} />
          <Route path="/secure-payments" element={<SecurePayments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
