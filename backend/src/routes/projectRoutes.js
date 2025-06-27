const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/', projectController.createProject);
router.get('/:id/tasks', projectController.getTasks);

module.exports = router;
