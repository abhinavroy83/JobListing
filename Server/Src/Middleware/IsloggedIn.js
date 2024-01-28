const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const isloggendIn = (req, res, next) => {
  try {
    const { jwttoken } = req.headers;
    const user = jwt.verify(jwttoken, process.env.JWT_SECRETKEY);
    next();
  } catch (error) {
    res.json({
      status: "failed",
      msg: "you haven't login",
    });
  }
};

module.exports = isloggendIn;