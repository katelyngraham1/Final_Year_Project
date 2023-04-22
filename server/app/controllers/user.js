const db = require("../models");
const user = db.user;
const utils = require("./utils");

exports.login = (req, res) => {
  // Validate request
  console.log("Login called");
  if (!req.body.email || !req.body.password) {
    res
      .status(401)
      .send(utils.error("Please Provide an email and password to login!"));
    return;
  }

  const userlogin = user
    .findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })
    .then(data => {
      if (!data) {
        return res
          .status(401)
          .send(
            utils.error("Invalid email or password provided, please try again!")
          );
      }
      console.log("Returning id ", data.id);
      res.send(utils.success({ id: data.id }));
    })
    .catch(err => {
      res
        .status(500)
        .send(utils.error("Error while logging in: " + err.message));
    });
};

exports.changePassword = async (req, res) => {
  try {
    // Validate request
    console.log("Change password called", req.body);
    if (!req.body.newpassword || !req.body.currentpassword) {
      res
        .status(401)
        .send(utils.error("Please Provide your current password and a new password to login!"));
      return;
    }

    console.log("Fetching user", req.headers);
    const userdetails = await user.findOne({
      where: {
        id: req.headers.userid,
        password: req.body.currentpassword
      }
    });
    if (!userdetails) {
      return res
        .status(500)
        .send(utils.error("Invalid current password please try again "));
    }

    console.log("Updating user");


    const updateResult = await user.update(
      {
        password: req.body.newpassword
      },
      {
        where: { id: userdetails.id }
      }
    );

    console.log("User updated - returning");
    return res.status(200).send(utils.success("Success"));
  } catch (error) {
    console.error("Error", error.stack);
    return res.status(401).send(utils.error(error));
  }
 
};

// Create and Save a new Users
exports.create = (req, res) => {
  // Validate request
  console.log("Register called");
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
  user
    .create(User)
    .then(data => {
      res.send(utils.success(data));
    })
    .catch(err => {
      res
        .status(500)
        .send(utils.error("Error while creating user: " + err.message));
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  console.log("Get all users");
  user
    .findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single Users with an id
exports.findOne = (req, res) => {
  console.log("Select id from user");
  user
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving one user."
      });
    });
};

// Update a Users by the id in the request
exports.update = (req, res) => {
  console.log("Update user");
  user
    .update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating user."
      });
    });
};

// Delete a Users with the specified id in the request
exports.delete = (req, res) => {
  console.log("Delete Users with id");
  user
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting user."
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  console.log("Delete All Users");
  user
    .destroy({
      where: {}
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting all users."
      });
    });
};
