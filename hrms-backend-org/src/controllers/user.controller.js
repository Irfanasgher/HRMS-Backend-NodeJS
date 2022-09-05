const db = require("../../models");
// const User = db.user;
// const Shop = db.shops;
const Op = db.Sequelize.Op;
// const jwt = require("jsonwebtoken");
// const tokenData = require("../config/auth.config");

//const accessTokenSecret = tokenData.secret;
// Create and Save a new User
const jwt = require("jsonwebtoken");
const tokenData = require("../../config/authConfig");

const accessTokenSecret = tokenData.secret;

const user = {
  email: "zaid@admin.com",
  password: "123",
};

// Login
exports.LoginVerify = async (req, res) => {
  // Validate request
  const username = req.body.email;
  const userpassword = req.body.password;

  if (user.email == username && user.password == userpassword) {
    const accessToken = jwt.sign({ username }, accessTokenSecret, {
      expiresIn: "7d", // expires in 24 hours
    });
    // console.log(accessToken);
    // res.json({
    //     accessToken
    // });
    // res.cookie("auth-token", accessToken, {
    //   maxAge: 24 * 60 * 60 * 1000,
    //   httpsOnly: true,
    //   sameSite: "none",
    //   secure: true,
    // });
    // console.log(data)

    res.status(200).send({
      message: "no company id ",
      authToken: accessToken,
    });
  } else {
    res.status(500).send({
      message: "user email and password are incorrect",
    });
  }

  // if (!req.body.username) {
  //   res.status(400).send({
  //     message: "user email and password are incorrect",
  //   });
  //   return;
  // }
  // if (!req.body.userpassword) {
  //   res.status(400).send({
  //     message: "user email and password are incorrect",
  //   });
  //   return;
  // }
  // login information

  // User.findAll({ where: { email: username, password: userpassword } })
  //   .then((data) => {
  //     const accessToken = jwt.sign({ username }, accessTokenSecret);
  //     // console.log(accessToken);
  //     // res.json({
  //     //     accessToken
  //     // });
  //     res.cookie("auth-token", accessToken, {
  //       maxAge: 24 * 60 * 60 * 1000,
  //       httpOnly: true,
  //     });
  //     // console.log(data)
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "user email and password are incorrect",
  //     });
  //   });
};
exports.verify = async (req, res) => {
  res.sendStatus(200);
};
