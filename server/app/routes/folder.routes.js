module.exports = app => {
    const folder = require("../controllers/folder.js");
  
    var router = require("express").Router();
  
    // Create a new Folder
    router.post("/", folder.create);
  
    // Retrieve all Folders
    router.get("/", folder.findAll);
  
    // Retrieve a single Folder with id
    router.get("/:id", folder.findOne);
  
    // Update a Folder with id
    router.put("/:id", folder.update);
  
    // Delete a Folder with id
    router.delete("/:id", folder.delete);
  
    // Delete all Folders
    router.delete("/", folder.deleteAll);
  
    app.use('/api/folder', router);
  };