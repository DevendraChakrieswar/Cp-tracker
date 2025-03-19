const express = require('express');
const router = express.Router();
const { scrapeCodeChef } = require('../Scripts/scrapeCodeChef');
const {fetchLeetCodeContestsData} = require('../Scripts/fetchAPIs');
const {fetchCodeforcesData} = require('../Scripts/fetchAPIs');
const {fetchCodeforcesContest} = require('../Scripts/fetchAPIs');
const {fetchAllUsersData} = require('../Scripts/fetchAPIs')
const fs = require('fs');


// endpoint for codechef

router.get('/codechef/:username', async (req, res) => {
    const { username } = req.params;
    const data = await scrapeCodeChef(username);
    res.json(data);
});

// endpoit fro leetcode

router.get('/leetcode/:username', async (req, res) => {
    const username = req.params.username;
    const data = await fetchLeetCodeContestsData(username);
    res.json(data);
});

// endpoint for codeforces

router.get('/codeforces/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const data = await fetchCodeforcesData(username);
        const contestsData = await fetchCodeforcesContest(username);
        let codeforcesData = {
            username: username,
            problems: data,
            contests: contestsData
        };
        res.json(codeforcesData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.get('/all', async (req, res) => {
    const { codechef, leetcode, codeforces } = req.query;

    try {
        // Create an array of promises for parallel execution
        const promises = [];

        if (codechef) promises.push(scrapeCodeChef(codechef).then(data => ({ codechef: data })));
        if (leetcode) promises.push(fetchLeetCodeContestsData(leetcode).then(data => ({ leetcode: data })));
        if (codeforces) {
            promises.push(
                fetchCodeforcesData(codeforces).then(problems => 
                    fetchCodeforcesContest(codeforces).then(contests => 
                        ({ codeforces: { username: codeforces, problems, contests } })
                    )
                )
            );
        }

        // Execute all API calls concurrently
        const results = await Promise.all(promises);

        // Merge results into a single object
        const data = Object.assign({}, ...results);
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

// const saveDataToFile = async (data) => {
//     fs.writeFileSync('user_data.json', JSON.stringify(data, null, 2));
// };


router.get('/all-users', async (req, res) => {
    try {
        const data = await fetchAllUsersData();
        // saveDataToFile(data); // Save data to file
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
