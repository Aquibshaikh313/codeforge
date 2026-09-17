const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register part
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required ",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    //creating a new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User registered successfully",
      newUser: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to create a new User",
      error: error.message,
    });
  }
};

//Login part
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email id",
      });
    }

    //now compareing the bcrypt comes here if the password matches with email login or if fails login error messages

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {userId : user._id},
      process.env.JWT_SECRET,
      {expiresIn : "1h"}
    )

    return res.status(200).json({
      message: "Login successfully",
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: "login failed",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
