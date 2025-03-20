import React, { useState } from 'react';
import axios from 'axios';

const CompetitiveProgrammingReport = () => {
  const [name, setName] = useState('');
  const [platforms, setPlatforms] = useState({
    codechef: true,
    leetcode: true,
    codeforces: true,
    atcoder: true,
  });
  const [usernames, setUsernames] = useState({
    codechef: '',
    leetcode: '',
    codeforces: '',
    atcoder: '',
  });

  const handleCheckboxChange = (e) => {
    setPlatforms({
      ...platforms,
      [e.target.name]: e.target.checked,
    });
  };

  const handleUsernameChange = (e) => {
    setUsernames({
      ...usernames,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let results = {};

      // Fetch data based on selected platforms
      if (platforms.codechef && usernames.codechef) {
        const res = await axios.get(`http://localhost:5000/api/codechef/${usernames.codechef}`);
        results.codechef = res.data;
      }
      if (platforms.leetcode && usernames.leetcode) {
        const res = await axios.get(`http://localhost:5000/api/leetcode/${usernames.leetcode}`);
        results.leetcode = res.data;
      }
      if (platforms.codeforces && usernames.codeforces) {
        const res = await axios.get(`http://localhost:5000/api/codeforces/${usernames.codeforces}`);
        results.codeforces = res.data;
      }

      // Atcoder logic placeholder (if you build Atcoder scraping later)
      if (platforms.atcoder && usernames.atcoder) {
        results.atcoder = `Fetch logic for Atcoder is not implemented yet`;
      }

      console.log('✅ Report Data:', results);
      alert('✅ Report generated! Check console for data.');

    } catch (error) {
      console.error('❌ Error fetching data:', error);
      alert('❌ Error fetching data. Check console for more.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Competitive Programming Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium">Your Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Select Platforms</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {['codechef', 'leetcode', 'codeforces', 'atcoder'].map((platform) => (
              <label key={platform} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={platform}
                  checked={platforms[platform]}
                  onChange={handleCheckboxChange}
                />
                <span className="capitalize">{platform}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Usernames */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block">Codechef Username</label>
            <input
              type="text"
              name="codechef"
              placeholder="Codechef Username"
              className="w-full border rounded p-2"
              value={usernames.codechef}
              onChange={handleUsernameChange}
            />
          </div>

          <div>
            <label className="block">Leetcode Username</label>
            <input
              type="text"
              name="leetcode"
              placeholder="Leetcode Username"
              className="w-full border rounded p-2"
              value={usernames.leetcode}
              onChange={handleUsernameChange}
            />
          </div>

          <div>
            <label className="block">Codeforces Username</label>
            <input
              type="text"
              name="codeforces"
              placeholder="Codeforces Username"
              className="w-full border rounded p-2"
              value={usernames.codeforces}
              onChange={handleUsernameChange}
            />
          </div>

          <div>
            <label className="block">Atcoder Username</label>
            <input
              type="text"
              name="atcoder"
              placeholder="Atcoder Username"
              className="w-full border rounded p-2"
              value={usernames.atcoder}
              onChange={handleUsernameChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompetitiveProgrammingReport;
