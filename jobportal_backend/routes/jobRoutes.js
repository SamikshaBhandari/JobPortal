const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/jobpost', jobController.postJob);
router.get('/alljobs', jobController.getAllJobs);

module.exports = router;