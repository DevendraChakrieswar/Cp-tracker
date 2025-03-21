import React, { useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend, ResponsiveContainer
} from 'recharts';

const CPReport = () => {
  const [codechefUsername, setCodechefUsername] = useState('');
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  const [codeforcesUsername, setCodeforcesUsername] = useState('');
  const [codechefData, setCodechefData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [codeforcesData, setCodeforcesData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCPData = async () => {
    setLoading(true);
    try {
      const responses = await Promise.all([
        codechefUsername ? axios.get(`http://localhost:5000/codechef/${codechefUsername}`) : Promise.resolve(null),
        leetcodeUsername ? axios.get(`http://localhost:5000/leetcode/${leetcodeUsername}`) : Promise.resolve(null),
        codeforcesUsername ? axios.get(`http://localhost:5000/codeforces/${codeforcesUsername}`) : Promise.resolve(null),
      ]);

      if (responses[0]?.data) setCodechefData(responses[0].data);
      if (responses[1]?.data) setLeetcodeData(responses[1].data);
      if (responses[2]?.data) setCodeforcesData(responses[2].data);
    } catch (err) {
      console.error('Error fetching CP data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Data for Bar Chart - Problems Solved
  const problemData = [];
  if (codechefData) problemData.push({ platform: 'CodeChef', problemsSolved: codechefData.problems_solved });
  if (leetcodeData) problemData.push({ platform: 'LeetCode', problemsSolved: leetcodeData.problems_solved });
  if (codeforcesData) problemData.push({ platform: 'Codeforces', problemsSolved: codeforcesData.problems_solved });

  return (
    <div className="cp-report" style={{ padding: '20px' }}>
      <h2>Competitive Programming Report</h2>

      {/* User Input Form */}
      <div className="input-section" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="CodeChef Username"
          value={codechefUsername}
          onChange={(e) => setCodechefUsername(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="LeetCode Username"
          value={leetcodeUsername}
          onChange={(e) => setLeetcodeUsername(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Codeforces Username"
          value={codeforcesUsername}
          onChange={(e) => setCodeforcesUsername(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={fetchCPData}>Generate Report</button>
      </div>

      {loading && <p>Loading Competitive Programming Data...</p>}

      {!loading && (codechefData || leetcodeData || codeforcesData) && (
        <>
          {/* Problems Solved Bar Chart */}
          <h3>Problems Solved on Each Platform</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={problemData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="problemsSolved" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>

          {/* CodeChef Contest Graph */}
          {codechefData?.contests?.length > 0 && (
            <>
              <h3>CodeChef Contest Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={codechefData.contests}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="contestName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rating" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}

          {/* Codeforces Contest Graph */}
          {codeforcesData?.contests?.length > 0 && (
            <>
              <h3>Codeforces Contest Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={codeforcesData.contests}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="contestName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rating" stroke="#387908" />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}

          {/* LeetCode Raw Data */}
          {leetcodeData && (
            <>
              <h3>LeetCode Data (Raw JSON)</h3>
              <pre style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
                {JSON.stringify(leetcodeData, null, 2)}
              </pre>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CPReport;
