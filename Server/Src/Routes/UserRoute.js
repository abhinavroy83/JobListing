const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const RegisterDetails = require("../Models/User");
const jwt = require("jsonwebtoken");
const jobDetail = require("../Models/job");

router.post("/register", async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    const encryptpass = await bcrypt.hash(password, 10);
    const newUser = new RegisterDetails({
      name,
      email,
      number,
      password: encryptpass,
    });
    const jwttoken = jwt.sign(
      {
        username: newUser.name,
      },
      process.env.JWT_SECRETKEY,
      { expiresIn: "30m" }
    );
    await newUser.save();
    res.json({
      status: "success",
      jwttoken,
      username: name,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
    });
  }
});

//login detail

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await RegisterDetails.findOne({ email });
    console.log(user);
    if (user) {
      let haspasswordmatched = await bcrypt.compare(password, user.password);
      if (haspasswordmatched) {
        const jwttoken = jwt.sign(user.toJSON(), process.env.JWT_SECRETKEY, {
          expiresIn: "30m",
        });
        res.json({
          status: "success",
          msg: "You've Succesfully login",
          jwttoken,
          username: user.name,
        });
      } else {
        res.json({
          status: "failed",
          msg: "incorrect details",
        });
      }
    } else {
      res.json({
        status: "failed",
        msg: "Didn't find the user",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "Login details incorrect",
    });
  }
});

module.exports = router;
