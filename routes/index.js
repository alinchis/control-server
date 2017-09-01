var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/projects', db.getAllProjects);
router.get('/api/projects/:id', db.getSingleProject);
router.post('/api/projects', db.createProject);
router.put('/api/projects/:id', db.updateProject);
router.delete('/api/projects/:id', db.removeProject);


module.exports = router;
