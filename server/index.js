require('dotenv').config();
const express = require('express');
const cors = require('cors');
const codingRoutes = require('./routes/codingroutes');

const app = express();
app.use(cors());

app.get("/",(req,res)=>{
    console.log("hit the backend url");
    res.send("hit default url");
});
app.use('/api', codingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
