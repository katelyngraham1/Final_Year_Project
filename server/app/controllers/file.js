const db = require("../models");
const file = db.file;
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
  file.create(File)
    .then(data => {
      res.send(utils.success(data));
    })
    .catch(err => {
      res.status(500).send(utils.error("Error while creating file: " + err.message));
    });
};

// Retrieve all Files from the database.
exports.findAll = (req, res) => {
    console.log("Get all files");
    file.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving files."
      });
    });
};

// Find a single File with an id
exports.findOne = (req, res) => {
  console.log("Select id from files");
  file.findOne({
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
      err.message || "Some error occurred while retrieving one file."
    })
  })
};

// Update a File by the id in the request
exports.update = (req, res) => {
  console.log("Update file");
  file.update(req.body, {
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
      err.message || "Some error occurred while updating file."
    })
  })
};

// Delete a File with the specified id in the request
exports.delete = (req, res) => {
  console.log("Delete File with id");
  file.destroy({
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
        err.message || "Some error occurred while deleting file."
      })
  })
};

// Delete all Files from the database.
exports.deleteAll = (req, res) => {
  console.log("Delete All Files");
  file.destroy({
    where: {}
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while deleting all Files."
      })
  })
};