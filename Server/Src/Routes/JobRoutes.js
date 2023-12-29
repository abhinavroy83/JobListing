const express = require("express");
const router = express.Router();
const IsloggedIn = require("../Middleware/IsloggedIn");
const jobDetail = require("../Models/job");

router.post("/addjob", IsloggedIn, async (req, res) => {
  try {
    const job = new jobDetail(req.body);
    console.log(req.body);
    await job.save();
    res.json({
      status: "sucess",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to add job.",
    });
  }
});

router.get("/home", IsloggedIn, async (req, res) => {
  try {
    res.json({
      msg: "Welcome to the home page",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = router;
