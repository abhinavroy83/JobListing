const express = require("express");
const router = express.Router();
const IsloggedIn = require("../Middleware/IsloggedIn");

router.get("/home", IsloggedIn, async (req, res) => {
  try {
    res.json({
      msg: "Welcome to the home page",
    });
  } catch (error) {
    res.json({
      msg: "Time out ,Please login again",
    });
  }
});

module.exports = router;
