const db = require('../db/db');

// @ts-ignore
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        
        await db.query(sql, [name, email, password, role || 'student']);

        res.status(201).json({ 
            message: "User registered successfully vayo",
            user: { name, email, role } 
        });

    } catch (err) {
        // @ts-ignore
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "Email pahilei register chha" });
        }
        
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};
// @ts-ignore
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        // @ts-ignore
        if (users.length === 0) return res.status(404).json({ message: "User bhetiyena" });

        // @ts-ignore
        const user = users[0];
        if (user.password !== password) return res.status(401).json({ message: "Password milena" });

        res.status(200).json({ message: "Login Successful", user });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};