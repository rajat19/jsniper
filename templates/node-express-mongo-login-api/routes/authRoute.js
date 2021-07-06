const express = require("express");
const router = express.Router();
// const User = require("../models/userModel");
const { check, validationResult } = require("express-validator");
const { protect } = require("../middleware/auth");
const { verify, login, signout } = require("../controller/authController");

//@route   GET  api/auth
//@desc    Get Verified user
//@access  Public
router.get("/", protect, verify);

//@route   GET  api/auth/login
//@desc    login user
//@access  Public

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Must be a valid email id"),

    check("password")
      .isLength({ min: 8 })
      .withMessage("Must be a atleast 8 character long")
      .matches(/\d/)
      .withMessage("must contain a number"),
  ],
  login
);

//@route   POST api/auth/logout
//@desc    User sign out
//@access  Protected
router.get("/signout", signout);
module.exports = router;
