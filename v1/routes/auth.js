const express = require("express");
const Register  = require("../controllers/auth.js");
const Login  = require("../controllers/auth.js");
const Validate =require ("../middleware/validate.js");
const  {check}  =require ("express-validator");
const router = express.Router();

router.post(
  "/register",
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("firstname")
    .not()
    .isEmpty()
    .withMessage("You first name is required")
    .trim()
    .escape(),
  check("lastname")
    .not()
    .isEmpty()
    .withMessage("You last name is required")
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 chars long"),
  Validate,
  Register,
);
router.post(
    "/login",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("password").not().isEmpty(),
    Validate,
    Login
);

module.exports =router;
