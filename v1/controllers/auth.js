const User = require("../models/User");
const bcrypt = require("bcrypt");


const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordValid =  bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = user.generateAccessJWT();

        let options = {
          maxAge: 20 * 60 * 1000,
          httpOnly: true,
          secure: true,
          sameSite: "None",
        };
        res.cookie("SessionId", token, options);

        const { password, ...user_data } = user._doc;
        res.status(200).json({
          status: "success",
          data: [user_data],
          message: "You have successfully logged in.",
        });
      } else {
        return res.status(401).json({
          status: "failed",
          data: [],
          message:
            "Invalid password. Please try again with the correct credentials.",
        });
      }
    } else {
      return res.status(401).json({
        status: "failed",
        data: [],
        message:
          "Invalid email. Please try again with the correct credentials.",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
  res.end();
};

const Register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
    });
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json({
        status: "failed",
        data: [],
        message: "It seems you already have an account, please log in instead.",
      });
    } else {
      const savedUser = await newUser.save();
      const { password, ...user_data } = savedUser._doc;
      res.status(200).json({
        status: "success",
        data: user_data,
        message:
          "Thank you for registering with us. Your account has been successfully created.",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
  res.end();
};
module.exports = Register;
module.exports = Login;
