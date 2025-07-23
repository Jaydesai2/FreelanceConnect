import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import CloudinaryImage from '../components/CloudinaryImage';

const initialUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random&size=128",
  bio: "Web developer passionate about building modern web apps.",
  phone: "+1 234 567 8901",
  location: "New York, USA",
  skills: "React, Node.js, CSS, MongoDB",
  dob: "1990-01-01",
  gender: "Male",
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  website: "https://johndoe.com",
  address: "123 Main St, New York, NY",
  education: "B.Sc. Computer Science, NYU",
  experience: "3 years at TechCorp as Frontend Developer",
  languages: "English, Spanish",
  interests: "Open source, Hiking, Chess"
};

const getPublicId = (url) => {
  const matches = url && url.match(/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/);
  return matches ? matches[1] : null;
};
const defaultAvatar = "https://ui-avatars.com/api/?name=User&background=random&size=128";

const Profile = () => {
  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Remove redirect to login, allow access without authentication
    // If token exists, fetch user data; otherwise, show read-only or guest profile
    if (!token) {
      setLoading(false);
      return;
    }
    // Fetch user data from backend
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setForm(data);
        }
      } catch (err) {
        // fallback to initialUser
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleEdit = () => {
    setForm(user);
    setEditing(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (form.linkedin && !form.linkedin.startsWith("http")) newErrors.linkedin = "LinkedIn URL must start with http";
    if (form.github && !form.github.startsWith("http")) newErrors.github = "GitHub URL must start with http";
    if (form.website && !form.website.startsWith("http")) newErrors.website = "Website URL must start with http";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const errorObj = validateForm();
    if (errorObj) {
      toast.error("Please fix the errors in the form.");
      return;
    }
    setUser(form);
    setEditing(false);
    toast.success('Profile saved successfully!');
    // Save to backend
    try {
      const token = localStorage.getItem("token");
      await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
    } catch (err) {
      // handle error
    }
  };

  const handleCancel = () => {
    setEditing(false);
    toast.info('Edit cancelled.');
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("avatar", file);
      try {
        const res = await fetch("/api/auth/user/avatar", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });
        if (res.ok) {
          const data = await res.json();
          setForm({ ...form, avatar: data.avatar });
          toast.success("Profile picture updated!");
        } else {
          toast.error("Failed to upload avatar");
        }
      } catch (err) {
        toast.error("Failed to upload avatar");
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;
  }

  const isGuest = !localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center relative">
        <button
          className="absolute left-4 top-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaArrowLeft size={22} />
        </button>
        {/* Profile Photo Logic */}
        {getPublicId(editing ? form.avatar : user.avatar) ? (
          <CloudinaryImage
            publicId={getPublicId(editing ? form.avatar : user.avatar)}
            className="w-28 h-28 rounded-full shadow mb-4 border-4 border-white object-cover"
          />
        ) : (
          <img
            src={(editing ? form.avatar : user.avatar) || defaultAvatar}
            alt="User Avatar"
            className="w-28 h-28 rounded-full shadow mb-4 border-4 border-white object-cover"
          />
        )}
        {editing ? (
          <>
            <input
              type="file"
              accept="image/*"
              className="mb-2"
              onChange={handleAvatarChange}
            />
            <form className="w-full" onSubmit={handleSave}>
              <input
                className={`w-full mb-2 px-4 py-2 border rounded-lg${errors.name ? ' border-red-500' : ''}`}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              {errors.name && <div className="text-red-500 text-xs mb-2">{errors.name}</div>}
              <input
                className={`w-full mb-2 px-4 py-2 border rounded-lg${errors.email ? ' border-red-500' : ''}`}
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                required
              />
              {errors.email && <div className="text-red-500 text-xs mb-2">{errors.email}</div>}
              <input
                className="w-full mb-2 px-4 py-2 border rounded-lg"
                name="avatar"
                value={form.avatar}
                onChange={handleChange}
                placeholder="Avatar URL"
              />
              <textarea
                className="w-full mb-2 px-4 py-2 border rounded-lg"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Bio"
                rows={2}
              />
              <input
                className="w-full mb-2 px-4 py-2 border rounded-lg"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              <input
                className="w-full mb-2 px-4 py-2 border rounded-lg"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
              />
              <input
                className="w-full mb-2 px-4 py-2 border rounded-lg"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                placeholder="Date of Birth"
                type="date"
              />
              <select
                className="w-full mb-2 px-4 py-2 border rounded-lg"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                className={`w-full mb-2 px-4 py-2 border rounded-lg${errors.linkedin ? ' border-red-500' : ''}`}
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
                type="url"
              />
              {errors.linkedin && <div className="text-red-500 text-xs mb-2">{errors.linkedin}</div>}
              <input
                className={`w-full mb-2 px-4 py-2 border rounded-lg${errors.github ? ' border-red-500' : ''}`}
                name="github"
                value={form.github}
                onChange={handleChange}
                placeholder="GitHub URL"
                type="url"
              />
              {errors.github && <div className="text-red-500 text-xs mb-2">{errors.github}</div>}
              <input
                className={`w-full mb-2 px-4 py-2 border rounded-lg${errors.website ? ' border-red-500' : ''}`}
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="Personal Website"
                type="url"
              />
              {errors.website && <div className="text-red-500 text-xs mb-2">{errors.website}</div>}
              <input
                className="w-full mb-2 px-4 py-2 border rounded-lg"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
              />
              <input
                className="w-full mb-4 px-4 py-2 border rounded-lg"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="Skills (comma separated)"
              />
              <input
                className="w-full mb-2 px-4 py-2 border rounded-lg"
                name="education"
                value={form.education}
                onChange={handleChange}
                placeholder="Education"
              />
              <input
                className="w-full mb-2 px-4 py-2 border rounded-lg"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="Experience"
              />
              <input
                className="w-full mb-2 px-4 py-2 border rounded-lg"
                name="languages"
                value={form.languages}
                onChange={handleChange}
                placeholder="Languages"
              />
              <input
                className="w-full mb-4 px-4 py-2 border rounded-lg"
                name="interests"
                value={form.interests}
                onChange={handleChange}
                placeholder="Interests"
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition mb-2 w-full">Save</button>
                <button type="button" onClick={handleCancel} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition mb-2 w-full">Cancel</button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <p className="text-gray-700 mb-2 text-center">{user.bio}</p>
            <div className="w-full flex flex-col gap-1 mb-2">
              <span className="text-gray-500 text-sm">Phone: <span className="text-gray-800">{user.phone}</span></span>
              <span className="text-gray-500 text-sm">Location: <span className="text-gray-800">{user.location}</span></span>
              <span className="text-gray-500 text-sm">Date of Birth: <span className="text-gray-800">{user.dob}</span></span>
              <span className="text-gray-500 text-sm">Gender: <span className="text-gray-800">{user.gender}</span></span>
              <span className="text-gray-500 text-sm">Skills: <span className="text-gray-800">{user.skills}</span></span>
              <span className="text-gray-500 text-sm">LinkedIn: <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{user.linkedin}</a></span>
              <span className="text-gray-500 text-sm">GitHub: <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{user.github}</a></span>
              <span className="text-gray-500 text-sm">Website: <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{user.website}</a></span>
              <span className="text-gray-500 text-sm">Address: <span className="text-gray-800">{user.address}</span></span>
              <span className="text-gray-500 text-sm">Education: <span className="text-gray-800">{user.education}</span></span>
              <span className="text-gray-500 text-sm">Experience: <span className="text-gray-800">{user.experience}</span></span>
              <span className="text-gray-500 text-sm">Languages: <span className="text-gray-800">{user.languages}</span></span>
              <span className="text-gray-500 text-sm">Interests: <span className="text-gray-800">{user.interests}</span></span>
            </div>
            {!isGuest && (
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition mb-2" onClick={handleEdit}>
                Edit Profile
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile; 