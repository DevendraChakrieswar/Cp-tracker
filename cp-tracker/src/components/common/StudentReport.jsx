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

      // Dynamic URL based on platform selection
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Student Report</h2>

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

      {reportData && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold mb-2">Report Data:</h3>
          <pre className="text-sm overflow-x-auto">{JSON.stringify(reportData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default StudentReport;
