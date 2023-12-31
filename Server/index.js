const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const healthRoutes = require("./Src/Routes/HealthRoutes");
const UserRoute = require("./Src/Routes/UserRoute");
const JobRoutes = require("./Src/Routes/JobRoutes");
const errorHandler = require("./Src/Middleware/ErrorHandler");

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://job-listing-cyan.vercel.app", "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: "*",
  })
);
app.options("*", cors());

app.get("/", (req, res) => {
  res.json({
    status: "all good",
    message: "server working fine",
  });
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
// app.get("/health", (req, res) => {
//   res.send("Server is runnig sucessfully");
// });

app.get("/health", healthRoutes);
app.use("/users", UserRoute);
app.use(JobRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("server runnig on http://localhost:5000/");
});
