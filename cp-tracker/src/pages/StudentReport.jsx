import React, { useState } from 'react';
import axios from 'axios';

const StudentReport = () => {
  const [rollNo, setRollNo] = useState('');
  const [platform, setPlatform] = useState('All');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetReport = async () => {
    if (!rollNo) {
      alert('Please enter a Roll Number or Username');
      return;
    }

    setLoading(true);
    setReportData(null);

    try {
      let apiUrl = '';

      // API routes based on the selected platform
      switch (platform) {
        case 'CodeChef':
          apiUrl = `http://localhost:5000/api/codechef/${rollNo}`;
          break;
        case 'LeetCode':
          apiUrl = `http://localhost:5000/api/leetcode/${rollNo}`;
          break;
        case 'Codeforces':
          apiUrl = `http://localhost:5000/api/codeforces/${rollNo}`;
          break;
        case 'All':
        default:
          apiUrl = `http://localhost:5000/api/all?codechef=${rollNo}&leetcode=${rollNo}&codeforces=${rollNo}`;
      }

      const response = await axios.get(apiUrl);
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
      setReportData({ error: 'Failed to fetch report.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl  mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Student Report</h2>

      <label className="block text-blue-700 mb-2">Roll Number / Username</label>
      <input
        type="text"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
        className="w-full p-3 border rounded mb-4"
        placeholder="Enter Roll Number or Username"
      />

      <label className="block text-blue-700 mb-2">Select Platform</label>
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="w-full p-3 border rounded mb-6"
      >
        <option value="All">All</option>
        <option value="CodeChef">CodeChef</option>
        <option value="LeetCode">LeetCode</option>
        <option value="Codeforces">Codeforces</option>
      </select>

      <button
        onClick={handleGetReport}
        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
      >
        {loading ? 'Loading...' : 'Get Report'}
      </button>

      {/* Render Report */}
      {reportData && (
        <div className="mt-8 p-4 bg-gray-100 rounded overflow-x-auto">
          {reportData.error ? (
            <p className="text-red-500">{reportData.error}</p>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-6">Report Data</h3>

              {/* CodeChef Data */}
              {reportData.codechef && (
                <div className="mb-6">
                  <h4 className="font-bold mb-3 text-blue-700">CodeChef</h4>
                  <table className="w-full border border-gray-300">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="p-3 border">Rating</th>
                        <th className="p-3 border">Stars</th>
                        <th className="p-3 border">Problems Solved</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border">{reportData.codechef.rating || 'N/A'}</td>
                        <td className="p-3 border">{reportData.codechef.stars || 'N/A'}</td>
                        <td className="p-3 border">{reportData.codechef.problems_solved || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* LeetCode Data */}
              {reportData.leetcode && (
                <div className="mb-6">
                  <h4 className="font-bold mb-3 text-yellow-600">LeetCode</h4>
                  <table className="w-full border border-gray-300">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="p-3 border">Total Problems Solved</th>
                        <th className="p-3 border">Ranking</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border">{reportData.leetcode.totalSolved || 'N/A'}</td>
                        <td className="p-3 border">{reportData.leetcode.ranking || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Codeforces Data */}
              {reportData.codeforces && (
                <div className="mb-6">
                  <h4 className="font-bold mb-3 text-purple-700">Codeforces</h4>
                  <table className="w-full border border-gray-300">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="p-3 border">Handle</th>
                        <th className="p-3 border">Max Rating</th>
                        <th className="p-3 border">Current Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border">{reportData.codeforces.username || 'N/A'}</td>
                        <td className="p-3 border">{reportData.codeforces.maxRating || 'N/A'}</td>
                        <td className="p-3 border">{reportData.codeforces.currentRating || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Optional: Codeforces contests */}
                  {reportData.codeforces.contests && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Recent Contests</h4>
                      <table className="w-full border border-gray-300">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="p-3 border">Contest Name</th>
                            <th className="p-3 border">Rank</th>
                            <th className="p-3 border">Old Rating</th>
                            <th className="p-3 border">New Rating</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.codeforces.contests.map((contest, index) => (
                            <tr key={index}>
                              <td className="p-3 border">{contest.contestName}</td>
                              <td className="p-3 border">{contest.rank}</td>
                              <td className="p-3 border">{contest.oldRating}</td>
                              <td className="p-3 border">{contest.newRating}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentReport;
