const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    status: "all good",
    message: "server working fine",
  });
});

app.listen(5000,()=>{
    console.log('server running at https')
})
