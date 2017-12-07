var express = require('express');
var router = express.Router();

var db = require('../queries');

// test connection
router.get('/api/testconnection', db.testConnection);

// initialize the DATABASE
router.get('/api/initdb', db.initDB);

// get all dataset from local file
router.get('/api/dataset', db.getAllDataset);

// get data from the PostgreSQL database
router.get('/api/projects', db.getAllProjects);
router.get('/api/projects/:id', db.getSingleProject);
router.post('/api/projects', db.createProject);
router.put('/api/projects/:id', db.updateProject);
router.delete('/api/projects/:id', db.removeProject);

// test geojson
router.get('/api/geotest', db.getGeotest);

module.exports = router;
