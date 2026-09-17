const Problem = require("../models/Problem");

const getProblems = async (req, res) => {
  try {
    const filter = {};

    //filtering based on difficulty
    if (req.query.difficulty) {
      filter.difficulty = req.query.difficulty;
    }

    //handling tags based query
    if(req.query.tags){
      filter.tags = req.query.tags;
    }

    //sorting and pagination query
    const limit = parseInt(req.query.limit) || 10;

    const allProblems = await Problem.find(filter).limit(limit);
        
    res.status(200).json(allProblems);
    
  } catch (error) {
    res.status(500).json({
      message: "Server error fetching problems",
      error: error.message,
    });
  }
};

const getProblemById = async (req, res) => {
  try {
    //id's in mongodb are not 1,2,3 they are diff i.e 66c8f1 kind so we don't need parseInt anymore
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({
      message: "Server error fetching problem",
      error: error.message,
    });
  }
};

const createProblem = async (req, res) => {
  const { title, description, difficulty, tags } = req.body;

  if (!title || !description || !difficulty) {
    return res.status(400).json({
      message: "Title,description and difficulty is required",
    });
  }

  try {
    //creating a new problem
    const newProblem = await Problem.create({
      title,
      description,
      difficulty,
      tags: tags || [], //fallback to empty array if tags arent sent
    });
    res.status(201).json(newProblem);
  } catch (error) {
    res.status(500).json({
      message: "failed to create problem",
      error: error.message,
    });
  }
};

const searchProblem = async (req, res) => {
  const requestQuery = req.query.q;

  // If the user didn't provide a parameter, return an error
  if (!requestQuery) {
    return res
      .status(400)
      .json({ message: "Please provide a search parameter (?q=...)" });
  }

  //cleaning up the extra spaces and forcing it to lowercase
  const cleanQuery = requestQuery.trim();


  try {
    const result = await Problem.find({
      title: {
        $regex: cleanQuery,
        $options: "i",
      },
    });

    //No mactching problems found
    if (result.length === 0) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    //return matching pb
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to search problems",
      error: error.message,
    });
  }
};

const updateProblem = async (req, res) => {
  const problemId = req.params.id;
  const { title } = req.body;

  // if not found
  if (!title) {
    return res.status(400).json({ message: "Title not found" });
  }

  try {
    const updatedProblem = await Problem.findByIdAndUpdate(
      problemId,
      { title: title },
      { new: true, runValidators: true },
    );

    if (!updatedProblem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    res.status(200).json(updatedProblem);
  } catch (error) {
    res.status(500).json({
      message: "failed to update problem",
      error: error.message,
    });
  }
};

const deleteProblem = async (req, res) => {
  const problemId = req.params.id;

  try {
    const deletedProblem = await Problem.findByIdAndDelete(problemId);

    if (!deletedProblem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    res.status(200).json({
      message: "Problem deleted successfully",
      problem: deletedProblem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete problem",
      error: error.message,
    });
  }
};

module.exports = {
  getProblems,
  getProblemById,
  createProblem,
  searchProblem,
  updateProblem,
  deleteProblem,
};
