const express = require("express");
const errorHandler = (req, res) => {
//   console.error(err);

  const statusCode = 404;

  res.status(statusCode).json({
    message: "Something went wrong! Please try after some time.",
    error: "Internal Server Error",
  });
};

module.exports = errorHandler;
