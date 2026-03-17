const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db'); 

const app = express();

app.use(cors());
app.use(express.json());
db.query("SELECT 1")
    .then(() => {
        console.log("MySQL Database Connected Successfully!");
    })
    .catch((err) => {
        console.log("Database Connection Failed!", err);
    });
app.get('/', (req, res) => {
    res.send("Backend server is running successfully!");
});

app.post('/api/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        
        await db.query(sql, [name, email, password, role || 'student']);

        res.status(201).json({ 
            message: "User registered successfully vayo",
            user: { name, email, role } 
        });

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "Email pahilei register chha" });
        }
        
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});