const db = require("../models");
const company = db.company;
const Op = db.Sequelize.Op;
const utils = require("./utils");

// Create and Save a new Company
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send(utils.error("Missing data in request!"));
    return;
  }

  // Create a Company
  const Company = {
    name: req.body.name
  };

  // Save Company in the database
  company.create(Company)
    .then(data => {
      res.send(utils.success(data));
    })
    .catch(err => {
      res.status(500).send(utils.error("Error while creating company: " + err.message));
    });
};

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {
    console.log("Get all companies");
    company.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Company with an id
exports.findOne = (req, res) => {
  
};

// Update a Company by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Company with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Companies from the database.
exports.deleteAll = (req, res) => {
  
};
