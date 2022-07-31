const express = require("express");
const moviesController = require("../controllers/moviesController");

const router = express.Router();

router.get("/", moviesController.search);    
router.post("/", moviesController.create);
router.get("/:id", moviesController.getById); 
router.put("/:id", moviesController.update);
router.delete("/:id", moviesController.delete);


module.exports = router;