const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.post('/', scheduleController.createSchedule);
router.put('/:id', scheduleController.updateSchedule);

module.exports = router;
