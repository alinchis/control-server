const Sequelize = require('sequelize');
const fs = require('fs');

// load db connection settings
var dbs = require('./db.js');

// set database connection settings
var connectionString = `postgres://${dbs.user}:${dbs.password}@${dbs.host}:${dbs.port}/${dbs.db}`;
const sequelize  = new Sequelize(connectionString);

///////////////////////////////////////////////////////
//// load data from local files
const dataset = require('./data.json');
const initsql = fs.readFileSync('./dbinit.sql');
// const ro_frontiera = fs.readFileSync('./geojson/ro_frontiera_poligon.geojson', 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(data);
// });

// get all map files from directory
var ro_maps = [];
const geofolder = './geojson';
const geofiles = fs.readdir(geofolder, (err, files) => {
  files.forEach(file => {
    console.log(file)
    ro_maps.push({
      name: file.slice(0, -8),
      data: fs.readFileSync('./geojson/'+file, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        console.log(data);
      })
    });
  })
});

///////////////////////////////////////////////////////
// add query functions
///////////////////////////////////////////////////////

// test the connection
function testConnection(req, res, next) {
  sequelize
  .authenticate()
  .then(() => {
    res.status(200)
      .json({
        status: 'success',
        data: '',
        message: 'connection successfull'
      });
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
}

// initialize the database
function initDB(req, res, next) {
  sequelize.query(initsql).spread((results, metadata) => {
    // Results will be an empty array and metadata will contain the number of affected rows.
    res.status(200)
      .json({
        status: 'success',
        data: medatada,
        message: 'db initialized successfully'
      })
  })
}


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

// load all projects from database
function getAllProjects(req, res, next) {
  sequelize.query('select * from projects order by id').spread((results, metadata) => {
    // Results will be an empty array and metadata will contain the number of affected rows.
    res.status(200)
      .json({
        status: metadata,
        data: results,
        message: 'Retrieved ALL projects'
      })
  })
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

// load geojson data from file
function getGeotest(req, res, next) {
  // console.log('testing: ', dataset);
  res.status(200)
    .json({
      status: 'success',
      data: ro_maps,
      message: 'Retrieved ALL data'
    })
}

module.exports = {
  testConnection: testConnection,
  initDB: initDB,
  getAllDataset: getAllDataset,
  getAllProjects: getAllProjects,
  getSingleProject: getSingleProject,
  createProject: createProject,
  updateProject: updateProject,
  removeProject: removeProject,
  getGeotest: getGeotest
};
