const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db'); 
const authRoutes = require('./routes/authRoutes');
const jobRoutes=require('./routes/jobRoutes');

const app = express();

app.use(cors());
app.use(express.json());
db.query("SELECT 1")
    .then(() => {
        console.log("MySQL Database Connected Successfully");
    })
    .catch((err) => {
        console.log("Database Connection Failed", err);
    });

app.use('/api', authRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/', (req, res) => {
    res.send("Backend server is running successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});