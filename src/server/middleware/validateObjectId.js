const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {

  const problemId = req.params.id;

  // Validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(problemId)) {
    return res.status(400).json({
      message: "Invalid ID format"
    });
  }

  next();
};

module.exports = validateObjectId;