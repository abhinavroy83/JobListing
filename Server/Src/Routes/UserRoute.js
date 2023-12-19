const express = require("express");
const router = require.Router();
const RegisterDetails = require("../Models/User");

router.post("/register", async (req, res) => {
  try {
    const newUser = new RegisterDetails({
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      password: req.body.password,
    });
    await newUser.create();
    res.json({
      status: "success",
    });
  } catch (error) {
    res.json({
      status: failed,
    });
  }
});
