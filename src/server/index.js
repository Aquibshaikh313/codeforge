//required for creating http server and routes
const express = require("express");

//dotenv basically loads env into process.env so our password = "secret password"
require("dotenv").config();


//imports function responsible for mongodb connection
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");

const problemRoutes = require("./routes/problems");

const app = express();
const port = 5000;

//runs db connection function
connectDB();

//imp basically json middleware parsing so routes can access it thru req.body
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/problems", problemRoutes);

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/test-protected", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "You are authenticated",
    user: req.user,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
