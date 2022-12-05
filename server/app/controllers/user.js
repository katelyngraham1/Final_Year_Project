const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const utils = require("./utils");

// Create and Save a new Users
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).send(utils.error("Missing data in request!"));
    return;
  }

  // Create a User
  const User = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  // Save Users in the database
  Users.create(User)
    .then(data => {
      res.send(utils.success(data));
    })
    .catch(err => {
      res.status(500).send(utils.error("Error while creating user: " + err.message));
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Users with an id
exports.findOne = (req, res) => {
  
};

// Update a Users by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Users with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  
};
