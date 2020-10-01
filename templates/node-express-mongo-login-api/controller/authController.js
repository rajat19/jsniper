const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Verify user
exports.verify = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      err: "Server error",
    });
  }
};

// LOG IN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation email and password
    if (!email || !password) {
      return res.status(400).json({
        Err: [{ msg: "Please enter mail id or password" }],
      });
    }

    //check for user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        err: [{ msg: "Invalid user" }],
      });
    }

    //check for password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        err: [{ mag: "Invalid Password" }],
      });
    }

    //if everything matches
    const payload = {
      user: {
        id: user._id,
        email: user.email,
      },
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "5h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({
      Error: "Unable to log in!",
    });
  }
};

// SIGNOUT
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    status: "Success",
    message: "You signed out successfully",
  });
};
