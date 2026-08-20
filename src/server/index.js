//required for creating http server and routes
const express = require("express");

//dotenv basically loads env into process.env so our password = "secret password"
require("dotenv").config();

//imports function responsible for mongodb connection
const connectDB = require("./config/db");

//this imports mongoose model i.e responsible to communicate with mongodb
const Problem = require("./models/Problem");

const app = express();
const port = 5000;

//runs db connection function
connectDB();

//imp basically json middleware parsing so routes can access it thru req.body
app.use(express.json());

//this is authetication middleware, runs before routes
app.use((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Authorization token required",
    });
  }

  next();
});

//Get method
// Define a route for the root URL
app.get("/api/problems", async (req, res) => {
  try {
    const allProblems = await Problem.find({});
    // res.send("Server is working fine"),
    res.status(200).json(allProblems);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error fetching problems",
        error: error.message,
      });
  }
});

// triggering particular id based pbs
app.get("/api/problems/:id", async (req, res) => {
  try {
    //id's in mongodb are not 1,2,3 they are diff i.e 66c8f1 kind so we don't need parseInt anymore
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json(problem);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Invalid ID format or server error",
        error: error.message,
      });
  }
});

// POST METHOD
app.post("/api/problems", async (req, res) => {
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
});

//SEARCH METHOD
app.get("/search", async (req, res) => {
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
});

//PUT METHOD
app.put("/api/problems/:id", async (req, res) => {
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
      { new: true },
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
});

//DELETE METHOD:

app.delete("/api/problems/:id", async (req, res) => {
  const problemId = req.params.id;

  try {
    const deletedProblems = await Problem.findByIdAndDelete(problemId);

    if (!deletedProblems) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    res.status(200).json({
      message: "Problem deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem not found ",
      error: error.message,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
