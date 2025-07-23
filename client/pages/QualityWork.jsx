// QualityWork.jsx
// Leaderboard for Top 100 Portfolios
// Ranking Parameter: portfolioScore (mocked)
// For each user:
//   - experience: string describing experience (e.g., "3 years at TechCorp")
//   - website: portfolio URL (optional)
//   - portfolioScore: length of experience string (or random if not available)
//   - Users are sorted in descending order by portfolioScore
//   - Top 100 users are displayed
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QualityWork = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        // Mock portfolioScore: use experience length or random
        const scored = data.map(u => ({
          ...u,
          portfolioScore: u.experience ? u.experience.length : Math.floor(Math.random() * 100)
        }));
        const sorted = scored.sort((a, b) => b.portfolioScore - a.portfolioScore).slice(0, 100);
        setUsers(sorted);
      } catch (err) {
        // Use demo portfolios if fetch fails
        const demoPortfolios = Array.from({ length: 100 }, (_, i) => ({
          _id: `demo${i+1}`,
          username: `PortfolioUser${i+1}`,
          website: `https://portfolio${i+1}.example.com`,
          experience: `Experience ${i+1} years`,
          portfolioScore: Math.floor(Math.random() * 100) + 1
        }));
        const sorted = demoPortfolios
          .sort((a, b) => b.portfolioScore - a.portfolioScore)
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
      <h1 className="text-3xl font-bold mb-8">Top 100 Portfolios</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Portfolio</th>
                <th className="py-2 px-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id || idx} className="border-t">
                  <td className="py-2 px-4 font-bold">{idx + 1}</td>
                  <td className="py-2 px-4">{user.username || user.name}</td>
                  <td className="py-2 px-4">
                    {user.website ? (
                      <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Portfolio</a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="py-2 px-4">{user.portfolioScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QualityWork; 