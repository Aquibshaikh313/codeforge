

const express = require("express");
//the format in which our model should be mongoose communicates with mongodb basically

const Problem = require('../models/Problem');

//creating router object
const router = express.Router();

//connecting router to controller
const {getProblems,getProblemById, createProblem, searchProblem, updateProblem, deleteProblem} = require('../controllers/problemController') 


//first route
router.get('/', getProblems);

//SEARCH METHOD
router.get("/search", searchProblem);

// triggering particular id based pbs
router.get("/:id", getProblemById);

// POST METHOD
router.post("/", createProblem);

//PUT METHOD
router.put("/:id", updateProblem);

//DELETE METHOD:
router.delete("/:id", deleteProblem);

//making this router available to other files
module.exports = router;