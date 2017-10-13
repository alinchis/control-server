var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

// load db connection settings
var dbs = require('./db.js');

// set database connection settings
var pgp = require('pg-promise')(options);
var connectionString = `postgres://${dbs.user}:${dbs.password}@${dbs.host}:${dbs.port}/${dbs.db}`;
var db = pgp(connectionString);

///////////////////////////////////////////////////////
//// load data from local file
var dataset = require('./data.json');

///////////////////////////////////////////////////////
// load data from local geojson file
// var GeoJSON = require('geojson');
var datagis = (require('./datagis.json'));

// add query functions

// send all dataset to browser
function getAllDataset(req, res, next) {
  // console.log('testing: ', dataset);
  res.status(200)
    .json({
      status: 'success',
      data: dataset,
      message: 'Retrieved ALL data'
    })
}
// send datagis to browser
function getDataGIS(req, res, next) {
  // console.log('testing: ', dataset);
  res.status(200)
    .json({
      status: 'success',
      data: datagis,
      message: 'Retrieved ALL data'
    })
}

// load all projects from database
function getAllProjects(req, res, next) {
  db.any('select * from projects order by id')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL projects'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleProject(req, res, next) {
  var projID = parseInt(req.params.id);
  db.one('select * from "Projects" where id = $1', projID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE project'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createProject(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into projects(name)' +
      'values(${name})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateProject(req, res, next) {
  db.none('update projects set name=$1, where id=$2',
    [req.body.name, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated project'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeProject(req, res, next) {
  var projID = parseInt(req.params.id);
  db.result('delete from projects where id = $1', projID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} project`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getDataGIS: getDataGIS,
  getAllDataset: getAllDataset,
  getAllProjects: getAllProjects,
  getSingleProject: getSingleProject,
  createProject: createProject,
  updateProject: updateProject,
  removeProject: removeProject
};
