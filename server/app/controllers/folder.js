const db = require("../models");
const Folder = db.Folder;
const Op = db.Sequelize.Op;
const utils = require("./utils");

// Create and Save a new Folders
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send(utils.error("Missing data in request!"));
    return;
  }

  // Create a Folder
  const Folder = {
    name: req.body.name
  };

  // Save Folders in the database
  Folders.create(Folder)
    .then(data => {
      res.send(utils.success(data));
    })
    .catch(err => {
      res.status(500).send(utils.error("Error while creating folder: " + err.message));
    });
};

// Retrieve all Folders from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Folders with an id
exports.findOne = (req, res) => {
  
};

// Update a Folders by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Folders with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Folders from the database.
exports.deleteAll = (req, res) => {
  
};
