const db = require("../models");
const folder = db.folder;
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
  folder.create(Folder)
    .then(data => {
      res.send(utils.success(data));
    })
    .catch(err => {
      res.status(500).send(utils.error("Error while creating folder: " + err.message));
    });
};

// Retrieve all Folders from the database.
exports.findAll = (req, res) => {
    console.log("Get all folders");
    folder.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving folders."
      });
    });
};

// Find a single Folders with an id
exports.findOne = (req, res) => {
  console.log("Select id from folder");
  folder.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving one folder."
    })
  })
};

// Update a Folders by the id in the request
exports.update = (req, res) => {
  console.log("Update folder");
  folder.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while updating folder."
    })
  })
};

// Delete a Folders with the specified id in the request
exports.delete = (req, res) => {
  console.log("Delete folder with id");
  folder.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while deleting folder."
      })
  })
};

// Delete all Folders from the database.
exports.deleteAll = (req, res) => {
  console.log("Delete All Folders");
  folder.destroy({
    where: {}
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while deleting all folders."
      })
  })
};
