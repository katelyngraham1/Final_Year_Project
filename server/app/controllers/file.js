const db = require("../models");
const File = db.File;
const Op = db.Sequelize.Op;
const utils = require("./utils");

// Create and Save a new File
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send(utils.error("Missing data in request!"));
    return;
  }

  // Create a File
  const File = {
    name: req.body.name,
    paid: req.body.paid,
    amount: req.body.amount,
    filetype: req.body.filetype
  };

  // Save File in the database
  Files.create(File)
    .then(data => {
      res.send(utils.success(data));
    })
    .catch(err => {
      res.status(500).send(utils.error("Error while creating file: " + err.message));
    });
};

// Retrieve all Files from the database.
exports.findAll = (req, res) => {
  
};

// Find a single File with an id
exports.findOne = (req, res) => {
  
};

// Update a File by the id in the request
exports.update = (req, res) => {
  
};

// Delete a File with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Files from the database.
exports.deleteAll = (req, res) => {
  
};
