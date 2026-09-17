

const express = require("express");
//the format in which our model should be mongoose communicates with mongodb basically

const Problem = require('../models/Problem');

const authMiddleware = require("../middleware/authMiddleware");

const validateObjectId = require("../middleware/validateObjectId")

//creating router object
const router = express.Router();



//connecting router to controller
const {getProblems,getProblemById, createProblem, searchProblem, updateProblem, deleteProblem} = require('../controllers/problemController') 


//first route
router.get('/', getProblems);

//SEARCH METHOD
router.get("/search", searchProblem);

// triggering particular id based pbs
router.get("/:id", validateObjectId, getProblemById);

// POST METHOD
router.post("/",authMiddleware ,createProblem);

//PUT METHOD
router.put("/:id", authMiddleware , validateObjectId ,updateProblem);

//DELETE METHOD:
router.delete("/:id",authMiddleware,validateObjectId ,deleteProblem);

//making this router available to other files
module.exports = router;
