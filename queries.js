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

// add query functions
function getAllProjects(req, res, next) {
  db.any('select * from "Projects"')
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
  db.none('insert into "Projects"(name)' +
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
  db.none('update "Projects" set name=$1, where id=$2',
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
  db.result('delete from "Projects" where id = $1', projID)
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
  getAllProjects: getAllProjects,
  getSingleProject: getSingleProject,
  createProject: createProject,
  updateProject: updateProject,
  removeProject: removeProject
};
