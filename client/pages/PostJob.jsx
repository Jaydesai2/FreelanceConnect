import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Select from 'react-select';
import { GoogleOAuthProvider } from '@react-oauth/google';

const eligibleCoursesList = [
  // --- Auxiliary / Certification Programs ---
  "AWS Cloud Practitioner Essentials",
  "Certificate in Blockchain Development",
  "Certificate in Cloud Architecture",
  "Certificate in Cyber Security Fundamentals",
  "Certificate in Data Analytics",
  "Certificate in DevOps",
  "Certificate in Ethical Hacking",
  "Certificate in Machine Learning",
  "Certified Kubernetes Administrator (CKA)",
  "Diploma in Mobile App Development",
  "Diploma in Software Testing",
  "Diploma in UI/UX Design",
  "Diploma in Web Development",
  "Google IT Support Professional Certificate",
  "Microsoft Certified: Azure Fundamentals",

  // --- B.Tech Programs ---
  "B.Tech - Artificial Intelligence",
  "B.Tech - Big Data Analytics",
  "B.Tech - Blockchain Technology",
  "B.Tech - Cloud Computing",
  "B.Tech - Computer Science & Engineering",
  "B.Tech - Cyber Security",
  "B.Tech - Data Science",
  "B.Tech - DevOps",
  "B.Tech - Full Stack Development",
  "B.Tech - Information Technology",
  "B.Tech - Internet of Things",
  "B.Tech - Software Engineering",

  // --- B.Tech Lateral Entry ---
  "B.Tech Lateral - Artificial Intelligence",
  "B.Tech Lateral - Big Data Analytics",
  "B.Tech Lateral - Blockchain Technology",
  "B.Tech Lateral - Cloud Computing",
  "B.Tech Lateral - Computer Science & Engineering",
  "B.Tech Lateral - Cyber Security",
  "B.Tech Lateral - Internet of Things",

  // --- Integrated MCA Programs ---
  "Integrated MCA - Artificial Intelligence",
  "Integrated MCA - Big Data Analytics",
  "Integrated MCA - Cloud Computing",
  "Integrated MCA - Computer Applications",
  "Integrated MCA - Cyber Security & Forensics",
  "Integrated MCA - Full Stack Web Development",

  // --- M.Sc IT Programs ---
  "M.Sc - Information Technology",
  "M.Sc - IT - Artificial Intelligence",
  "M.Sc - IT - Big Data Analytics",
  "M.Sc - IT - Cloud Computing",
  "M.Sc - IT - Cyber Security & Forensics",
  "M.Sc - IT - DevOps",
  "M.Sc - IT - Full Stack Development",

  // --- M.Tech Programs ---
  "M.Tech - Artificial Intelligence",
  "M.Tech - Computer Science & Engineering",
  "M.Tech - Cyber Security",
  "M.Tech - Data Science",
  "M.Tech - Information Technology",
  "M.Tech - Machine Learning",

  // --- MCA Programs ---
  "MCA - Artificial Intelligence",
  "MCA - Big Data Analytics",
  "MCA - Cloud Computing",
  "MCA - Computer Applications",
  "MCA - Cyber Security and Forensics",
  "MCA - Data Science",
  "MCA - DevOps",
  "MCA - Full Stack Web Development",
  "MCA - Machine Learning"
];

const uniqueEligibleCoursesList = Array.from(new Set(eligibleCoursesList));

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("Remote");
  const [error, setError] = useState("");
  const [eligibleCourse, setEligibleCourse] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [registrationOpens, setRegistrationOpens] = useState("");
  const [registrationCloses, setRegistrationCloses] = useState("");
  const [organisationWebsite, setOrganisationWebsite] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleEligibleCourseChange = (e) => {
    setEligibleCourse(e.target.value);
  };

  const filteredCourses = uniqueEligibleCoursesList.filter(course =>
    course.toLowerCase().includes(courseSearch.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !budget.trim() || !eligibleCourse.trim()) {
      setError("Please fill in all required fields, including Eligible Course");
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('budgetRange', budget.trim());
    formData.append('location', location.trim());
    formData.append('eligibleCourses', eligibleCourse ? [eligibleCourse] : []);
    formData.append('registrationOpens', registrationOpens);
    formData.append('registrationCloses', registrationCloses);
    formData.append('organisationWebsite', organisationWebsite);
    if (image) formData.append('image', image);

    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to post job");
        return;
      }

      setError("");
      alert("✅ Job posted successfully!");
      navigate("/jobs");

    } catch (err) {
      console.error("Error posting job:", err);
      setError("Something went wrong. Try again later.");
    }
  };
  
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Header */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Post a New Job
            </h1>
            <p className="text-gray-600">
              Find the perfect freelancer for your project
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="bg-white border rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                  placeholder="e.g. React Developer Needed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors min-h-[150px]"
                  placeholder="Describe your project requirements, timeline, and expectations..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range *
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="$100-$500">$100-$500</option>
                    <option value="$500-$1000">$500-$1000</option>
                    <option value="$1000-$2000">$1000-$2000</option>
                    <option value="$2000+">$2000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors"
                  >
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              {/* Eligible Courses Single-Select Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eligible Course
                </label>
                
                <Select
                  options={uniqueEligibleCoursesList.map(course => ({ value: course, label: course }))}
                  value={eligibleCourse ? { value: eligibleCourse, label: eligibleCourse } : null}
                  onChange={option => setEligibleCourse(option ? option.value : "")}
                  placeholder="Select eligible course"
                  isClearable
                />
                {eligibleCourse && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
                      {eligibleCourse}
                    </span>
                  </div>
                )}
              </div>

              {/* Registration Schedule */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Schedule</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Opens</label>
                    <input
                      type="datetime-local"
                      value={registrationOpens}
                      onChange={e => setRegistrationOpens(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Closes</label>
                    <input
                      type="datetime-local"
                      value={registrationCloses}
                      onChange={e => setRegistrationCloses(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
              {/* Organisation Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organisation Website</label>
                <input
                  type="url"
                  value={organisationWebsite}
                  onChange={e => setOrganisationWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setImage(e.target.files[0])}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default PostJob;