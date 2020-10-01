const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
require("dotenv").config();

const { registration } = require("../controller/userController");
//@route   POST  api/users/signup
//@desc    Sign Up user
//@access  Public
router.post(
  "/signup",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Include a valid email id").isEmail(),
    check("password", "Must be a atleast 8 character long").isLength({
      min: 8,
    }),
  ],
  registration
);

module.exports = router;
