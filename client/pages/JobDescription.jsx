import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import CloudinaryImage from '../components/CloudinaryImage';

const getPublicId = (url) => {
  const matches = url && url.match(/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/);
  return matches ? matches[1] : null;
};

const JobDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  if (!job) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No job selected</h2>
        <p className="text-gray-600 mb-6">Please select a job from the jobs list to view its details.</p>
        <button
          onClick={() => navigate("/jobs")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-3xl shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
        <div className="w-20 h-20 rounded-xl bg-cyan-700 text-white flex items-center justify-center text-3xl font-bold border shadow">
          {job.logo ? (
            <img src={job.logo} alt={job.company || job.title} className="w-full h-full object-cover rounded-xl" />
          ) : (
            (job.company ? job.company[0] : job.title[0]) + (job.company ? job.company[1] : job.title[1])
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              {job.title}
              <span className="ml-2 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-semibold">Open</span>
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-600 text-base mt-2 md:mt-0">
              {job.location && <span className="flex items-center gap-1"><FaMapMarkerAlt /> {job.location}</span>}
              {(job.posted || job.postedDate) && <span className="flex items-center gap-1"><FaClock /> {job.posted || job.postedDate}</span>}
            </div>
          </div>
        </div>
      </div>
      {job.image && (
        <CloudinaryImage
          publicId={getPublicId(job.image)}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
        <div className="bg-gray-50 rounded-xl p-6 text-gray-700 border border-gray-100 text-lg">
          {job.description}
        </div>
      </div>
      {/* Registration Schedule */}
      {(job.registrationOpens || job.registrationCloses) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">REGISTRATION SCHEDULE</h2>
          <div className="bg-gray-50 rounded-lg p-4 text-gray-700 border border-gray-100">
            {job.registrationOpens && (
              <div>Opens: {new Date(job.registrationOpens).toLocaleString()}</div>
            )}
            {job.registrationCloses && (
              <div>Closes: {new Date(job.registrationCloses).toLocaleString()}</div>
            )}
          </div>
        </div>
      )}
      {/* Eligible Course */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Eligible Course</h2>
        {job.eligibleCourses && job.eligibleCourses.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-2">
            {job.eligibleCourses.map((course) => (
              <span key={course} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
                {course}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">No eligibility restrictions</div>
        )}
      </div>
      {/* About the Organisation */}
      {job.organisationWebsite && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">ABOUT THE ORGANISATION</h2>
          <div className="bg-gray-50 rounded-lg p-4 text-gray-700 border border-gray-100">
            <div>Website</div>
            <a href={job.organisationWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
              {job.organisationWebsite}
            </a>
          </div>
        </div>
      )}
      
      
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/apply-now", { state: { job } })}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition flex items-center gap-2 text-lg"
        >
          <FaCheckCircle /> Apply
        </button>
      </div>
    </div>
  );
};

export default JobDescription; 