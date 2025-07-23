// FindTopTalent.jsx
// Leaderboard for Top 100 Talents by Skills
// Ranking Parameter: Number of skills (skillCount)
// For each user:
//   - skills: comma-separated string of skills (e.g., "React, Node.js, CSS")
//   - skillCount: number of skills (skills.split(",").length)
//   - Users are sorted in descending order by skillCount
//   - Top 100 users are displayed
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FindTopTalent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        // Sort users by number of skills (comma separated)
        const sorted = data
          .map(u => ({ ...u, skillCount: u.skills ? u.skills.split(",").length : 0 }))
          .sort((a, b) => b.skillCount - a.skillCount)
          .slice(0, 100);
        setUsers(sorted);
      } catch (err) {
        // Use demo users if fetch fails
        const demoUsers = Array.from({ length: 100 }, (_, i) => ({
          _id: `demo${i+1}`,
          username: `User${i+1}`,
          skills: Array.from({ length: Math.floor(Math.random() * 15) + 1 }, (_, j) => `Skill${j+1}`).join(", ")
        }));
        const sorted = demoUsers
          .map(u => ({ ...u, skillCount: u.skills ? u.skills.split(",").length : 0 }))
          .sort((a, b) => b.skillCount - a.skillCount)
          .slice(0, 100);
        setUsers(sorted);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 hover:text-black font-medium px-3 py-2 rounded transition-colors border border-gray-200 bg-white shadow-sm self-start"
      >
        <span className="mr-2 text-lg">&#8592;</span> Back
      </button>
      <h1 className="text-3xl font-bold mb-8">Top 100 Talents by Skills</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Skills</th>
                <th className="py-2 px-4">Skill Count</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id || idx} className="border-t">
                  <td className="py-2 px-4 font-bold">{idx + 1}</td>
                  <td className="py-2 px-4">{user.username || user.name}</td>
                  <td className="py-2 px-4">{user.skills}</td>
                  <td className="py-2 px-4">{user.skillCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FindTopTalent; 