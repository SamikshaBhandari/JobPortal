const db = require('../db/db');

// @ts-ignore
exports.postJob = async (req, res) => {
    const { posted_by, title, description, company, location, salary } = req.body;
    try {
        const sql = "INSERT INTO jobs (posted_by, title, description, company, location, salary) VALUES (?, ?, ?, ?, ?, ?)";
                await db.query(sql, [posted_by, title, description, company, location, salary]);
        res.status(201).json({ 
            message: "Job successfully post bhayo",
            job: { title, company } 
        });
    } catch (err) {
        console.error("Job Post Error:", err);
        res.status(500).json({ message: "Job post garna milena database check garney suru ma ." });
    }
};
// @ts-ignore
exports.getAllJobs = async (req, res) => {
    try {
        const [jobs] = await db.query("SELECT * FROM jobs ORDER BY created_at DESC");
        res.status(200).json(jobs);
    } catch (err) {
        console.error("Fetch Jobs Error:", err);
        res.status(500).json({ message: "Jobs fetch garna sakina." });
    }
};
exports.updateJob = async (req, res) => {
    const { id } = req.params; 
    const { title, description, company, location, salary } = req.body;

    try {
        const sql = "UPDATE jobs SET title=?, description=?, company=?, location=?, salary=? WHERE id=?";
        const [result] = await db.query(sql, [title, description, company, location, salary, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Job bhetiyena" });
        }
        res.status(200).json({ message: "Job successfully update bhayo" });
    } catch (err) {
        res.status(500).json({ message: "Update garna milena." });
    }
};

exports.deleteJob = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query("DELETE FROM jobs WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Job bhetiyena." });
        }
        res.status(200).json({ message: "Job successfully delete bhayo." });
    } catch (err) {
        res.status(500).json({ message: "Delete garna milena." });
    }
};