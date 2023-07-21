const User = require("../model/user.model");
const config = require("../config.js");
const jwt = require("jsonwebtoken");

exports.login = async function (req, res) {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (user) {
      var payload = {
        id: user.id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
      };

      var token = jwt.sign(payload, config.jwtSecret);

      res.status(200).json({ token: token });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.register = function (req, res) {
  User.register(
    new User({
      email: req.body.email,
      username: req.body.username,
    }),
    req.body.password,
    function (err, msg) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({ message: "Registration successful" });
      }
    }
  );
};

exports.profile = function (req, res) {
  res.json({
    message: "You made it to the secured profile",
    user: req.user,
    token: req.query.secret_token,
  });
};
