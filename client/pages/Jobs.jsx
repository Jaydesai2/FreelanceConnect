import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Jobs = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "React Developer Needed",
      description: "Looking for someone to build a portfolio website using React and Tailwind CSS.",
      budget: "$1000-$2000",
      location: "Remote",
      postedDate: "2 days ago",
      registrationOpens: "2025-07-21T15:30",
      registrationCloses: "2025-07-26T11:00",
      organisationWebsite: "https://careers.rtcam.com/"
    },
    {
      id: 2,
      title: "Figma to HTML",
      description: "Need responsive HTML from a Figma design. Mobile-first preferred.",
      budget: "$500-$1000",
      location: "Remote",
      postedDate: "1 day ago",
      registrationOpens: "2025-07-22T10:00",
      registrationCloses: "2025-07-24T17:00",
      organisationWebsite: "https://figma.com/"
    },
  ]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Available Jobs
              </h1>
              <p className="text-gray-600">
                Find the perfect project that matches your skills
              </p>
            </div>
            <Link
              to="/post-job"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium flex items-center"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Be the first to post a job!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => navigate("/job-description", { state: { job } })}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {job.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        💰 {job.budget}
                      </span>
                      <span className="text-sm text-gray-500">
                        🌍 {job.location}
                      </span>
                      <span className="text-sm text-gray-500">
                        ⏰ {job.postedDate}
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/apply-now"
                    className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    onClick={e => e.stopPropagation()}
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
