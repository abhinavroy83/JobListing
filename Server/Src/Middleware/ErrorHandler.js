const express = require("express");
const errorHandler = (req, res) => {
  //   console.error(err);

  const statusCode = 404;

  res.status(statusCode).json({
    message: "404 page not found",
    error: "Internal Server Error",
  });
};

module.exports = errorHandler;
