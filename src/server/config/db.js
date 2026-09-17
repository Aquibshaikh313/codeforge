const mongoose = require('mongoose');

//the below line will give access of the jwt_secret i.e behind the scenes it will look like process.env.JWT_SECRET
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB successfully connected!'); // This is message #2
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
