const { check, validationResult } = require("express-validator");
const crypto = require("crypto");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
require("dotenv").config();

exports.registration = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
