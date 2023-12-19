const express = require("express");
const { model } = require("mongoose");
const Router = express.Router();

Router.get("/health", (req, res) => {
  try {
    const serverInfo = {
      serverName: process.env.PORT,
      currentTime: new Date(),
      status: "Active",
    };
    res.json(serverInfo);
  } catch (error) {
    res.json({
      status: "failed",
      message: "something wrong",
    });
  }
});

module.exports = Router;
