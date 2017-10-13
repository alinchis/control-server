var express = require('express');
var router = express.Router();

var db = require('../queries');

// get all dataset from local file
router.get('/api/dataset', db.getAllDataset);
router.get('/api/datagis', db.getDataGIS);

// get data from the PostgreSQL database
router.get('/api/projects', db.getAllProjects);
router.get('/api/projects/:id', db.getSingleProject);
router.post('/api/projects', db.createProject);
router.put('/api/projects/:id', db.updateProject);
router.delete('/api/projects/:id', db.removeProject);


module.exports = router;
