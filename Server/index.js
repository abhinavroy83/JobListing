const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const healthRoutes = require("./Src/Routes/HealthRoutes");
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.json({
    status: "all good",
    message: "server working fine",
  });
});

// app.get("/health", (req, res) => {
//   res.send("Server is runnig sucessfully");
// });

app.get("/health", healthRoutes);

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("server runnig on http://localhost:5000/"))
    .catch((error) => console.log(error));
});
