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
      status: "success",
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

router.get("/job/alljob", async (req, res) => {
  const user = await jobDetail.find({});
  try {
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json({
      status: "faild",
    });
  }
});

router.get("/job/:jobId", async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await jobDetail.findById(jobId);
    if (!job) {
      return res.status(404).json({
        msg: "job not found",
      });
    }
    res.json({
      msg: "success",
      job: job,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "internal server issue",
    });
  }
});

router.put("/job/editjob/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const updatejob = req.body;
    const result = await jobDetail.findByIdAndUpdate(jobId, updatejob, {
      new: true,
    });
    if (result) {
      res.status(404).json({
        status: "sucess",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: "failed",
    }); 
  }
});

module.exports = router;
