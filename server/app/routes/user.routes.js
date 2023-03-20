module.exports = app => {
    const user = require("../controllers/user.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/register", user.create);

    router.post("/login", user.login);
  
    // Retrieve all User
    router.get("/", user.findAll);
  
    // Retrieve a single Users with id
    router.get("/:id", user.findOne);
  
    // Update a Users with id
    router.put("/:id", user.update);
  
    // Delete a Users with id
    router.delete("/:id", user.delete);
  
    // Delete all Userss
    router.delete("/", user.deleteAll);
  
    app.use('/api/user', router);
  };