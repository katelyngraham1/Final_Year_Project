'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
const config = require("../../config/db.config.js");

var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    // port: config.port,
    dialect: config.dialect,
    operatorsAliases: 0
  });
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);    
    db[model.name] = model;
  });

Object.keys(db).forEach((key) => {
  if (db[key].associate) {
    db[key].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;