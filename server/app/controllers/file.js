const db = require("../models");
const file = db.file;
const Op = db.Sequelize.Op;
const utils = require("./utils");

// Create and Save a new File
exports.create = (req, res) => {
  console.log("Create invoice", req.headers);
  // Validate request
  if (!req.body.name) {
    res.status(400).send(utils.error("Missing data in request!"));
    return;
  }


  // Create File in the database  
  file.create({...req.body, userid: req.headers.userid })
    .then(data => {
      res.send(utils.success(data));
    })
    .catch(err => {
      res.status(500).send(utils.error("Error while creating file: " + err.message));
    });
};

// Retrieve all Files from the database.
exports.findAll = (req, res) => {
    console.log("Get all files", req.headers);
    file.findAll({
      where: {
        userid: req.headers.userid
      }
    })
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

// Update a File by the id in the request
exports.paid = (req, res) => {
  console.log("File paid");
  file.update({
    paid: true
  }, {
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
