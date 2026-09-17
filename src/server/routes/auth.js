const express = require('express');

const router = express.Router();

//connecting router to user-controller
const{registerUser,loginUser} = require("../controllers/authController");

//Both register and login will have post because both operations recieves the data

//Register

router.post("/register", registerUser);

//Login 

router.post("/login", loginUser);



module.exports = router;






