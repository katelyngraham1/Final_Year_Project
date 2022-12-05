module.exports = app => {
    const file = require("../controllers/file.js");
  
    var router = require("express").Router();
  
    // Create a new File
    router.post("/", file.create);
  
    // Retrieve all Files
    router.get("/", file.findAll);
  
    // Retrieve a single File with id
    router.get("/:id", file.findOne);
  
    // Update a File with id
    router.put("/:id", file.update);
  
    // Delete a File with id
    router.delete("/:id", file.delete);
  
    // Delete all Files
    router.delete("/", file.deleteAll);
  
    app.use('/api/file', router);
  };