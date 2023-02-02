
//const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
    
  if (!token) {
    return  res.json({
      message: "you are not allowed to see the data"
    })
  }

  const decodedData = jwt.verify(token, 'hithiermynameisbittusahumyname');

  req.user = await User.findById(decodedData.id);

  next();
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.json({
          message: req.user.role+"is not allowed to see the data"
        })
      );
    }

    next();
  };
};
