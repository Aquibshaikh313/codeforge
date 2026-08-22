//required for creating http server and routes
const express = require("express");

//dotenv basically loads env into process.env so our password = "secret password"
require("dotenv").config();

//imports function responsible for mongodb connection
const connectDB = require("./config/db");

const problemRoutes = require("./routes/problems");

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

app.use("/api/problems", problemRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
